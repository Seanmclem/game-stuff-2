import { useGLTF } from "@react-three/drei";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CharacterModel(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes, materials } = useGLTF(
    "./ghost_w_tophat.glb"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as unknown as any;
  return (
    <group {...props} dispose={null}>
      <group scale={0.0034} position={[0, -0.55, 0]}>
        <group
          position={[0, 155.777, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Eyes_Eyes_0.geometry}
            material={materials.Eyes}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Eyes_Ghost_White_0.geometry}
            material={materials.Ghost_White}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_Ghost_White_0.geometry}
          material={materials.Ghost_White}
          position={[0, 155.777, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hat_Hat_Black_0.geometry}
          material={materials.Hat_Black}
          position={[0, 299.13, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rim_Rim_Red_0.geometry}
          material={materials.Rim_Red}
          position={[0, 235.411, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./ghost_w_tophat.glb");
