import { EffectComposer } from "@react-three/postprocessing";

import { Vignette } from "@react-three/postprocessing";
import { useControls } from "leva";

export const Effects = () => {
  const vignetteConfig = useControls("Vignette", {
    enabled: true,
    offset: {
      value: 0.1,
      min: 0,
      max: 1,
    },
    darkness: {
      value: 0.92,
      min: 0,
      max: 1,
    },
  });
  return (
    <EffectComposer>
      {vignetteConfig.enabled && <Vignette {...vignetteConfig} />}
    </EffectComposer>
  );
};
