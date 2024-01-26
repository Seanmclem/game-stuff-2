import type { Vector3 } from "@react-three/fiber";
import { CharacterKeyboardController } from "../../character-controller/CharacterKeyboardController";

import DefaultFloaterModel from "../character-models/floater-model/CharacterModel.js";

export interface PlayerStartProps {
  children?: React.ReactNode;
  position?: Vector3;
}

export const PlayerStart = ({ children, position }: PlayerStartProps) => {
  return (
    <CharacterKeyboardController position={position}>
      {children || <DefaultFloaterModel />}
    </CharacterKeyboardController>
  );
};
