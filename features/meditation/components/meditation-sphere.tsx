"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { fragmentShader, vertexShader } from "@/features/shaders/wobble";

import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { Shader } from "../shaders/blob";
import React from "react";

const uniforms = {
  uTime: { value: 0 },
  uPositionFrequency: { value: 0.5 },
  uTimeFrequency: { value: 0.4 },
  uStrength: { value: 0.3 },
  uWarpPositionFrequency: { value: 0.38 },
  uWarpTimeFrequency: { value: 0.12 },
  uWarpStrength: { value: 1.7 },
  uColorA: { value: new THREE.Color("#ff0000") },
  uColorB: { value: new THREE.Color("#0000ff") },
};

const material = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  /**
   * Shader Properties
   */
  vertexShader,
  fragmentShader,
  /**
   * Material Properties
   */
  metalness: 0,
  roughness: 0.3,
  color: 0xff0000,
  transmission: 0,
  ior: 2.5,
  thickness: 1.5,
  transparent: true,
  wireframe: false,
  /**
   * Uniforms
   */
  uniforms,
});

const depthMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshDepthMaterial,
  vertexShader,
  uniforms,
  depthPacking: THREE.RGBADepthPacking,
});

let geometry: THREE.BufferGeometry = new THREE.IcosahedronGeometry(2.5, 64);
geometry = mergeVertices(geometry);
geometry.computeTangents();

type MeditationSphereProps = React.ComponentProps<"mesh"> & {
  shaderSettings: Shader;
};

export function MeditationSphere({ shaderSettings }: MeditationSphereProps) {
  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uPositionFrequency.value =
      shaderSettings.positionFrequency;
    material.uniforms.uTimeFrequency.value = shaderSettings.timeFrequency;
    material.uniforms.uStrength.value = shaderSettings.strength;
    material.uniforms.uWarpPositionFrequency.value =
      shaderSettings.warpSettings.warpPositionFrequency;
    material.uniforms.uWarpTimeFrequency.value =
      shaderSettings.warpSettings.warpTimeFrequency;
    material.uniforms.uWarpStrength.value =
      shaderSettings.warpSettings.warpStrength;
    material.uniforms.uColorA.value.set(shaderSettings.colors.primary);
    material.uniforms.uColorB.value.set(shaderSettings.colors.secondary);
  });

  const rotation = React.useMemo(() => {
    return [Math.random() * 360, Math.random() * 360, Math.random() * 360] as [
      number,
      number,
      number,
    ];
  }, []);

  return (
    <mesh castShadow receiveShadow geometry={geometry} rotation={rotation}>
      <primitive object={material} attach="material" />
      <primitive object={depthMaterial} attach="customDepthMaterial" />
    </mesh>
  );
}
