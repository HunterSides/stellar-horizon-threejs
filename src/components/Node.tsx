import React from "react";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

interface NodeProps {
  position: THREE.Vector3;
  node: any;
  onHover: (node: any | null) => void;
}

const Node: React.FC<NodeProps> = ({ position, node, onHover }) => {
  return (
    <Sphere args={[0.2, 16, 16]} position={position}>
      <meshStandardMaterial color="lightblue" />
      <mesh
        onPointerOver={() => onHover(node)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </Sphere>
  );
};

export default Node;
