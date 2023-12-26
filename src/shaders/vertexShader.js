const frameVertexShader = `
uniform float u_progress;
varying vec2 vUv;

void main() {
    vec3 pos = position;

    // pos.z = 0.1*sin(pos.x*20.0);
    float distance = length(uv - vec2(0.5));
    float maxDistance = length(vec2(0.5));

    float normalDistance = distance/maxDistance;

    float stickTo = normalDistance;

    float secProgress = min(2.*u_progress, 2.*(1. - u_progress));

    float zOffset = 2.0;

    float zProgress = clamp(2.*u_progress, 0., 1.);

    pos.z += zOffset*(stickTo * secProgress - zProgress);

    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export { frameVertexShader };
