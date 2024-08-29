import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import Node from "./Node";
import Transaction from "./Transaction";
import useStellarData from "../hooks/useStellarData";

const StellarNetwork: React.FC = () => {
  const { nodes, transactions } = useStellarData();
  const groupRef = useRef<THREE.Group>(null);

  const nodePositions = useMemo(() => {
    return nodes.map(
      () =>
        new THREE.Vector3(
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          Math.random() * 10 - 5
        )
    );
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <Node key={node.id} position={nodePositions[index]} />
      ))}
      {transactions.map((transaction, index) => (
        <Transaction
          key={transaction.id}
          startPosition={nodePositions[transaction.fromNodeIndex]}
          endPosition={nodePositions[transaction.toNodeIndex]}
        />
      ))}
    </group>
  );
};

export default StellarNetwork;
