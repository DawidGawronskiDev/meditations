"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { fragmentShader, vertexShader } from "@/features/shaders/wobble";

import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { Shader } from "../shaders/blob";
import React from "react";

let geometry: THREE.BufferGeometry = new THREE.IcosahedronGeometry(2.5, 64);
geometry = mergeVertices(geometry);
geometry.computeTangents();

type MeditationSphereProps = React.ComponentProps<"mesh"> & {
  shaderSettings: Shader;
};

export function MeditationSphere({
  shaderSettings,
  ...props
}: MeditationSphereProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const isFirstRender = React.useRef(true);

  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uPositionFrequency: { value: 0.5 },
      uTimeFrequency: { value: 0.4 },
      uStrength: { value: 0.3 },
      uWarpPositionFrequency: { value: 0.38 },
      uWarpTimeFrequency: { value: 0.12 },
      uWarpStrength: { value: 1.7 },
      uColorA: { value: new THREE.Color("#ff0000") },
      uColorB: { value: new THREE.Color("#0000ff") },
    }),
    [],
  );

  const material = React.useMemo(
    () =>
      new CustomShaderMaterial({
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
      }),
    [uniforms],
  );

  const depthMaterial = React.useMemo(
    () =>
      new CustomShaderMaterial({
        baseMaterial: THREE.MeshDepthMaterial,
        vertexShader,
        uniforms,
        depthPacking: THREE.RGBADepthPacking,
      }),
    [uniforms],
  );

  React.useEffect(() => {
    return () => {
      material.dispose();
      depthMaterial.dispose();
    };
  }, [material, depthMaterial]);

  React.useEffect(() => {
    const targetColorA = new THREE.Color(shaderSettings.colors.primary);
    const targetColorB = new THREE.Color(shaderSettings.colors.secondary);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      uniforms.uPositionFrequency.value = shaderSettings.positionFrequency;
      uniforms.uTimeFrequency.value = shaderSettings.timeFrequency;
      uniforms.uStrength.value = shaderSettings.strength;
      uniforms.uWarpPositionFrequency.value =
        shaderSettings.warpSettings.warpPositionFrequency;
      uniforms.uWarpTimeFrequency.value =
        shaderSettings.warpSettings.warpTimeFrequency;
      uniforms.uWarpStrength.value = shaderSettings.warpSettings.warpStrength;
      uniforms.uColorA.value.copy(targetColorA);
      uniforms.uColorB.value.copy(targetColorB);
      return;
    }

    // Morph shape and color into the new technique instead of snapping.
    const tweens = [
      gsap.to(uniforms.uPositionFrequency, {
        value: shaderSettings.positionFrequency,
        duration: 2.0,
        ease: "power2.inOut",
      }),
      gsap.to(uniforms.uTimeFrequency, {
        value: shaderSettings.timeFrequency,
        duration: 2.0,
        ease: "power2.inOut",
      }),
      gsap.to(uniforms.uStrength, {
        value: shaderSettings.strength,
        duration: 2.0,
        ease: "power2.inOut",
      }),
      gsap.to(uniforms.uWarpPositionFrequency, {
        value: shaderSettings.warpSettings.warpPositionFrequency,
        duration: 2.0,
        ease: "power2.inOut",
      }),
      gsap.to(uniforms.uWarpTimeFrequency, {
        value: shaderSettings.warpSettings.warpTimeFrequency,
        duration: 2.0,
        ease: "power2.inOut",
      }),
      gsap.to(uniforms.uWarpStrength, {
        value: shaderSettings.warpSettings.warpStrength,
        duration: 2.0,
        ease: "power2.inOut",
      }),
      gsap.to(uniforms.uColorA.value, {
        r: targetColorA.r,
        g: targetColorA.g,
        b: targetColorA.b,
        duration: 2.0,
        ease: "power2.inOut",
      }),
      gsap.to(uniforms.uColorB.value, {
        r: targetColorB.r,
        g: targetColorB.g,
        b: targetColorB.b,
        duration: 0.6,
        ease: "power2.inOut",
      }),
    ];

    return () => tweens.forEach((tween) => tween.kill());
  }, [shaderSettings, uniforms]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.elapsedTime * 0.1;
    uniforms.uTime.value = clock.elapsedTime;
  });

  const rotation = React.useMemo(() => {
    return [Math.random() * 360, Math.random() * 360, Math.random() * 360] as [
      number,
      number,
      number,
    ];
  }, []);

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      geometry={geometry}
      rotation={rotation}
      {...props}
    >
      <primitive object={material} attach="material" />
      <primitive object={depthMaterial} attach="customDepthMaterial" />
    </mesh>
  );
}
