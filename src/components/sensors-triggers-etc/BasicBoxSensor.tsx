import { Box } from "@react-three/drei";
import type { Vector3 } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import type { CollisionPayload } from "@react-three/rapier/dist/declarations/src";

const default_box_size = 5;

interface BasicBoxSensorProps {
  size?: number;
  position?: Vector3;
  handle_intersection_enter: (event: CollisionPayload) => void;
  handle_intersection_exit?: (event: CollisionPayload) => void;
  wireframe?: boolean;
}

export const BasicBoxSensor = ({
  size = default_box_size,
  position = [0, 2.5, 10],
  handle_intersection_enter,
  handle_intersection_exit,
  wireframe = false,
}: BasicBoxSensorProps) => {
  return (
    <>
      {wireframe ? (
        <Box args={[size, size, size]} position={position}>
          <meshBasicMaterial wireframe />
        </Box>
      ) : null}
      <RigidBody type="fixed" position={position}>
        <CuboidCollider
          args={[size / 2, size / 2, size / 2]}
          // ^ 5,5,5 VS 2.5,2.5,2.5 -> because Rapier uses half extents for the collider
          sensor
          onIntersectionEnter={handle_intersection_enter}
          onIntersectionExit={(e) => handle_intersection_exit?.(e)}
        />
      </RigidBody>
    </>
  );
};
