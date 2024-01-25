import { useLoader } from "@react-three/fiber";
import { RigidBody, type RigidBodyProps } from "@react-three/rapier";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const ModelWithPhysics = ({
  url,
  physicsProps,
}: {
  url: string;
  physicsProps: RigidBodyProps;
}) => {
  const gltf = useLoader(GLTFLoader, url);
  return (
    <RigidBody {...physicsProps}>
      <primitive object={gltf.scene} />
    </RigidBody>
  );
};
