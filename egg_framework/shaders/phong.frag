struct Material {
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};

struct Light {
	vec3 position;
	vec3 color;
};

uniform Material material;
uniform Light light;
uniform vec3 ambientLight;

uniform mat4 projectionMatrix;

// interpolated coordinates in eye space
varying vec3 ecPosition;
varying vec3 ecNormal;


vec3 phong(vec3 p, vec3 v, vec3 n, vec3 lp, vec3 lc) {

	// derived vectors
	// ToDo

	// scalar products
	// ToDo

	// phong summands
	vec3 ambi = material.ambient * ambientLight;
	vec3 diff = vec3(0.0, 0.0, 0.0);//ToDo
	vec3 spec = vec3(0.0, 0.0, 0.0);//ToDO


	return  ambi + diff + spec; // phong sum

}

void main() {
	// find out which view direction to use
	bool useOrtho = projectionMatrix[2][3] == 0.0;
	vec3 viewDir = vec3(0, 0, 1); // ToDo

	// calculate illumination
	vec3 illum = phong(ecPosition, viewDir, normalize(ecNormal), light.position.xyz, light.color);

	gl_FragColor = vec4(illum, 1.0);
}
