import { motion } from 'framer-motion'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three'

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = lng * (Math.PI / 180)
    return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    )
}

function Globe() {
    const globeRef = useRef<THREE.Group>(null)
    const earthTexture = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg')

    useFrame((_, delta) => {
        if (globeRef.current) globeRef.current.rotation.y += delta * 0.12
    })
    // india coordinates : Andhra Pradesh
    const indiaPos = useMemo(() => latLngToVec3(16.2997, 80.4573 - 90, 2.12), [])
    // United states coordinates : New York(40.7128, -74.0060)
    const usPos = useMemo(() => latLngToVec3(40.7128, -74.0060, 2.12), [])

    return (
        <group ref={globeRef}>
            <Sphere args={[2, 64, 64]}>
                <meshStandardMaterial map={earthTexture} />
            </Sphere>

            {/* Andhra Pradesh - gold glowing dot */}
            <mesh position={indiaPos}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={6} />
            </mesh>
            <mesh position={indiaPos}>
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshStandardMaterial color="#c9a84c" transparent opacity={0.35} emissive="#c9a84c" emissiveIntensity={3} />
            </mesh>
            <mesh position={indiaPos}>
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshStandardMaterial color="#c9a84c" transparent opacity={0.1} emissive="#c9a84c" emissiveIntensity={2} />
            </mesh>

            {/* New York - blue glowing dot */}
            <mesh position={usPos}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={6} />
            </mesh>
            <mesh position={usPos}>
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshStandardMaterial color="#60a5fa" transparent opacity={0.35} emissive="#60a5fa" emissiveIntensity={3} />
            </mesh>
            <mesh position={usPos}>
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshStandardMaterial color="#60a5fa" transparent opacity={0.1} emissive="#60a5fa" emissiveIntensity={2} />
            </mesh>
        </group>
    )
}

interface AirplaneProps {
    position: THREE.Vector3
    quaternion: THREE.Quaternion
}

function Airplane({ position, quaternion }: AirplaneProps) {
    return (
        <group position={position} quaternion={quaternion}>
            {/* Fuselage body */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.016, 0.010, 0.28, 12]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Nose cone */}
            <mesh position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.016, 0.08, 12]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Left wing swept back */}
            <mesh position={[-0.13, 0, 0.02]} rotation={[0.05, 0.25, 0.1]}>
                <boxGeometry args={[0.22, 0.006, 0.08]} />
                <meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={2} metalness={0.7} roughness={0.2} />
            </mesh>
            {/* Right wing swept back */}
            <mesh position={[0.13, 0, 0.02]} rotation={[0.05, -0.25, -0.1]}>
                <boxGeometry args={[0.22, 0.006, 0.08]} />
                <meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={2} metalness={0.7} roughness={0.2} />
            </mesh>
            {/* Vertical tail fin */}
            <mesh position={[0, 0.04, -0.1]}>
                <boxGeometry args={[0.005, 0.07, 0.06]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Horizontal tail fins */}
            <mesh position={[0, 0, -0.11]}>
                <boxGeometry args={[0.10, 0.005, 0.04]} />
                <meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={2} metalness={0.7} roughness={0.2} />
            </mesh>
            {/* Engine glow */}
            <mesh position={[0, 0, 0.05]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial color="#c9a84c" transparent opacity={0.2} emissive="#c9a84c" emissiveIntensity={4} />
            </mesh>
        </group>
    )
}

function FlightPath() {
    const progress = useRef(0)
    const done = useRef(false)

    // Start: Andhra Pradesh (15.9129, 79.7400) -> End: New York (40.7128, -74.0060)
    const arcPoints = useMemo(() => {
        const pts: THREE.Vector3[] = []
        const startLat = 16.2997, startLng = 80.4573 - 90
        const endLat = 40.7128, endLng = -74.0060

        for (let t = 0; t <= 1; t += 0.005) {
            const lat = startLat + (endLat - startLat) * t
            const lng = startLng + (endLng - startLng) * t
            const r = 2.15 + Math.sin(t * Math.PI) * 0.65
            pts.push(latLngToVec3(lat, lng, r))
        }
        return pts
    }, [])

    const [planeState, setPlaneState] = useState<{ pos: THREE.Vector3, quat: THREE.Quaternion }>({
        pos: arcPoints[0].clone(),
        quat: new THREE.Quaternion()
    })

    useFrame((_, delta) => {
        if (done.current) return
        progress.current = Math.min(progress.current + delta * 0.06, 1)
        if (progress.current >= 1) { done.current = true; return }

        const idx = Math.floor(progress.current * (arcPoints.length - 1))
        const nextIdx = Math.min(idx + 1, arcPoints.length - 1)
        const pos = arcPoints[idx]
        const next = arcPoints[nextIdx]

        const dir = new THREE.Vector3().subVectors(next, pos).normalize()
        const up = pos.clone().normalize()
        const right = new THREE.Vector3().crossVectors(dir, up).normalize()
        const fwd = new THREE.Vector3().crossVectors(up, right).normalize().negate()
        const m = new THREE.Matrix4().makeBasis(right, up, fwd)
        const q = new THREE.Quaternion().setFromRotationMatrix(m)

        setPlaneState({ pos: pos.clone(), quat: q })
    })

    const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(arcPoints), [arcPoints])

    return (
        <group>
            <primitive object={new THREE.Line(
                lineGeometry,
                new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.55 })
            )} />
            <Airplane position={planeState.pos} quaternion={planeState.quat} />
        </group>
    )
}

