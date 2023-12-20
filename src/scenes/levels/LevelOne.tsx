import { Physics } from "@react-three/rapier";

import type { CollisionPayload } from "@react-three/rapier/dist/declarations/src";

import { useControls } from "leva";
import DynamicPlatforms from "../../components/example/DynamicPlatforms.js";
import FloatingPlatform from "../../components/example/FloatingPlatform.js";
import Floor from "../../components/example/Floor.js";
import Lights from "../../components/example/Lights.js";
import RigidObjects from "../../components/example/RigidObjects.js";
import RoughPlane from "../../components/example/RoughPlane.js";
import ShotCube from "../../components/example/ShotCube.js";
import Slopes from "../../components/example/Slopes.js";
import Steps from "../../components/example/Steps.js";
// import { Grid, Box } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { CharacterKeyboardController } from "../../character-controller/CharacterKeyboardController.js";

import { useLevelStore } from "../../stores/useLevelStore.js";
import { BasicBoxSensor } from "../../components/sensors-triggers-etc/BasicBoxSensor.js";
import CharacterModel from "../../components/character-models/floater-model/CharacterModel.js";
import { HudPlanes } from "../../modules/Hud/HudPlanes.js";

export const LevelOne = () => {
  /**
   * Debug settings
   */
  const { physics } = useControls("World Settings", {
    physics: false,
  });

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
    <>
      <HudPlanes />
      {/* <Perf position="top-left" minimal />

      <Grid
        args={[300, 300]}
        sectionColor={"lightgray"}
        cellColor={"gray"}
        position={[0, -0.99, 0]}
        userData={{ camExcludeCollision: true }} // this won't be collide by camera ray
      /> */}

      <Lights />

      <Physics debug={physics} timeStep="vary">
        <CharacterKeyboardController>
          <CharacterModel />
        </CharacterKeyboardController>
        {/* left/right, height, forward-depth */}

        <BasicBoxSensor
          handle_intersection_enter={handle_reached_goal}
          wireframe
        />

        {/* Rough plan */}
        <RoughPlane />

        {/* Slopes and stairs */}
        <Slopes />

        {/* Small steps */}
        <Steps />

        {/* Rigid body objects */}
        <RigidObjects />

        {/* Floating platform */}
        <FloatingPlatform />

        {/* Dynamic platforms */}
        <DynamicPlatforms />

        {/* Floor */}
        <Floor />

        {/* Shoting cubes */}
        <ShotCube />
      </Physics>
    </>
  );
};
