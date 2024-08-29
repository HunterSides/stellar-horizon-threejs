import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Text } from "@react-three/drei";
import GridCube from "./GridCube";
import ActiveNode from "./ActiveNode";
import NetworkInteraction from "./NetworkInteraction";
import useStellarData from "../hooks/useStellarData";
import CubeEdges from "./CubeEdges";
import Node from "./Node";
const StellarNetwork = () => {
  const { nodes, transactions } = useStellarData();
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);
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

  useFrame((state) => {
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
          <Node
            key={node.id}
            position={node.position}
            node={activeNodes[index]}
            onHover={setHoveredNode}
          />
        ))}
        {transactions.slice(0, 5).map((transaction) => (
          <NetworkInteraction
            key={transaction.id}
            startPosition={activeNodes[transaction.fromNodeIndex].position}
            endPosition={activeNodes[transaction.toNodeIndex].position}
          />
        ))}
      </group>
      {hoveredNode && (
        <Text
          position={[0, cubeSize / 2 + 1, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {`Node: ${hoveredNode.id.substr(0, 8)}...`}
        </Text>
      )}
    </>
  );
};

export default StellarNetwork;
