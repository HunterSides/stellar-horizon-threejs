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
          color: "#00bfff",
          fontFamily: "Arial",
          borderRadius: "5px",
          border: "1px solid #00bfff",
        }}
      >
        <h3>Stellar Network Visualization</h3>
        <p>Total Nodes: {nodeCount}</p>
        <p>Recent Transactions: {transactionCount}</p>
        <p>Bright Blue: Active nodes in quorum</p>
        <p>Dark Blue: Inactive nodes</p>
        <p>Yellow Particles: Network interactions</p>
      </div>
    </Html>
  );
};

export default InfoPanel;
