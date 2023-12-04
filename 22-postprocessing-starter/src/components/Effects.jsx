import { EffectComposer } from "@react-three/postprocessing";

import { Vignette } from "@react-three/postprocessing";
import { Bloom } from "@react-three/postprocessing";
import { BrightnessContrast } from "@react-three/postprocessing";
import { Sepia } from "@react-three/postprocessing";
import { Noise } from "@react-three/postprocessing";
import { Autofocus } from "@react-three/postprocessing";

import { BlendFunction } from "postprocessing";

import { useControls } from "leva";

export const Effects = () => {
  const noiseConfig = useControls("noise", {
    enabled: true,
    opacity: { value: 0.1, min: 0, max: 1 },
  });
  const sepiaConfig = useControls("sepia", {
    enabled: true,
    blendFunction: {
      value: "DARKEN",
      options: Object.keys(BlendFunction),
    },
  });
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

  const autofocusConfig = useControls("autofocus", {
    enabled: true,
    mouse: true,
    focusRange: { value: 0.001, min: 0, max: 0.01 },
    bokehScale: { value: 8, min: 0, max: 40 },
    focalLength: { value: 0.8, min: 0, max: 1 },
    smoothTime: { value: 0.5, min: 0, max: 1 },
  });

  return (
    <EffectComposer>
      {vignetteConfig.enabled && <Vignette {...vignetteConfig} />}
      {bloomConfig.enabled && <Bloom {...bloomConfig} />}
      {brightnessContrastConfig.enabled && (
        <BrightnessContrast {...brightnessContrastConfig} />
      )}
      {sepiaConfig.enabled && (
        <Sepia
          {...sepiaConfig}
          blendFunction={BlendFunction[sepiaConfig.blendFunction]}
        />
      )}
      {noiseConfig.enabled && <Noise {...noiseConfig} />}
      {autofocusConfig.enabled && <Autofocus {...autofocusConfig} />}
    </EffectComposer>
  );
};
