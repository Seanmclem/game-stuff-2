/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const usePointerLock = ({
  onLock,
  onUnlock,
}: {
  onLock?: (...args: any[]) => any;
  onUnlock?: (...args: any[]) => any;
}) => {
  const [lockedElement, setLockedElement] = useState<Element>(null);

  useEffect(() => {
    const handlePointerLockChange = () => {
      const isPointerLocked = !!document.pointerLockElement;

      if (document.pointerLockElement && isPointerLocked) {
        // Handle pointer lock change
        setLockedElement(document.pointerLockElement);
        if (onLock) {
          onLock();
        } else {
          console.log("Pointer locked to: " + document.pointerLockElement);
        }
      } else if (!isPointerLocked) {
        // Handle pointer UNlock change
        if (onUnlock) {
          onUnlock();
        } else {
          console.log("Pointer unlocked from: " + lockedElement);
        }
      }
    };

    const handlePointerLockError = () => {
      console.error("Failed to lock pointer");
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("pointerlockerror", handlePointerLockError);

    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
      document.removeEventListener("pointerlockerror", handlePointerLockError);
    };
  }, []);

  return { lockedElement };
};

export default usePointerLock;
