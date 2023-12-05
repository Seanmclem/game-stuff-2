import Ecctrl from "ecctrl";
import CharacterModel from "../components/example/CharacterModel";
import { keyboardMap } from "./control-constants";
import { KeyboardControls } from "@react-three/drei";

export const CharacterKeyboardController = ({ children }: any) => {
  return (
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
        {children}
      </Ecctrl>
    </KeyboardControls>
  );
};
