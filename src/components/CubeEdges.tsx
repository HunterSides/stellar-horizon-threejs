import React from "react";
import * as THREE from "three";

interface CubeEdgesProps {
  size: number;
}

const CubeEdges: React.FC<CubeEdgesProps> = ({ size }) => {
  return (
    <lineSegments>
      <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
      <lineBasicMaterial color="white" transparent opacity={0.2} />
    </lineSegments>
  );
};

export default CubeEdges;
