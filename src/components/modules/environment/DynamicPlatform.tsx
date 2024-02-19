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
  forwardDepth = 1,
  sideWidth = 3,
}: SimplePlatformProps) => {
  const degrree_to_radian = (degree: number) => degree * (Math.PI / 180);

  const side_moveLeft = (sideWidth * block_size) / 2;
  const vert_movement = (forwardDepth * block_size) / 2;

  return (
    <group position={position as Vector3}>
      <ModelWithPhysics
        url="/cube1/Cube_Grass_Corner.gltf"
        physicsProps={{
          type: "fixed",
          position: [
            position[0] - side_moveLeft,
            position[1],
            position[2] + vert_movement,
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
            position[0] + block_size + side_moveLeft,
            position[1],
            position[2] + vert_movement,
          ],
          rotation: [0, degrree_to_radian(90), 0],
        }}
        receiveShadow
      />
      {/* top- left like */}

      {/* Middles go here, based on depth/width props */}
      {/* {sideWidth ? ( // in progress
        // top middle(s)
        <ModelWithPhysics
          url="/cube1/Cube_Grass_Side.gltf"
          physicsProps={{
            type: "fixed",
            position: [
              position[0] + sideWidth - block_size, // negataive, proogats to the right
              position[1],
              position[2] + vert_movement,
            ],
          }}
          receiveShadow
        />
      ) : null} */}

      {/* POC needs love, for side-width-top middle fill */}
      {Array(sideWidth)
        .fill(0)
        .map((_block_horizontal, id) => (
          <ModelWithPhysics
            url="/cube1/Cube_Grass_Side.gltf"
            physicsProps={{
              type: "fixed",
              position: [
                position[0] + sideWidth - block_size * id, // negataive, proogats to the right
                position[1],
                position[2] + vert_movement,
              ],
            }}
            receiveShadow
          />
        ))}

      <ModelWithPhysics
        url="/cube1/Cube_Grass_Corner.gltf"
        physicsProps={{
          type: "fixed",
          position: [
            position[0] + block_size + side_moveLeft,
            position[1],
            position[2] - block_size - vert_movement,
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
            position[0] - side_moveLeft,
            position[1],
            position[2] - block_size - vert_movement,
          ],
          rotation: [0, degrree_to_radian(-90), 0],
        }}
        receiveShadow
      />
      {/* bottom-right like */}
    </group>
  );
};
