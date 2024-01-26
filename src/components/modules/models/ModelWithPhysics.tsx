/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoader } from "@react-three/fiber";
import { RigidBody, type RigidBodyProps } from "@react-three/rapier";
import { useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const ModelWithPhysics = ({
  url,
  physicsProps,
}: {
  url: string;
  physicsProps: RigidBodyProps;
}) => {
  const gltf = useLoader(GLTFLoader, url);
  // const modifiedScene = useMemo(() => {
  //   const sceneClone = gltf.scene.clone();
  //   // Modify the clone as needed, e.g., change materials, add objects, etc.
  //   return sceneClone;
  // }, [gltf.scene]);
  const modifiedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  return (
    <RigidBody {...physicsProps}>
      <primitive object={modifiedScene} />
    </RigidBody>
  );
};
