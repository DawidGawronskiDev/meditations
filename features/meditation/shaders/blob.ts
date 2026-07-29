export type Shader = {
  name: string;
  vertexShader: string;
  fragmentShader: string;
  colors: {
    primary: string;
    secondary: string;
  };
  positionFrequency: number; // 0.0 - 1.0
  timeFrequency: number; // 0.0 - 2.0
  strength: number; // 0.0 - 0.5
  warpSettings: WarpSettings;
};

export type WarpSettings = {
  warpPositionFrequency: number; // 0.0 - 0.5
  warpTimeFrequency: number; // 0.0 - 2.0
  warpStrength: number; // 0.0 - 2.0
};

export const vertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vUv = uv;
}
`;

export const fragmentShader = /* glsl */ `
uniform sampler2D uNoiseTexture;
uniform float uTime;

varying vec2 vUv;

void main() {
  vec2 st = vUv * 3.0;
  st.y -= uTime * 0.15;

  vec4 noise = texture2D(uNoiseTexture, st);


  vec3 color = vec3(
    mix(1.0, noise.r, 0.5),
    mix(0.5, noise.g, 0.5),
    0.0
  );

  gl_FragColor = vec4(color, 1.0); 
}
`;
