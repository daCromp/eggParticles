import KdNode from "./kdnode.js";
import BoundingBox from "./boundingbox.js";
import {distance, sortAndMedian} from "./kdutils.js";

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
function buildKdTree(points, dim = 'x', parent, isLeftChild=true){

    // ===========================================
    // TODO: implement build tree
    // ===========================================

    // Note: We need to compute the bounding box for EACH new 'node'
    //       to be able to query correctly

    // Sort points and determine the median index

    let median = sortAndMedian(points);
    let bbox;


    if(!parent){
        const canvas = document.getElementById('canvas_2d');
        bbox = new BoundingBox(0,0,canvas.width,canvas.height);
        node = new KdNode()
        buildKdTree(points, y, )
    }
    else{
        if(isLeftChild){
            if()
            bbox = new BoundingBox(0,0, median, parent.)
        }
        else{

        }
    }

    // Calculate the new bounding box based on the parent node (if root, the canvas size is the size of the bounding box)

    // Create new node with median point, dimension flag and bounding box

    // Add the node to the parent node (respecting the child flag)

    // Define next dimension flag

    // Create left and right subtrees (divide points for left and right)

    return // Note: this return statement may be relevant only for the creation of the root node ;)

}


class KdTree{


    constructor(points, width, height) {
        this.points = points;
        this.root = buildKdTree(points);
    }

    findNearestNeighbor(x, y) {

        let query = {x: x, y: y};
        let closest = this.root;
        let closestDistance = distance(closest.point, query);

        function fnn(node, dim) {

            if( !node ) {
                return;
            }

            let dist = distance(node.point, query);
            if( dist < closestDistance ) {
                closestDistance = dist;
                closest = node;
            }

            let a, b;
            if ( query[dim] < node.point[dim]) {
                a = node.leftChild;
                b = node.rightChild;
            } else {
                a = node.rightChild;
                b = node.leftChild;
            }

            let nextDim = (dim === 'x') ? 'y' : 'x';

            if( a && a.bbox.distanceTo(query) < closestDistance) {
                fnn(a, nextDim);
            }

            if( b && b.bbox.distanceTo(query) < closestDistance) {
                fnn(b, nextDim);
            }

        }

        fnn(this.root, 'x')

        return closest.point;

    }

}

export default KdTree;