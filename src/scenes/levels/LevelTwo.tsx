import { Physics } from "@react-three/rapier";

import { useControls } from "leva";

import Floor from "../../components/example/Floor.js";
import Lights from "../../components/example/Lights.js";
import RoughPlane from "../../components/example/RoughPlane.js";
import ShotCube from "../../components/example/ShotCube.js";

import { CharacterKeyboardController } from "../../character-controller/CharacterKeyboardController.js";
import CharacterModel from "../../components/character-models/ghost-guy/CharacterModel.js";

export const LevelTwo = () => {
  /**
   * Debug settings
   */
  const { physics } = useControls("World Settings", {
    physics: false,
  });

  return (
    <>
      <Lights />

      <Physics debug={physics} timeStep="vary">
        <CharacterKeyboardController>
          <CharacterModel />
        </CharacterKeyboardController>

        {/* Rough plan */}
        <RoughPlane />

        {/* Floor */}
        <Floor />
      </Physics>
    </>
  );
};
