import { SimplePlatform as SimplePlatform1 } from "../../components/modules/environment/SimplePlatform";
import { Physics } from "@react-three/rapier";

import { useControls } from "leva";
import DynamicPlatforms from "../../components/example/DynamicPlatforms.js";
import FloatingPlatform from "../../components/example/FloatingPlatform.js";
import Floor from "../../components/example/Floor.js";
import Lights from "../../components/example/Lights.js";
import RigidObjects from "../../components/example/RigidObjects.js";
import RoughPlane from "../../components/example/RoughPlane.js";
import Slopes from "../../components/example/Slopes.js";
import Steps from "../../components/example/Steps.js";
// import { Grid, Box } from "@react-three/drei";

import { EscMenu } from "../../components/modules/Hud/EscMenu.jsx";
import { SimplePlatform } from "../../components/modules/environment/SimplePlatform.jsx";
import { LevelEnd } from "../../components/sensors-triggers-etc/LevelEnd.jsx";
import { PlayerStart } from "../../components/PlayerStart/PlayerStart";
import { DynamicPlatform } from "../../components/modules/environment/DynamicPlatform";

export const LevelOne = () => {
  /**
   * Debug settings
   */
  const { physics } = useControls("World Settings", {
    physics: false,
  });

  return (
    <>
      <EscMenu />

      <Lights />

      <Physics debug={physics} timeStep="vary">
        <PlayerStart />

        {/* <SimplePlatform position={[5, -0.5, 1]} />
        <SimplePlatform position={[7.46, 0.3, 1]} /> */}

        <DynamicPlatform position={[-1, -0.3, 3]} />

        {/* left/right, height, forward-depth */}

        <LevelEnd position={[0, 2.5, 20.14]} />

        {/* Generic from ECCTRL below */}

        {/* Rough plan */}
        {/* <RoughPlane /> */}

        {/* Slopes and stairs */}
        <Slopes />
        {/* Find adjustable slope code */}

        {/* Small steps */}
        {/* <Steps /> */}

        {/* Rigid body objects */}
        <RigidObjects />

        {/* Floating platform */}
        <FloatingPlatform />

        {/* Dynamic platforms */}
        <DynamicPlatforms />

        {/* Floor */}
        <Floor />
      </Physics>
    </>
  );
};
