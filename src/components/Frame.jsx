import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import img from "../assets/img/image.jpg";
import { motion } from "framer-motion-3d";

import { frameFragmentShader } from "../shaders/fragmentShader";
import { frameVertexShader } from "../shaders/vertexShader";
import { useTexture } from "@react-three/drei";

export default function Frame({ ...props }) {
  const viewport = useThree();
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
    }),
    []
  );

  useFrame(() => {
    plane.current.material.uniforms.u_progress.value = THREE.MathUtils.lerp(
      plane.current.material.uniforms.u_progress.value,
      clicked.current ? 1.0 : 0.0,
      0.08
    );
  });

  return (
    <group {...props}>
      <motion.mesh
        onClick={() => (clicked.current = !clicked.current)}
        ref={plane}
        scale={[17, 8, 1]}
      >
        <planeGeometry args={[1, 1, 100, 100]} />
        <shaderMaterial
          vertexShader={frameVertexShader}
          fragmentShader={frameFragmentShader}
          uniforms={uniforms}
        />
      </motion.mesh>
    </group>
  );
}