import { Grid, KeyboardControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
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

import Ecctrl from "ecctrl";
import CharacterModel from "../../components/example/CharacterModel.js";

export const LevelTwo = () => {
  /**
   * Debug settings
   */
  const { physics } = useControls("World Settings", {
    physics: false,
  });

  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
  ];

  return (
    <>
      <Perf position="top-left" minimal />

      <Grid
        args={[300, 300]}
        sectionColor={"lightgray"}
        cellColor={"gray"}
        position={[0, -0.99, 0]}
        userData={{ camExcludeCollision: true }} // this won't be collide by camera ray
      />

      <Lights />

      <Physics debug={physics} timeStep="vary">
        {/* Keyboard preset */}
        <KeyboardControls map={keyboardMap}>
          {/* Character Control */}
          <Ecctrl
            debug
            animated
            followLight
            springK={2}
            dampingC={0.2}
            autoBalanceSpringK={1.2}
            autoBalanceDampingC={0.04}
          >
            {/* Replace your model here */}
            <CharacterModel />
          </Ecctrl>
        </KeyboardControls>

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
