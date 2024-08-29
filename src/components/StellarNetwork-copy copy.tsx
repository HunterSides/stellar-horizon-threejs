import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Node from "./Node";
import Transaction from "./Transaction";
import useStellarData from "../hooks/useStellarData";
import { OrbitControls, Text } from "@react-three/drei";
import CubeEdges from "./CubeEdges";

const StellarNetwork: React.FC = () => {
  const { nodes, transactions } = useStellarData();
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);

  const cubeSize = 10;
  const nodePositions = useMemo(() => {
    return nodes.map(() => {
      const side = Math.floor(Math.random() * 6);
      let x, y, z;
      switch (side) {
        case 0:
          x = -cubeSize / 2;
          y = Math.random() * cubeSize - cubeSize / 2;
          z = Math.random() * cubeSize - cubeSize / 2;
          break;
        case 1:
          x = cubeSize / 2;
          y = Math.random() * cubeSize - cubeSize / 2;
          z = Math.random() * cubeSize - cubeSize / 2;
          break;
        case 2:
          x = Math.random() * cubeSize - cubeSize / 2;
          y = -cubeSize / 2;
          z = Math.random() * cubeSize - cubeSize / 2;
          break;
        case 3:
          x = Math.random() * cubeSize - cubeSize / 2;
          y = cubeSize / 2;
          z = Math.random() * cubeSize - cubeSize / 2;
          break;
        case 4:
          x = Math.random() * cubeSize - cubeSize / 2;
          y = Math.random() * cubeSize - cubeSize / 2;
          z = -cubeSize / 2;
          break;
        case 5:
          x = Math.random() * cubeSize - cubeSize / 2;
          y = Math.random() * cubeSize - cubeSize / 2;
          z = cubeSize / 2;
          break;
      }
      return new THREE.Vector3(x, y, z);
    });
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
        {nodes.map((node, index) => (
          <Node
            key={node.id}
            position={nodePositions[index]}
            node={node}
            onHover={setHoveredNode}
          />
        ))}
        {transactions.map((transaction, index) => (
          <Transaction
            key={transaction.id}
            startPosition={nodePositions[transaction.fromNodeIndex]}
            endPosition={nodePositions[transaction.toNodeIndex]}
          />
        ))}
        <CubeEdges size={cubeSize} />
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
