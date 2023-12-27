const frameFragmentShader = `
uniform sampler2D u_texture;
uniform float u_progress;
uniform float u_direction;
varying vec2 vUv;

void main() {
    vec4 color = texture2D(u_texture, vUv); 

    gl_FragColor = color;
}
`;

export { frameFragmentShader };
