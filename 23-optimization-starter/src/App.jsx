import { Environment, PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Effects } from "./components/Effects";
import { Experience } from "./components/Experience";
import React from "react";

function App() {
  const [nbBoxes, setNbBoxes] = React.useState(1000);

  return (
    <>
      <Canvas camera={{ position: [0, 2, 10], fov: 42 }}>
        <color attach="background" args={["#ffffff"]} />
        <fog attach="fog" args={["#ffffff", 10, 50]} />
        <PerformanceMonitor
          onChange={(api) => console.log(api)}
          onIncline={({ incline }) => console.log(`Incline: ${incline}`)}
          onDecline={({ decline }) => console.log(`Decline: ${decline}`)}
          nbBoxes={nbBoxes}
        />
        <group position-y={-2}>
          <Experience />
        </group>
        <Environment preset="sunset" />
        <Effects />
      </Canvas>
    </>
  );
}

export default App;
