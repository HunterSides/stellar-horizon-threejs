import React from "react";
import { Vector3 } from "three";

interface ActiveNodeProps {
  position: Vector3;
  node: any;
  onHover: (node: any | null) => void;
}

const ActiveNode: React.FC<ActiveNodeProps> = ({ position, node, onHover }) => {
  return (
    <mesh
      position={position}
      onPointerOver={() => onHover(node)}
      onPointerOut={() => onHover(null)}
    >
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshBasicMaterial color="#00bfff" />
      <pointLight color="#00bfff" intensity={0.5} distance={2} />
    </mesh>
  );
};

export default ActiveNode;
