const frameFragmentShader = `
uniform sampler2D u_texture;
uniform float u_progress;
varying vec2 vUv;

void main() {
    vec4 color = texture2D(u_texture, vUv); 
    gl_FragColor = color;
    gl_FragColor = vec4(u_progress, 0., 1., 1.);
}
`;

export { frameFragmentShader };
