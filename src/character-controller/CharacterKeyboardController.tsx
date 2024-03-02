import Ecctrl from "ecctrl";
import CharacterModel from "../components/example/CharacterModel";
import { keyboardMap } from "./control-constants";
import { KeyboardControls } from "@react-three/drei";
import type { Vector3 } from "@react-three/fiber";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CharacterKeyboardController = ({
  children,
  position = [0, 0, 0] as Vector3,
}: {
  children: any;
  position?: Vector3;
}) => {
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
        position={position}
        // jumpVelocity={6}
      >
        {/* Replace your model here */}
        {children}
      </Ecctrl>
    </KeyboardControls>
  );
};
