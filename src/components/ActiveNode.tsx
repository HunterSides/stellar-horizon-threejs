import React from "react";
import { Vector3 } from "three";

interface ActiveNodeProps {
  position: Vector3;
}

const ActiveNode: React.FC<ActiveNodeProps> = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshBasicMaterial color="#00bfff" />
      <pointLight color="#00bfff" intensity={0.5} distance={2} />
    </mesh>
  );
};

export default ActiveNode;
