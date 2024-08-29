import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NetworkInteractionProps {
  startPosition: THREE.Vector3;
  endPosition: THREE.Vector3;
}

const NetworkInteraction: React.FC<NetworkInteractionProps> = ({
  startPosition,
  endPosition,
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useRef(0);
  const curve = useRef(
    new THREE.CatmullRomCurve3([
      startPosition,
      new THREE.Vector3()
        .lerpVectors(startPosition, endPosition, 0.5)
        .add(new THREE.Vector3(0, 0.5, 0)),
      endPosition,
    ])
  );

  useEffect(() => {
    progress.current = 0;
  }, [startPosition, endPosition]);

  useFrame(() => {
    if (ref.current) {
      progress.current += 0.02;
      if (progress.current > 1) progress.current = 0;

      const position = curve.current.getPoint(progress.current);
      ref.current.position.copy(position);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#00bfff" transparent opacity={0.8} />
      <pointLight color="#00bfff" intensity={0.5} distance={1} />
    </mesh>
  );
};

export default NetworkInteraction;
