import React from "react";
import * as THREE from "three";

interface GridCubeProps {
  size: number;
  gridSize: number;
}

const GridCube: React.FC<GridCubeProps> = ({ size, gridSize }) => {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const edges = new THREE.EdgesGeometry(geometry);

  return (
    <>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#1a5fb4" opacity={0.2} transparent />
      </lineSegments>
      {Array.from({ length: gridSize }).map((_, x) =>
        Array.from({ length: gridSize }).map((_, y) =>
          Array.from({ length: gridSize }).map((_, z) => (
            <mesh
              key={`${x}-${y}-${z}`}
              position={[
                (x / (gridSize - 1) - 0.5) * size,
                (y / (gridSize - 1) - 0.5) * size,
                (z / (gridSize - 1) - 0.5) * size,
              ]}
            >
              <boxGeometry
                args={[size / gridSize, size / gridSize, size / gridSize]}
              />
              <meshBasicMaterial color="#1a5fb4" opacity={0.05} transparent />
            </mesh>
          ))
        )
      )}
    </>
  );
};

export default GridCube;
