import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import "./App.css";

// Replace import of binary asset with Vite-compatible URL
const modelUrl = new URL("../model.glb", import.meta.url).href;

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function App() {
  useEffect(() => {
    // preload the model for smoother experience
    useGLTF.preload(modelUrl);
  }, []);

  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [2, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 1, 10]} intensity={1} />

        <Suspense fallback={<Html center>Loading model...</Html>}>
          <Model url={modelUrl} />
        </Suspense>

        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
}
