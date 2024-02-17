import type { Vector3 } from "@react-three/fiber";
import { ModelWithPhysics } from "../models/ModelWithPhysics";

export interface SimplePlatformProps {
  position: number[];
  forwardDepth?: number;
  sideWidth?: number;
}

const block_size = 2;

export const DynamicPlatform = ({
  position = [0, 0, 0],
  forwardDepth = 0,
  sideWidth = 2,
}: SimplePlatformProps) => {
  const degrree_to_radian = (degree: number) => degree * (Math.PI / 180);

  const topRight_moveRight = -(sideWidth * block_size) / 2;
  const topLeft_moveLeft = (sideWidth * block_size) / 2;
  const bottomRight_moveRight = -(sideWidth * block_size) / 2;
  const bottomLeft_moveLeft = (sideWidth * block_size) / 2;

  return (
    <group position={position as Vector3}>
      <ModelWithPhysics
        url="/cube1/Cube_Grass_Corner.gltf"
        physicsProps={{
          type: "fixed",
          position: [
            position[0] + topRight_moveRight,
            position[1],
            position[2],
          ],
        }}
        receiveShadow
      />
      {/* top-right like */}

      <ModelWithPhysics
        url="/cube1/Cube_Grass_Corner.gltf"
        physicsProps={{
          type: "fixed",
          position: [
            position[0] + block_size + topLeft_moveLeft,
            position[1],
            position[2],
          ],
          rotation: [0, degrree_to_radian(90), 0],
        }}
        receiveShadow
      />
      {/* top- left like */}

      {/* Middles go here, based on depth/width props */}

      <ModelWithPhysics
        url="/cube1/Cube_Grass_Corner.gltf"
        physicsProps={{
          type: "fixed",
          position: [
            position[0] + block_size + bottomLeft_moveLeft,
            position[1],
            position[2] - block_size, //- forwardDepth * block_size,
          ],
          rotation: [0, degrree_to_radian(180), 0],
        }}
        receiveShadow
      />
      {/* bottom-left like */}

      <ModelWithPhysics
        url="/cube1/Cube_Grass_Corner.gltf"
        physicsProps={{
          type: "fixed",
          position: [
            position[0] + bottomRight_moveRight,
            position[1],
            position[2] - block_size,
          ],
          rotation: [0, degrree_to_radian(-90), 0],
        }}
        receiveShadow
      />
      {/* bottom-right like */}
    </group>
  );
};
