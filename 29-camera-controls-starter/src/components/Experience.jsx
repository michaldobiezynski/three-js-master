import { Environment, Gltf, CameraControls } from "@react-three/drei";
import { useRef } from "react";
import { useControls, button } from "leva";

export const Experience = () => {
  const controls = useRef();

  useControls("Dolly", {
    in: button(() => controls.current?.dolly(1, true)),
    out: button(() => controls.current?.dolly(-1, true)),
  });

  useControls("truck", {
    up: button(() => {
      controls.current.truck(0, -0.5, true);
    }),
    left: button(() => {
      controls.current.truck(-0.5, 0, true);
    }),
    down: button(() => {
      controls.current.truck(0, 0.5, true);
    }),
    right: button(() => {
      controls.current.truck(0.5, 0, true);
    }),
  });

  return (
    <>
      <CameraControls ref={controls} />
      <Gltf
        position={[0, 0, 0]}
        src="models/apple_iphone_15_pro_max_black.glb"
        // "Apple iPhone 15 Pro Max Black" (https://skfb.ly/oLpPT) by polyman is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
      />
      <group rotation-y={Math.PI}>
        <Environment preset="warehouse" blur />
      </group>
    </>
  );
};
