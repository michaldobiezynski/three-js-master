import { useTexture } from "@react-three/drei";

import * as THREE from "three";

export const Background = () => {
  const map = useTexture(
    "/textures/Cyberpunk_equirectangular-jpg_showroom_filled_with_spotlights_1398797499_9567602 (1).jpg"
  );

  return (
    <mesh>
      <sphereGeometry args={[5, 64, 64]} />
      <meshBasicMaterial map={map} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
};
