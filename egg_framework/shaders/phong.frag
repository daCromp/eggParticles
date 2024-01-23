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

	vec3 toLight = normalize(lp - p);
	vec3 reflectLight = reflect(-toLight, n);

	// scalar products
	// ToDo

	float n_s = max(dot(toLight, n), 0.0);
	float r_v = max(dot(reflectLight, v), 0.0);

	// phong summands
	vec3 ambi = material.ambient * ambientLight;
	vec3 diff = material.diffuse * n_s * lc;
	vec3 spec = material.specular * pow(r_v, material.shininess) * lc;


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
