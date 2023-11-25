import { Grid } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { LevelOne } from "./scenes/levels/LevelOne";
import { useLevelStore } from "./stores/useLevelStore";
import { LevelTwo } from "./scenes/levels/LevelTwo";
// import { useKeyPresses } from "./hooks/useKeyPresses";

export default function Experience() {
  const currnent_level = useLevelStore((state) => state.current_level);
  // const set_current_level = useLevelStore((state) => state.set_current_level);

  // useKeyPresses();

  return (
    <>
      <Perf position="top-left" />

      <Grid
        args={[300, 300]}
        sectionColor={"lightgray"}
        cellColor={"gray"}
        position={[0, -0.99, 0]}
      />

      {currnent_level === 1 ? (
        <LevelOne />
      ) : currnent_level === 2 ? (
        <LevelTwo />
      ) : null}
    </>
  );
}
