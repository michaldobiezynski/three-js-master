import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, euler } from "@react-three/rapier";
import { Controls } from "../App";
import { useRef } from "react";
import { Vector3 } from "three";
import { BallCollider } from "@react-three/rapier";
import { vec3 } from "@react-three/rapier";
import { quat } from "@react-three/rapier";
const MOVEMENT_SPEED = 5;
const JUMP_FORCE = 8;
const ROTATION_SPEED = 5;

export const Player = () => {
  const camera = useRef();
  const cameraTarget = useRef(new Vector3(0, 0, 0));
  const rb = useRef();
  const [, get] = useKeyboardControls();
  const vel = new Vector3();
  const inTheAir = useRef(false);
  const punched = useRef(false);

  useFrame(() => {
    cameraTarget.current.lerp(vec3(rb.current.translation()), 0.5);
    camera.current.lookAt(cameraTarget.current);

    const curVel = rb.current?.linvel();

    vel.x = 0;
    vel.y = 0;
    vel.z = 0;

    const rotVel = {
      x: 0,
      y: 0,
      z: 0,
    };

    if (get()[Controls.forward]) {
      vel.z -= MOVEMENT_SPEED;
    }
    if (get()[Controls.back]) {
      vel.z += MOVEMENT_SPEED;
    }
    if (get()[Controls.left]) {
      rotVel.y += ROTATION_SPEED;
    }
    if (get()[Controls.right]) {
      rotVel.y -= ROTATION_SPEED;
    }

    rb.current.setAngvel(rotVel, true);
    const eulerRot = euler().setFromQuaternion(quat(rb.current.rotation()));
    vel.applyEuler(eulerRot);

    if (get()[Controls.jump] && !inTheAir.current) {
      vel.y += JUMP_FORCE;
      inTheAir.current = true;
    } else {
      vel.y = curVel.y;
    }
    if (!punched.current) {
      rb.current.setLinvel(vel, true);
    }
  });

  const respawn = () => {
    rb.current.setTranslation({
      x: 0,
      y: 5,
      z: 0,
    });
  };

  const scene = useThree((state) => state.scene);

  const teleport = () => {
    const gateOut = scene.getObjectByName("gateLargeWide_teamYellow");
    rb.current.setTranslation({
      x: gateOut.position.x,
      y: gateOut.position.y + 1,
      z: gateOut.position.z,
    });
    q;
  };

  return (
    <RigidBody
      gravityScale={2.5}
      ref={rb}
      lockRotations
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject.name === "ground") {
          inTheAir.current = false;
        }
        if (other.rigidBodyObject.name === "swiper") {
          punched.current = true;
          setTimeout(() => {
            punched.current = false;
          }, 1000);
        }
      }}
      onIntersectionEnter={({ other }) => {
        if (other.rigidBodyObject.name === "space") {
          respawn();
        }

        if (other.rigidBodyObject.name === "gateIn") {
          teleport();
        }
      }}>
      <PerspectiveCamera makeDefault position={[0, 5, 8]} ref={camera} />
      <mesh position-y={0.5} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </RigidBody>
  );
};
