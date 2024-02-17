import type { Vector3 } from "@react-three/fiber";
import { ModelWithPhysics } from "../models/ModelWithPhysics";

export interface SimplePlatformProps {
  position: Vector3;
}

export const DynamicPlatform = ({ position = [0, 0, 0] as number[] }) => {
  const degrree_to_radian = (degree: number) => degree * (Math.PI / 180);

  return (
    <group position={position as Vector3}>
      <ModelWithPhysics
        url="/cube1/Cube_Grass_Corner.gltf"
        physicsProps={{ type: "fixed", position: position as Vector3 }}
        receiveShadow
      />

      <ModelWithPhysics
        url="/cube1/Cube_Grass_Corner.gltf"
        physicsProps={{
          type: "fixed",
          position: [position[0] + 2, position[1], position[2]],
          rotation: [0, degrree_to_radian(90), 0],
        }}
        receiveShadow
      />

      <ModelWithPhysics
        url="/cube1/Cube_Grass_Corner.gltf"
        physicsProps={{
          type: "fixed",
          position: [position[0] + 2, position[1], position[2] - 2],
          rotation: [0, degrree_to_radian(180), 0],
        }}
        receiveShadow
      />

      <ModelWithPhysics
        url="/cube1/Cube_Grass_Corner.gltf"
        physicsProps={{
          type: "fixed",
          position: [position[0], position[1], position[2] - 2],
          rotation: [0, degrree_to_radian(-90), 0],
        }}
        receiveShadow
      />
    </group>
  );
};
