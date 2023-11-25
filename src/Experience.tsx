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
      {currnent_level === 1 ? (
        <LevelOne />
      ) : currnent_level === 2 ? (
        <LevelTwo />
      ) : null}
    </>
  );
}
