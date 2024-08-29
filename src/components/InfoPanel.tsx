import React from "react";
import { Html } from "@react-three/drei";

interface InfoPanelProps {
  nodeCount: number;
  transactionCount: number;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  nodeCount,
  transactionCount,
}) => {
  return (
    <Html position={[-5, 5, 0]}>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "10px",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <h3>Stellar Network Visualization</h3>
        <p>Nodes: {nodeCount}</p>
        <p>Transactions: {transactionCount}</p>
        <p>Blue spheres: Nodes</p>
        <p>Yellow particles: Transactions</p>
      </div>
    </Html>
  );
};

export default InfoPanel;
