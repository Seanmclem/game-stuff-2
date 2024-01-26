import type { Vector3 } from "@react-three/fiber";
import { ModelWithPhysics } from "../models/ModelWithPhysics";

export interface SimplePlatformProps {
  position: Vector3;
}

export const SimplePlatform = ({ position = [0, 0, 0] as Vector3 }) => {
  return (
    <ModelWithPhysics
      url="/Cube_Grass_Single.gltf"
      physicsProps={{ type: "fixed", position }}
    />
  );
};
