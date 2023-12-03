import { Environment, Gltf, CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useControls, button } from "leva";

export const Experience = () => {
  const controls = useRef();
  const box = useRef();
  const sphere = useRef();

  useControls("Settings", {
    smoothTime: {
      value: 0.35,
      min: 0.1,
      max: 2,
      step: 0.1,
      onChange: (value) => {
        controls.current.smoothTime = value;
      },
    },
  });

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
    diagonal: button(() => {
      controls.current.truck(0.5, -0.5, true);
    }),
  });

  useControls("rotate", {
    up: button(() => {
      controls.current.rotate(0, -0.5, true);
    }),
    down: button(() => {
      controls.current.rotate(0, 0.5, true);
    }),
    left: button(() => {
      controls.current.rotate(-0.5, 0, true);
    }),
    right: button(() => {
      controls.current.rotate(0.5, 0, true);
    }),
  });

  useControls("fit", {
    fitToBox: button(() => {
      controls.current.fitToBox(box.current, true);
    }),
    fitToSphere: button(() => {
      controls.current.fitToSphere(sphere.current, false);
    }),
  });

  const cameraPositions = {
    intro: [0, 0, 3, 0, 0, 0],
    titanium: [0, 0, 3, 0, 0, 0],
    camera: [0, 0, 3, 0, 0, 0],
    "action-button": [0, 0, 3, 0, 0, 0],
  };

  const playTransition = () => {
    controls.current.setLookAt(...cameraPositions[sections[section]], true);
  };

  const intro = async () => {
    controls.current.setLookAt(0, 0, 5, 0, 0, 0, false);
    await controls.current.dolly(3, true);
    await controls.current.rotate(degToRad(45), degToRad(25), true);
  };

  useEffect(() => {
    intro();
  }, []);

  return (
    <>
      <CameraControls ref={controls} />
      <mesh visible={false} ref={box}>
        <boxGeometry args={[0.5, 1, 0.2]} />
        <meshBasicMaterial color="mediumpurple" wireframe />
      </mesh>
      <mesh visible={false} ref={sphere}>
        <sphereGeometry args={[0.3, 64]} />
        <meshBasicMaterial color="hotpink" wireframe />
      </mesh>
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
