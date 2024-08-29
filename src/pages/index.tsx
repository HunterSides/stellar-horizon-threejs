import { Canvas } from "@react-three/fiber";
import StellarNetwork from "../components/StellarNetwork";
import InfoPanel from "../components/InfoPanel";
import useStellarData from "../hooks/useStellarData";

export default function Home() {
  const { nodes, transactions } = useStellarData();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <StellarNetwork />
        <InfoPanel
          nodeCount={nodes.length}
          transactionCount={transactions.length}
        />
      </Canvas>
    </div>
  );
}
