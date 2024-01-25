import type { CollisionPayload } from "@react-three/rapier";
import { useLevelStore } from "../../stores/useLevelStore";
import { BasicBoxSensor } from "./BasicBoxSensor";
import type { Vector3 } from "@react-three/fiber";

export interface LevelEndProps {
  position?: Vector3;
}

export const LevelEnd = ({ position = [0, 2.5, 10] as Vector3 }) => {
  const { current_level, set_current_level } = useLevelStore();

  const handle_reached_goal = (event: CollisionPayload) => {
    if (
      event.colliderObject.name === "character-capsule-collider" &&
      current_level === 1
    ) {
      set_current_level(2);
    }
  };

  return (
    <BasicBoxSensor
      position={position}
      handle_intersection_enter={handle_reached_goal}
      wireframe
    />
  );
};
