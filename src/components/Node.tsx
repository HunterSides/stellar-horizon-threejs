import React from "react";
import { Vector3 } from "three";

interface ActiveNodeProps {
  position: Vector3;
  node: any;
  onHover: (node: any | null) => void;

  isInQuorum: boolean;
}

const Node: React.FC<ActiveNodeProps> = ({
  position,
  node,
  onHover,
  isInQuorum,
}) => {
  const color = isInQuorum ? "#00bfff" : "#1a5fb4";
  const intensity = isInQuorum ? 0.8 : 0.3;

  return (
    <mesh
      position={position}
      onPointerOver={() => onHover(node)}
      onPointerOut={() => onHover(null)}
    >
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshBasicMaterial color={color} />
      <pointLight color={color} intensity={intensity} distance={2} />
    </mesh>
  );
};

export default Node;
