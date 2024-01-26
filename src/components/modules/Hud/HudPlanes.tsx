import { Hud, OrthographicCamera, Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useState } from "react";

import { Vector3 } from "three";

export const HudPlanes = ({ renderPriority = 1 }) => {
  const { size } = useThree();
  const [hovered, hover] = useState(null);

  const position_offset = 60;

  const positions = {
    top_right: [
      size.width / 2 - position_offset,
      size.height / 2 - position_offset,
      0,
    ] as unknown as Vector3,
    top_left: [
      -size.width / 2 + position_offset,
      size.height / 2 - position_offset,
      0,
    ] as unknown as Vector3,
    top_middle: [0, size.height / 2 - position_offset, 0] as unknown as Vector3,
    middle_right: [
      size.width / 2 - position_offset,
      0,
      0,
    ] as unknown as Vector3,
    middle_left: [
      -size.width / 2 + position_offset,
      0,
      0,
    ] as unknown as Vector3,
    bottom_right: [
      size.width / 2 - position_offset,
      -size.height / 2 + position_offset,
      0,
    ] as unknown as Vector3,
    bottom_left: [
      -size.width / 2 + position_offset,
      -size.height / 2 + position_offset,
      0,
    ] as unknown as Vector3,
    bottom_middle: [
      0,
      -size.height / 2 + position_offset,
      0,
    ] as unknown as Vector3,
    middle_middle: [0, 0, 0] as unknown as Vector3,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const simple_box_size = [80, 80] as unknown as any;

  return (
    <Hud renderPriority={renderPriority}>
      <OrthographicCamera makeDefault position={[0, 0, 100]} />

      {/* a plane for each position property */}
      <Plane
        position={positions.top_right}
        args={simple_box_size} // Size of the plane
        onPointerOut={() => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}
        onPointerDown={(e) => {
          e.stopPropagation();
          console.log("clicked");
        }}
      >
        <meshLambertMaterial color={hovered ? "orange" : "hotpink"} />
      </Plane>

      <Plane
        position={positions.top_left}
        args={simple_box_size} // Size of the plane
        onPointerOut={() => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}
      >
        <meshLambertMaterial color={hovered ? "orange" : "hotpink"} />
      </Plane>

      <Plane
        position={positions.top_middle}
        args={simple_box_size} // Size of the plane
        onPointerOut={() => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}
      >
        <meshLambertMaterial color={hovered ? "orange" : "hotpink"} />
      </Plane>

      <Plane
        position={positions.middle_right}
        args={simple_box_size} // Size of the plane
        onPointerOut={() => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}
      >
        <meshLambertMaterial color={hovered ? "orange" : "hotpink"} />
      </Plane>

      <Plane
        position={positions.middle_left}
        args={simple_box_size} // Size of the plane
        onPointerOut={() => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}
      >
        <meshLambertMaterial color={hovered ? "orange" : "hotpink"} />
      </Plane>

      <Plane
        position={positions.bottom_right}
        args={simple_box_size} // Size of the plane
        onPointerOut={() => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}
      >
        <meshLambertMaterial color={hovered ? "orange" : "hotpink"} />
      </Plane>

      <Plane
        position={positions.bottom_left}
        args={simple_box_size} // Size of the plane
        onPointerOut={() => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}
      >
        <meshLambertMaterial color={hovered ? "orange" : "hotpink"} />
      </Plane>

      <Plane
        position={positions.bottom_middle}
        args={simple_box_size} // Size of the plane
        onPointerOut={() => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}
      >
        <meshLambertMaterial color={hovered ? "orange" : "hotpink"} />
      </Plane>

      <Plane
        position={positions.middle_middle}
        args={simple_box_size} // Size of the plane
        onPointerOut={() => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}
      >
        <meshLambertMaterial color={hovered ? "orange" : "hotpink"} />
      </Plane>

      {/* middle modal plane */}
      {/* <Plane
        position={positions.middle_middle}
        args={[size.width - 80, size.height - 80]} // Size of the plane
        onPointerOut={() => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}
      >
        <meshLambertMaterial color={hovered ? "orange" : "hotpink"} />
      </Plane> */}

      <ambientLight intensity={1} />
      <pointLight position={[200, 200, 100]} intensity={0.5} />
    </Hud>
  );
};