function GlobeScene() {
    return (
        <>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
            <directionalLight position={[-5, 3, 2]} intensity={0.8} color="#c9d4ff" />
            <Globe />
            <FlightPath />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} enablePan={false} />
        </>
    )
}

const badges = [
    { label: 'Amazonian Alumni', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    { label: 'Software Engineer', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
    { label: 'Cloud Architect', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    { label: 'Published Author', color: '#c9a84c', bg: 'rgba(201,168,76,0.1)' },
    { label: 'Village to Wall Street', color: '#f472b6', bg: 'rgba(244,114,182,0.1)' },
]

export default function Home({ setActive }: { setActive: (s: string) => void }) {
    return (
        <div style={{ minHeight: '100vh', paddingTop: 64, display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }}>
                <div>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                style={{ color: '#c9a84c', fontSize: '0.75rem', letterSpacing: 5, textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700, fontFamily: 'Inter, sans-serif', textShadow: '0 0 15px rgba(201,168,76,0.4)' }}>
                        Software Engineer
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                               style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem,6vw,5.2rem)', fontWeight: 900, lineHeight: 1.0, marginBottom: '1.2rem', color: '#ffffff', letterSpacing: -2, textShadow: '0 2px 40px rgba(201,168,76,0.2), 0 0 80px rgba(201,168,76,0.08)' }}>
                        Siva<br />Yendluri
                    </motion.h1>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                                style={{ display: 'flex', gap: '12px', marginBottom: '2rem', alignItems: 'center' }}>
                        <a href="https://github.com/sivayendluri17/siva-portfolio" target="_blank" rel="noopener noreferrer"
                           style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                           onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.boxShadow = '0 0 25px rgba(201,168,76,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                           onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/siva-yendluri/" target="_blank" rel="noopener noreferrer"
                           style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                           onMouseEnter={e => { e.currentTarget.style.background = 'rgba(96,165,250,0.15)'; e.currentTarget.style.borderColor = '#60a5fa'; e.currentTarget.style.boxShadow = '0 0 25px rgba(96,165,250,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                           onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '4px' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c9a84c', boxShadow: '0 0 12px #c9a84c, 0 0 6px #c9a84c' }}></div>
                            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif', letterSpacing: 1 }}>Andhra Pradesh</span>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 12px #60a5fa, 0 0 6px #60a5fa', marginLeft: '8px' }}></div>
                            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif', letterSpacing: 1 }}>New York</span>
                        </div>
                    </motion.div>

                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                              style={{
                                  fontSize: '1.08rem',
                                  lineHeight: 2,
                                  marginBottom: '1.8rem',
                                  maxWidth: 480,
                                  fontFamily: 'Inter, sans-serif',
                                  fontWeight: 300,
                                  letterSpacing: 0.3,
                                  borderLeft: '2px solid rgba(201,168,76,0.4)',
                                  paddingLeft: '1.2rem',
                                  background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(201,168,76,0.7) 50%, rgba(255,255,255,0.8) 100%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                              }}>
                        I grew up in a small village in India with no laptop and no wifi. But I had one thing, the hunger to build something bigger. I packed one bag, bought a ticket to the US, and started from zero. Today I build software that millions of people use every day.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                                style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
                        {badges.map(b => (
                            <span key={b.label} style={{
                                background: b.bg,
                                border: `1px solid ${b.color}40`,
                                color: b.color,
                                padding: '0.4rem 1rem',
                                borderRadius: 20,
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                letterSpacing: 0.4,
                                fontFamily: 'Inter, sans-serif',
                                boxShadow: `0 0 14px ${b.color}18, inset 0 1px 0 ${b.color}20`,
                                backdropFilter: 'blur(4px)',
                                cursor: 'default'
                            }}>
                {b.label}
              </span>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                        <button onClick={() => setActive('Projects')}
                                style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%)', color: '#0a1628', padding: '0.85rem 2.4rem', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 4px 25px rgba(201,168,76,0.4)', transition: 'all 0.3s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 35px rgba(201,168,76,0.6)' }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 25px rgba(201,168,76,0.4)' }}>
                            View My Work
                        </button>
                        <button onClick={() => setActive('About')}
                                style={{ background: 'rgba(255,255,255,0.03)', color: '#c9a84c', padding: '0.85rem 2.4rem', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 8, fontWeight: 500, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', letterSpacing: 1, textTransform: 'uppercase', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(201,168,76,0.2)' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)' }}>
                            My Story
                        </button>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', width: 'fit-content' }}>
                        {[['4+', 'Years Experience'], ['15+', 'Projects Delivered'], ['2x', 'AWS Certified'], ['3', 'Companies']].map(([num, lbl]) => (
                            <div key={lbl}>
                                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 700, color: '#c9a84c', textShadow: '0 0 25px rgba(201,168,76,0.4)' }}>{num}</div>
                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 2, marginTop: 5, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{lbl}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
                            style={{ height: 520, position: 'relative' }}>
                    <Canvas camera={{ position: [0, 0, 5], fov: 58 }}>
                        <GlobeScene />
                    </Canvas>
                    <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', whiteSpace: 'nowrap', letterSpacing: 2, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        DRAG TO EXPLORE
                    </div>
                </motion.div>
            </div>
        </div>
    )
}