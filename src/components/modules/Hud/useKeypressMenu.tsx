import { useEffect } from "react";

export const useKeypressMenu = ({
  keyPressed,
  action,
}: {
  keyPressed: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (event: KeyboardEvent, ...args: any[]) => any;
}) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === keyPressed) {
        if (action) {
          action(event);
        } else {
          console.log("DEFAULT: " + keyPressed + " key pressed");
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
};
