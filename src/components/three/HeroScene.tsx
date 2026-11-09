"use client";

import { useMemo, useRef, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Brand colors ─────────────────────────────────── */
const DEEP = "#21108F";
const ROYAL = "#3156C8";
const RED = "#E52436";
const ORANGE = "#FF8A24";
const GOLD = "#D4AF37";

/* ── Metallic core ────────────────────────────────── */
function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.16;
    mesh.current.rotation.y += delta * 0.22;
    const t = state.clock.elapsedTime;
    mesh.current.position.y = Math.sin(t * 0.8) * 0.12;
  });
  return (
    <mesh ref={mesh} castShadow>
      <torusKnotGeometry args={[0.85, 0.28, 160, 24]} />
      <meshStandardMaterial
        color={ROYAL}
        metalness={0.85}
        roughness={0.22}
        emissive={DEEP}
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

/* ── Orbital rings ────────────────────────────────── */
function OrbitRing({
  radius,
  tilt,
  speed,
  color,
  thickness = 0.014,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  thickness?: number;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += delta * speed;
  });
  return (
    <group ref={group} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, thickness, 12, 128]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.55}
        />
      </mesh>
      {/* satellite bead */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

/* ── Floating companion shapes ────────────────────── */
function Floater({
  position,
  kind,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  kind: "icosa" | "octa" | "box" | "sphere";
  color: string;
  scale?: number;
  speed?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x += delta * 0.5 * speed;
    mesh.current.rotation.y += delta * 0.65 * speed;
    mesh.current.position.y = position[1] + Math.sin(t * speed + seed) * 0.22;
  });
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {kind === "icosa" && <icosahedronGeometry args={[0.3, 0]} />}
      {kind === "octa" && <octahedronGeometry args={[0.3, 0]} />}
      {kind === "box" && <boxGeometry args={[0.42, 0.42, 0.42]} />}
      {kind === "sphere" && <sphereGeometry args={[0.26, 20, 20]} />}
      <meshStandardMaterial
        color={color}
        metalness={0.75}
        roughness={0.28}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

/* ── Glowing particle field ───────────────────────── */
function Particles({ count = 260 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color(ROYAL), new THREE.Color(RED), new THREE.Color(GOLD), new THREE.Color("#FFFFFF")];
    for (let i = 0; i < count; i++) {
      // shell distribution
      const r = 2.6 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.045;
      points.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Pointer-parallax rig ─────────────────────────── */
function ParallaxRig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.28 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-y * 0.18 - group.current.rotation.x) * 0.05;
    // gentle positional drift toward the pointer (camera untouched)
    group.current.position.x += (x * 0.35 - group.current.position.x) * 0.04;
    group.current.position.y += (-y * 0.2 - group.current.position.y) * 0.04;
  });
  return <group ref={group}>{children}</group>;
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 4, 5]} intensity={26} color={ROYAL} />
      <pointLight position={[-5, -2, 4]} intensity={20} color={RED} />
      <pointLight position={[0, 5, -4]} intensity={14} color={ORANGE} />
      <spotLight position={[0, 6, 6]} intensity={40} angle={0.5} penumbra={1} color="#FFFFFF" />

      <ParallaxRig>
        <Core />
        <OrbitRing radius={1.7} tilt={[Math.PI / 2.4, 0.35, 0]} speed={0.35} color={ROYAL} />
        <OrbitRing radius={2.25} tilt={[Math.PI / 1.9, -0.5, 0.4]} speed={-0.22} color={RED} thickness={0.01} />
        <OrbitRing radius={2.9} tilt={[Math.PI / 2.9, 0.9, -0.3]} speed={0.14} color={GOLD} thickness={0.008} />

        <Floater position={[-2.6, 1.1, -0.6]} kind="icosa" color={ORANGE} scale={0.9} speed={0.9} />
        <Floater position={[2.7, 0.7, -0.8]} kind="octa" color={RED} scale={0.8} speed={1.1} />
        <Floater position={[2.2, -1.5, 0.4]} kind="box" color={ROYAL} scale={0.7} speed={0.8} />
        <Floater position={[-2.3, -1.3, 0.6]} kind="sphere" color={GOLD} scale={0.75} speed={1.25} />
        <Floater position={[0.4, 2.2, -1.6]} kind="octa" color="#FFFFFF" scale={0.5} speed={1.4} />

        <Particles />
      </ParallaxRig>
    </>
  );
}

/* ── WebGL error boundary fallback ────────────────── */
class GLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/* CSS-only fallback (also used for prefers-reduced-motion) */
export function HeroSceneFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden="true">
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="blob left-[15%] top-[20%] h-48 w-48 bg-brand-royal/60" />
      <div className="blob right-[10%] bottom-[15%] h-44 w-44 bg-brand-red/40" />
      <div className="relative h-56 w-56">
        <div className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border border-white/20">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold" />
        </div>
        <div className="absolute inset-6 rotate-45 animate-[spin_24s_linear_infinite_reverse] rounded-full border border-brand-orange/40" />
        <div className="absolute inset-12 rounded-3xl bg-gradient-to-br from-brand-royal via-brand-deep to-brand-red shadow-[0_30px_80px_-20px_rgba(49,86,200,0.8)]" />
      </div>
    </div>
  );
}

/* ── Exported canvas ──────────────────────────────── */
export default function HeroScene() {
  return (
    <GLBoundary fallback={<HeroSceneFallback />}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.2, 7], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        aria-hidden="true"
      >
        <SceneContents />
      </Canvas>
    </GLBoundary>
  );
}
