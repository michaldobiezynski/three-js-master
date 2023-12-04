import { SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { UI } from "./UI";
import { Experience } from "./components/Experience";
import { getProject } from "@theatre/core";

function App() {
  const [currentScreen, setCurrentScreen] = useState("Intro");
  const [targetScreen, setTargetScreen] = useState("Home");

  const project = getProject("MedievalTown");
  const mainSheet = project.sheet("Main");

  return (
    <>
      <UI
        currentScreen={currentScreen}
        onScreenChange={setTargetScreen}
        isAnimating={currentScreen !== targetScreen}
      />
      <Canvas camera={{ position: [5, 5, 10], fov: 30, near: 1 }} shadows>
        <SoftShadows />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
