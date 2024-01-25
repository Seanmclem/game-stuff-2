import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { useEffect, useState } from "react";
import { EcctrlJoystick } from "ecctrl";
import Experience from "./Experience";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const EcctrlJoystickControls = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false);
  useEffect(() => {
    // Check if using a touch control device, show/hide joystick
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchScreen(true);
    } else {
      setIsTouchScreen(false);
    }
  }, []);
  return <>{isTouchScreen && <EcctrlJoystick buttonNumber={5} />}</>;
};

root.render(
  <>
    <Leva collapsed />
    <EcctrlJoystickControls />
    <Canvas
      shadows
      camera={{
        fov: 65,
        near: 0.1,
        far: 1000,
      }}
      onPointerDown={(e) => {
        // ok ... derp .... I have access to this in my code
        // ... so I need to store menu-open in a global store...
        // should anyway, with is-paused and other game state
        if (e.pointerType === "mouse") {
          (e.target as HTMLCanvasElement).requestPointerLock();
        }
      }}
    >
      <Experience />
    </Canvas>
  </>
);
