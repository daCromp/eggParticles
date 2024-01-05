
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 vertexPosition;
attribute vec4 vertexColor;

varying vec4 fragColor;

#define PI radians(180.0)

float a = 0.2;
float b = 1.0;
float c = 0.01;
float n = 3.0;

vec3 parametricSurface(vec2 uv) {

	// ToDo

	float h = 1.0 - 0.5 * uv[1];
	float x = a * h * cos(n * uv[1] * PI) * (1.0 + cos(uv[0] * PI)) + c * cos(n * uv[1] * PI);
	float y = a * h * sin(n * uv[1] * PI) * (1.0 + cos(uv[0] * PI)) + c * sin(n * uv[1] * PI);
	float z = b * 0.5 * uv[1] + a * h * sin(uv[1] * PI);

    return vec3(uv, 0.0);

}

void main() {

	// we pass the vertex color to its fragments
	fragColor = vertexColor;

	// let opengl create sized points
	gl_PointSize = 5.0;

    vec3 newVertexPosition = parametricSurface(vertexPosition.xy);

	// we are dealing with homogenuous 4x4 matrices, so we need to convert
	// the vertex position to homogenuous form too
	gl_Position = projectionMatrix * modelViewMatrix * vec4(newVertexPosition, 1.0);

}

