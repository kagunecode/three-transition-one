import { Canvas } from "@react-three/fiber";
import Frame from "./components/Frame";
import { CameraControls } from "@react-three/drei";

export default function App() {
  return (
    <Canvas>
      <Frame />
    </Canvas>
  );
}
