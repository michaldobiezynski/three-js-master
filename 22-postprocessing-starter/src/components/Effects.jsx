import { EffectComposer } from "@react-three/postprocessing";

import { Vignette } from "@react-three/postprocessing";
import { Bloom } from "@react-three/postprocessing";
import { BrightnessContrast } from "@react-three/postprocessing";

import { useControls } from "leva";

export const Effects = () => {
  const brightnessContrastConfig = useControls("brightnessContrast", {
    enabled: true,
    brightness: { value: 0.02, min: -1, max: 1 },
    contrast: { value: -0.1, min: -1, max: 1 },
  });
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

  const bloomConfig = useControls("bloom", {
    enabled: true,
    luminanceThreshold: { value: 1, min: 0, max: 2 },
    intensity: { value: 1.28, min: 0, max: 2 },
    mipmapBlur: true,
  });
  return (
    <EffectComposer>
      {vignetteConfig.enabled && <Vignette {...vignetteConfig} />}
      {bloomConfig.enabled && <Bloom {...bloomConfig} />}
      {brightnessContrastConfig.enabled && (
        <BrightnessContrast {...brightnessContrastConfig} />
      )}
    </EffectComposer>
  );
};
