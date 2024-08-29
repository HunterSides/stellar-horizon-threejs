import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TransactionProps {
  startPosition: THREE.Vector3;
  endPosition: THREE.Vector3;
}

const Transaction: React.FC<TransactionProps> = ({
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
        .add(new THREE.Vector3(0, 2, 0)),
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
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="yellow" />
    </mesh>
  );
};

export default Transaction;
