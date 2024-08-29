import { Canvas } from "@react-three/fiber";
import StellarNetwork from "../components/StellarNetwork";
import InfoPanel from "../components/InfoPanel";
import useStellarData from "../hooks/useStellarData";
import { Stars } from "@react-three/drei";

export default function Home() {
  const { nodes, transactions } = useStellarData();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <StellarNetwork />
        <InfoPanel
          nodeCount={nodes.length}
          transactionCount={transactions.length}
        />
      </Canvas>
    </div>
  );
}
