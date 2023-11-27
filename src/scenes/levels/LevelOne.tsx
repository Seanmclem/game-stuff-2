import { Physics } from "@react-three/rapier";

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
import { Grid, Box } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { CharacterKeyboardController } from "../../character-controller/CharacterKeyboardController.js";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

const collider_box_size = 5;

export const LevelOne = () => {
  /**
   * Debug settings
   */
  const { physics } = useControls("World Settings", {
    physics: false,
  });

  return (
    <>
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
        <CharacterKeyboardController />
        {/* left/right, height, forward-depth */}
        <Box
          args={[collider_box_size, collider_box_size, collider_box_size]}
          position={[0, 2.5, 10]}
        >
          <meshBasicMaterial wireframe />
        </Box>
        <RigidBody type="fixed" position={[0, 2.5, 10]}>
          <CuboidCollider
            args={[
              collider_box_size / 2,
              collider_box_size / 2,
              collider_box_size / 2,
            ]}
            // ^ 5,5,5 VS 2.5,2.5,2.5 -> because Rapier uses half extents for the collider
            sensor
            onIntersectionEnter={(e) => console.log("Goal!", e)}
            onIntersectionExit={() => console.log("Exited")}
          />
        </RigidBody>

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
