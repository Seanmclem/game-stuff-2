import {
  useAnimations,
  useGLTF,
  useTexture,
  Trail,
  SpriteAnimator,
} from "@react-three/drei";
// import { useControls } from "leva";
import { Suspense, useEffect, useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { BallCollider, RapierCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { useGame } from "ecctrl";

export default function CharacterModel(props: CharacterModelProps) {
  // Change the character src to yours
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF("/BunnyMan.glb") as GLTF & {
    nodes: any;
    materials: any;
  };

  // Issue, this is a GLTF-to-JSX... I need to use that instead completely

  const test = useGLTF("/BunnyMan.glb") as GLTF & {
    nodes: any;
  };

  console.log({ test });

  const { actions } = useAnimations(animations, group);
  // gradientMapTexture for MeshToonMaterial
  const gradientMapTexture = useTexture("./textures/3.jpg");
  gradientMapTexture.minFilter = THREE.NearestFilter;
  gradientMapTexture.magFilter = THREE.NearestFilter;
  gradientMapTexture.generateMipmaps = false;

  /**
   * Prepare hands ref for attack action
   */
  const rightHandRef = useRef<THREE.Mesh>();
  const rightHandColliderRef = useRef<RapierCollider>();
  const leftHandRef = useRef<THREE.Mesh>();
  const leftHandColliderRef = useRef<RapierCollider>();
  const rightHandPos = useMemo(() => new THREE.Vector3(), []);
  const leftHandPos = useMemo(() => new THREE.Vector3(), []);
  const bodyPos = useMemo(() => new THREE.Vector3(), []);
  let rightHand: THREE.Object3D = null;
  let leftHand: THREE.Object3D = null;
  let mugModel: THREE.Object3D = null;

  /**
   * Prepare punch effect sprite
   */
  // const [punchEffectProps, setPunchEffectProp] = useState({
  //   visible: false,
  //   scale: [1, 1, 1],
  //   play: false,
  //   position: [-0.2, -0.2, 0.5],
  //   startFrame: 0,
  // });

  // /**
  //  * Debug settings
  //  */
  // const { mainColor, outlineColor, trailColor } = useControls(
  //   "Character Model",
  //   {
  //     mainColor: "mediumslateblue",
  //     outlineColor: "black",
  //     trailColor: "violet",
  //   }
  // );

  /**
   * Prepare replacing materials
   */
  // const outlineMaterial = useMemo(
  //   () =>
  //     new THREE.MeshBasicMaterial({
  //       color: outlineColor,
  //       transparent: true,
  //     }),
  //   [outlineColor]
  // );
  // const meshToonMaterial = useMemo(
  //   () =>
  //     new THREE.MeshToonMaterial({
  //       color: mainColor,
  //       gradientMap: gradientMapTexture,
  //       transparent: true,
  //     }),
  //   [mainColor]
  // );

  /**
   * Character animations setup
   */
  const curAnimation = useGame((state) => state.curAnimation);
  const resetAnimation = useGame((state) => state.reset);
  const initializeAnimationSet = useGame(
    (state) => state.initializeAnimationSet
  );

  // Rename your character animations here
  const animationSet = {
    idle: "Idle",
    walk: "Walk",
    run: "Run",
    jump: "Jump",
    jumpIdle: "Jump_Idle",
    jumpLand: "Jump_Land",
    fall: "Jump", // This is for falling from high sky ... formerly "Climbing"
    action1: "Wave",
    action2: "HitReact",
    action3: "Death",
    action4: "", // formerly "Attack(1h)"
  };

  useEffect(() => {
    // Initialize animation set
    initializeAnimationSet(animationSet);
  }, []);

  useEffect(() => {
    group.current.traverse((obj) => {
      // Prepare both hands bone object
      if (obj instanceof THREE.Bone) {
        if (obj.name === "handSlotRight") rightHand = obj;
        if (obj.name === "handSlotLeft") leftHand = obj;
      }
      // Prepare mug model for cheer action
      if (obj.name === "mug") {
        mugModel = obj;
        // mugModel.visible = false;
      }
    });
  });

  useFrame(() => {
    if (rightHand && leftHand) {
      rightHand.getWorldPosition(rightHandPos);
      leftHand.getWorldPosition(leftHandPos);
      rightHandRef.current.parent.getWorldPosition(bodyPos);
    }

    // Apply both hands position to hand colliders
    if (rightHandColliderRef.current && leftHandColliderRef.current) {
      rightHandRef.current.position.copy(rightHandPos).sub(bodyPos);
      rightHandColliderRef.current.setTranslationWrtParent(
        rightHandRef.current.position
      );

      leftHandRef.current.position.copy(leftHandPos).sub(bodyPos);
      leftHandColliderRef.current.setTranslationWrtParent(
        leftHandRef.current.position
      );
    }
  });

  useEffect(() => {
    // Play animation
    const action = actions[curAnimation ? curAnimation : animationSet.jumpIdle];

    if (!action) {
      console.log({ curAnimation, actions });
    }

    // For jump and jump land animation, only play once and clamp when finish
    if (
      curAnimation === animationSet.jump ||
      curAnimation === animationSet.jumpLand ||
      curAnimation === animationSet.action1 ||
      curAnimation === animationSet.action2 ||
      curAnimation === animationSet.action3 ||
      curAnimation === animationSet.action4
    ) {
      action
        .reset()
        .fadeIn(0.2)
        .setLoop(THREE.LoopOnce, undefined as number)
        .play();
      action.clampWhenFinished = true;
      // Only show mug during cheer action
      // if (curAnimation === animationSet.action3) {
      //   mugModel.visible = true;
      // } else {
      //   mugModel.visible = false;
      // }
    } else {
      action.reset().fadeIn(0.2).play();
      // mugModel.visible = false;
    }

    // When any action is clamp and finished reset animation
    (action as any)._mixer.addEventListener("finished", () => resetAnimation());

    return () => {
      // Fade out previous action
      action.fadeOut(0.2);

      // Clean up mixer listener, and empty the _listeners array
      (action as any)._mixer.removeEventListener("finished", () =>
        resetAnimation()
      );
      (action as any)._mixer._listeners = [];
    };
  }, [curAnimation]);

  return (
    <Suspense fallback={<capsuleGeometry args={[0.3, 0.7]} />}>
      {/* Default capsule modle */}
      {/* <mesh castShadow>
        <capsuleGeometry args={[0.3, 0.7]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh castShadow position={[0, 0.2, 0.2]}>
        <boxGeometry args={[0.5, 0.2, 0.3]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh> */}

      {/* Replace yours model here */}
      {/* Head collider */}
      <BallCollider
        name="characters-head-ball"
        args={[0.5]}
        position={[0, 0.45, 0]}
      />
      {/* Right hand collider */}
      <mesh ref={rightHandRef} />
      <BallCollider
        args={[0.1]}
        ref={rightHandColliderRef}
        onCollisionEnter={(e) => {
          if (curAnimation === animationSet.action4) {
            // Play punch effect
            setPunchEffectProp((prev) => ({
              ...prev,
              visible: true,
              play: true,
            }));
          }
        }}
      />

      {/* Left hand collider */}
      <mesh ref={leftHandRef} />
      <BallCollider args={[0.1]} ref={leftHandColliderRef} />
      {/* Character model */}

      <group ref={group} {...props} dispose={null}>
        <group name="Scene" scale={0.7} position={[0, -0.93, 0]}>
          <group name="CharacterArmature">
            <group name="Arms">
              <skinnedMesh
                name="CUBezierCurve000"
                geometry={nodes.CUBezierCurve000.geometry}
                material={materials.Main}
                skeleton={nodes.CUBezierCurve000.skeleton}
              />
              <skinnedMesh
                name="CUBezierCurve000_1"
                geometry={nodes.CUBezierCurve000_1.geometry}
                material={materials.Main_Light}
                skeleton={nodes.CUBezierCurve000_1.skeleton}
              />
            </group>
            <group name="Body_1">
              <skinnedMesh
                name="CUBezierCurve002"
                geometry={nodes.CUBezierCurve002.geometry}
                material={materials.Main}
                skeleton={nodes.CUBezierCurve002.skeleton}
                receiveShadow
                castShadow
              />
              <skinnedMesh
                name="CUBezierCurve002_1"
                geometry={nodes.CUBezierCurve002_1.geometry}
                material={materials.Main_Light}
                skeleton={nodes.CUBezierCurve002_1.skeleton}
                receiveShadow
                castShadow
              />
              <skinnedMesh
                name="CUBezierCurve002_2"
                geometry={nodes.CUBezierCurve002_2.geometry}
                material={materials.Main2}
                skeleton={nodes.CUBezierCurve002_2.skeleton}
                receiveShadow
                castShadow
              />
            </group>
            <skinnedMesh
              name="Ears"
              geometry={nodes.Ears.geometry}
              material={materials.Main}
              skeleton={nodes.Ears.skeleton}
            />
            <group name="Head_1">
              <skinnedMesh
                name="CUBezierCurve003"
                geometry={nodes.CUBezierCurve003.geometry}
                material={materials.Main}
                skeleton={nodes.CUBezierCurve003.skeleton}
              />
              <skinnedMesh
                name="CUBezierCurve003_1"
                geometry={nodes.CUBezierCurve003_1.geometry}
                material={materials.Black}
                skeleton={nodes.CUBezierCurve003_1.skeleton}
              />
              <skinnedMesh
                name="CUBezierCurve003_2"
                geometry={nodes.CUBezierCurve003_2.geometry}
                material={materials.Main_Light}
                skeleton={nodes.CUBezierCurve003_2.skeleton}
              />
              <skinnedMesh
                name="CUBezierCurve003_3"
                geometry={nodes.CUBezierCurve003_3.geometry}
                material={materials.White}
                skeleton={nodes.CUBezierCurve003_3.skeleton}
              />
              <skinnedMesh
                name="CUBezierCurve003_4"
                geometry={nodes.CUBezierCurve003_4.geometry}
                material={materials.EyeColor}
                skeleton={nodes.CUBezierCurve003_4.skeleton}
              />
            </group>
            <primitive object={nodes.Root} />
          </group>
        </group>
      </group>
    </Suspense>
  );
}

export type CharacterModelProps = JSX.IntrinsicElements["group"];

// Change the character src to yours
useGLTF.preload("/Floating Character.glb");
