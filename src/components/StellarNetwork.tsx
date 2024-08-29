import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import GridCube from "./GridCube";
import ActiveNode from "./ActiveNode";
import NetworkInteraction from "./NetworkInteraction";
import useStellarData from "../hooks/useStellarData";

const StellarNetwork: React.FC = () => {
  const { nodes, transactions } = useStellarData();
  const groupRef = useRef<THREE.Group>(null);

  const gridSize = 10; // 10x10x10 grid
  const cubeSize = 10;

  const activeNodes = useMemo(() => {
    return nodes.map((node) => ({
      position: new THREE.Vector3(
        Math.floor(Math.random() * gridSize) - gridSize / 2,
        Math.floor(Math.random() * gridSize) - gridSize / 2,
        Math.floor(Math.random() * gridSize) - gridSize / 2
      ),
      id: node.id,
    }));
  }, [nodes]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <group ref={groupRef}>
        <GridCube size={cubeSize} gridSize={gridSize} />
        {activeNodes.map((node, index) => (
          <ActiveNode key={node.id} position={node.position} />
        ))}
        {transactions.slice(0, 5).map((transaction, index) => (
          <NetworkInteraction
            key={transaction.id}
            startPosition={activeNodes[transaction.fromNodeIndex].position}
            endPosition={activeNodes[transaction.toNodeIndex].position}
          />
        ))}
      </group>
    </>
  );
};

export default StellarNetwork;
