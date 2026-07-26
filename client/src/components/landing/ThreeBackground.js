import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const FloatingNodes = () => {
  const ref = useRef();
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 18;
      ref.current.rotation.y -= delta / 24;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={["attributes", "position"]}
            count={sphere.length / 3}
            array={sphere}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          transparent
          color="#818CF8"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
        />
      </points>
    </group>
  );
};

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-[#F7F8FC] dark:bg-[#0F172A] transition-colors duration-500">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FloatingNodes />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F7F8FC]/60 to-[#F7F8FC] dark:via-[#0F172A]/60 dark:to-[#0F172A] pointer-events-none" />
    </div>
  );
};

export default ThreeBackground;
