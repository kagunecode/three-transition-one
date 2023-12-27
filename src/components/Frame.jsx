import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";

import { frameFragmentShader } from "../shaders/fragmentShader";
import { frameVertexShader } from "../shaders/vertexShader";

import img from "/yir.png";

export default function Frame({ ...props }) {
  const viewport = useThree((state) => state.viewport);
  const plane = useRef();
  const texture = useTexture(img);
  const clicked = useRef(false);

  const uniforms = useMemo(
    () => ({
      u_texture: {
        value: texture,
      },
      u_progress: {
        value: 0.0,
      },
      u_direction: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame(() => {
    plane.current.material.uniforms.u_progress.value = THREE.MathUtils.lerp(
      plane.current.material.uniforms.u_progress.value,
      clicked.current ? 1.0 : 0.0,
      0.07
    );
    plane.current.material.uniforms.u_direction.value = clicked.current
      ? 0.0
      : 1.0;
  });

  return (
    <group {...props}>
      <mesh
        onClick={() => (clicked.current = !clicked.current)}
        ref={plane}
        scale={[viewport.width, viewport.height, 1]}
      >
        <planeGeometry args={[1, 1, 30, 30]} />
        <shaderMaterial
          vertexShader={frameVertexShader}
          fragmentShader={frameFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
}
