import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Controls } from "../App";
import { useRef } from "react";
import { Vector3 } from "three";
import { BallCollider } from "@react-three/rapier";
const MOVEMENT_SPEED = 5;
const JUMP_FORCE = 8;

export const Player = () => {
  const rb = useRef();
  const [, get] = useKeyboardControls();
  const vel = new Vector3();
  const inTheAir = useRef(false);

  useFrame(() => {
    const curVel = rb.current?.linvel();

    vel.x = 0;
    vel.y = 0;
    vel.z = 0;
    if (get()[Controls.forward]) {
      vel.z -= MOVEMENT_SPEED;
    }
    if (get()[Controls.back]) {
      vel.z += MOVEMENT_SPEED;
    }
    if (get()[Controls.left]) {
      vel.x -= MOVEMENT_SPEED;
    }
    if (get()[Controls.right]) {
      vel.x += MOVEMENT_SPEED;
    }
    if (get()[Controls.jump] && !inTheAir.current) {
      vel.y += JUMP_FORCE;
      inTheAir.current = true;
    } else {
      vel.y = curVel.y;
    }
    rb.current.setLinvel(vel, true);
  });

  return (
    <RigidBody
      gravityScale={2.5}
      ref={rb}
      lockRotations
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject.name === "ground") {
          inTheAir.current = false;
        }
      }}>
      <mesh position-y={0.5} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </RigidBody>
  );
};
