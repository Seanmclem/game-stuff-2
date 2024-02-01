/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoader, useThree } from "@react-three/fiber";
import { RigidBody, type RigidBodyProps } from "@react-three/rapier";
import { useMemo } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const ModelWithPhysics = ({
  url,
  physicsProps,
  receiveShadow,
  castShadow,
}: {
  url: string;
  physicsProps: RigidBodyProps;
  receiveShadow?: boolean;
  castShadow?: boolean;
}) => {
  const gltf = useLoader(GLTFLoader, url);

  const modifiedScene = useMemo(() => {
    const sceneClone = gltf.scene.clone();

    // Traverse the scene and set castShadow and receiveShadow on each mesh
    if (receiveShadow || castShadow) {
      sceneClone.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = !!castShadow;
          child.receiveShadow = !!receiveShadow;
        }
      });
    }

    return sceneClone;
  }, [gltf.scene, receiveShadow, castShadow]);

  // Use the useThree hook to access the Three.js renderer and configure it to support shadows
  const { gl } = useThree();
  useMemo(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap; // This is optional, depending on the type of shadows you want
  }, [gl]);

  return (
    <RigidBody {...physicsProps}>
      <primitive object={modifiedScene} />
    </RigidBody>
  );
};
