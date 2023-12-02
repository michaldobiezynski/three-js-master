import { OrbitControls, Stage, MeshReflectorMaterial } from "@react-three/drei";
import { TeslaModel3 } from "./TeslaModel3";

export const Experience = () => {
  return (
    <>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.72}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        maxDistance={15}
        minDistance={6}
      />
      <ambientLight intensity={0.4} />
      {/* <Stage intensity={0.4} preset={"upfront"} environment={"studio"}> */}
      <TeslaModel3 scale={0.012} position-z={0.6} />
      {/* </Stage> */}

      {/* Ground */}
      <mesh position={[0, -1.18, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          color={"#171720"}
          resolution={1024}
          roughness={0.6}
          mixStrength={3}
        />
      </mesh>
    </>
  );
};
