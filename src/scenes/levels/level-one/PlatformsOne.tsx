import React from "react";
import { DynamicPlatform } from "../../../components/modules/environment/DynamicPlatform";

interface PlatformsOneProps {
  // add your props here
}

const default_width = 4;
const default_leftAndRight = 0;

{
  /* left/right, height, forward-depth */
}

export const PlatformsOne = ({}: PlatformsOneProps) => {
  return (
    <>
      {/* V forward V */}
      <DynamicPlatform position={[default_leftAndRight, -0.3, 3]} />

      <DynamicPlatform
        position={[default_leftAndRight, 0.2, 6.9]}
        sideWidth={default_width}
      />

      <DynamicPlatform
        position={[default_leftAndRight, 1.3, 10]}
        sideWidth={default_width}
      />

      <DynamicPlatform
        position={[default_leftAndRight, 2, 14]}
        sideWidth={default_width}
      />
    </>
  );
};
