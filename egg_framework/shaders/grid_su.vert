
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float verschiebung;

in vec3 vertexPosition;
in vec4 vertexColor;


out vec4 fragColor;

#define PI radians(180.0)

vec3 parametricSurface(vec2 uv, float verschiebung) {


	float x = uv[0];
	float y = uv[1];
	float z = cos(uv[0] + verschiebung);

    return vec3(x,y,z);
	// return vec3(uv, 0.0);
}

void main() {

	// we pass the vertex color to its fragments
	fragColor = vertexColor;

	// let opengl create sized points
	gl_PointSize = 5.0;

    vec3 newVertexPosition = parametricSurface(vertexPosition.xy, verschiebung);

	// we are dealing with homogenuous 4x4 matrices, so we need to convert
	// the vertex position to homogenuous form too
	gl_Position = projectionMatrix * modelViewMatrix * vec4(newVertexPosition, 1.0);

}

