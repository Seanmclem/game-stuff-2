import React, { useState } from "react";
import { useKeypressMenu } from "./useKeypressMenu";
import usePointerLock from "./usePointerLock";
import { useThree, type Vector3 } from "@react-three/fiber";
import { Plane, Hud, OrthographicCamera } from "@react-three/drei";

export const EscMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { size } = useThree();

  const position_offset = 60;

  const top_right = [
    size.width / 2 - position_offset,
    size.height / 2 - position_offset,
    0,
  ] as unknown as Vector3;

  const handle_Escape_Press = (event: KeyboardEvent) => {
    console.log("MANUAL: " + event.key + " key pressed");
    setMenuOpen(true);
  };

  const handleKeyPressLOCK = () => {
    console.log("Pointer: LOCKED");
    setMenuOpen(false);
  };

  const handleKeyPressUNLOCK = () => {
    console.log("Pointer: unlocked");
    setMenuOpen(true);
  };

  const { lockedElement } = usePointerLock({
    onLock: handleKeyPressLOCK,
    onUnlock: handleKeyPressUNLOCK,
  });

  const onClose = () => {
    setMenuOpen(false);
    if (lockedElement) {
      lockedElement.requestPointerLock();
    }
  };

  useKeypressMenu({
    keyPressed: "Escape",
    action: handle_Escape_Press,
  });

  const handlePress = (e) => {
    console.log("PRESSED");
    e.stopPropagation();
    // (e.target as HTMLCanvasElement).requestPointerLock();
  };

  if (menuOpen) {
    return (
      <Hud renderPriority={1}>
        <OrthographicCamera makeDefault position={[0, 0, 100]} />
        <Plane
          position={top_right}
          args={[80, 80]} // Size of the plane
          onClick={handlePress}
        >
          <meshLambertMaterial color={"hotpink"} />
        </Plane>

        <ambientLight intensity={1} />
        <pointLight position={[200, 200, 100]} intensity={0.5} />
      </Hud>
    );
  }

  return null;
};
