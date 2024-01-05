import KdNode from "./kdnode.js";
import BoundingBox from "./boundingbox.js";
import { distance, sortAndMedian } from "./kdutils.js";

/*
 * JavaScript / Canvas teaching framework
 * (C)opyright Arnold Schwarz, arnold.schwarz@beuth-hochschule.de
 */

/**
 * Function to build the kd tree
 * @param points - list of Point2D objects
 * @param dim - dimension 'x' or 'y'
 * @param parent - parent KdNode (undefined if root node)
 * @param isLeftChild - flag to indicate whether this becomes the left child of the parent object
 * @returns {KdNode}
 */
function buildKdTree(points, dim = 'x', parent, isLeftChild = true) {

    // ===========================================
    // TODO: implement build tree
    // ===========================================

    if(points.length === 0) {
        return;
    }
    
    const median = sortAndMedian(points, dim);

    const canvas = document.getElementById("canvas_2d");

    let boundingbox;
    if(parent === undefined){
        boundingbox = new BoundingBox(0,0, canvas.width, canvas.height);
    } else {
        boundingbox = parent.bbox.copy();
        if(dim === 'x') {
            if(isLeftChild) {
                boundingbox.maxY = parent.point.y;
            } else {
                boundingbox.minY = parent.point.y;
            }
        } else {
            if(isLeftChild) {
                boundingbox.maxX = parent.point.x;
            } else {
                boundingbox.minX = parent.point.x;
            }
        }
    }

    const newKdNode = new KdNode(points[median], dim, boundingbox, undefined, undefined);

    if(parent) {
        if(isLeftChild) {
            parent.leftChild = newKdNode;
        } else {
            parent.rightChild = newKdNode;
        }
    }

    const nextDim = (dim === 'x') ? 'y' : 'x';

    const pointsLeft = points.slice(0, median);
    const pointsRight = points.slice(median + 1);

    newKdNode.leftChild = buildKdTree(pointsLeft, nextDim, newKdNode, true);
    newKdNode.rightChild = buildKdTree(pointsRight, nextDim, newKdNode, false);

    return newKdNode;
}


class KdTree {


    constructor(points, width, height) {
        this.points = points;
        console.time('build k-d Tree');
        this.root = buildKdTree(points);
        console.timeEnd('build k-d Tree');
    }

    findNearestNeighbor(x, y) {

        let query = { x: x, y: y };
        let closest = this.root;
        let closestDistance = distance(closest.point, query);

        function fnn(node, dim) {

            if (!node) {
                return;
            }

            let dist = distance(node.point, query);
            if (dist < closestDistance) {
                closestDistance = dist;
                closest = node;
            }

            let a, b;
            if (query[dim] < node.point[dim]) {
                a = node.leftChild;
                b = node.rightChild;
            } else {
                a = node.rightChild;
                b = node.leftChild;
            }

            let nextDim = (dim === 'x') ? 'y' : 'x';

            if (a && a.bbox.distanceTo(query) < closestDistance) {
                fnn(a, nextDim);
            }

            if (b && b.bbox.distanceTo(query) < closestDistance) {
                fnn(b, nextDim);
            }

        }

        fnn(this.root, 'x')

        return closest.point;

    }

}

export default KdTree;