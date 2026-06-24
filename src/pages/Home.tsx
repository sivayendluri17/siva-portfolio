import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Globe() {
    const globeRef = useRef<THREE.Group>(null)
    const indiaRef = useRef<THREE.Mesh>(null)
    const usRef = useRef<THREE.Mesh>(null)

    useFrame((_, delta) => {
        if (globeRef.current) globeRef.current.rotation.y += delta * 0.3
        if (indiaRef.current) indiaRef.current.rotation.y += delta * 0.3
        if (usRef.current) usRef.current.rotation.y += delta * 0.3
    })

    // Grid lines on globe
    const gridLines = useMemo(() => {
        const lines = []
        // Latitude lines
        for (let lat = -80; lat <= 80; lat += 20) {
            const points = []
            for (let lng = 0; lng <= 360; lng += 5) {
                const phi = (90 - lat) * (Math.PI / 180)
                const theta = lng * (Math.PI / 180)
                points.push(new THREE.Vector3(
                    2.01 * Math.sin(phi) * Math.cos(theta),
                    2.01 * Math.cos(phi),
                    2.01 * Math.sin(phi) * Math.sin(theta)
                ))
            }
            lines.push(points)
        }
        // Longitude lines
        for (let lng = 0; lng < 360; lng += 20) {
            const points = []
            for (let lat = -90; lat <= 90; lat += 5) {
                const phi = (90 - lat) * (Math.PI / 180)
                const theta = lng * (Math.PI / 180)
                points.push(new THREE.Vector3(
                    2.01 * Math.sin(phi) * Math.cos(theta),
                    2.01 * Math.cos(phi),
                    2.01 * Math.sin(phi) * Math.sin(theta)
                ))
            }
            lines.push(points)
        }
        return lines
    }, [])

    // India position (approx lat: 20, lng: 78)
    const indiaPos = useMemo(() => {
        const phi = (90 - 20) * (Math.PI / 180)
        const theta = 78 * (Math.PI / 180)
        return new THREE.Vector3(
            2.15 * Math.sin(phi) * Math.cos(theta),
            2.15 * Math.cos(phi),
            2.15 * Math.sin(phi) * Math.sin(theta)
        )
    }, [])

    // US position (approx lat: 38, lng: -97)
    const usPos = useMemo(() => {
        const phi = (90 - 38) * (Math.PI / 180)
        const theta = -97 * (Math.PI / 180)
        return new THREE.Vector3(
            2.15 * Math.sin(phi) * Math.cos(theta),
            2.15 * Math.cos(phi),
            2.15 * Math.sin(phi) * Math.sin(theta)
        )
    }, [])

    return (
        <group ref={globeRef}>
            {/* Main globe */}
            <Sphere args={[2, 64, 64]}>
                <meshStandardMaterial
                    color="#0a1628"
                    emissive="#0f2040"
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.95}
                    roughness={0.8}
                    metalness={0.2}
                />
            </Sphere>

            {/* Grid lines */}
            {gridLines.map((points, i) => {
                const geometry = new THREE.BufferGeometry().setFromPoints(points)
                return (
                    <primitive key={i} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#c9a84c', transparent: true, opacity: 0.15 }))} />
                )
            })}

            {/* India dot */}
            <mesh position={indiaPos}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#c9a84c" emissive="#c9a84c" emissiveIntensity={2} />
            </mesh>
            {/* India glow ring */}
            <mesh position={indiaPos}>
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshStandardMaterial color="#c9a84c" transparent opacity={0.3} emissive="#c9a84c" emissiveIntensity={1} />
            </mesh>

            {/* US dot */}
            <mesh position={usPos}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} />
            </mesh>
            {/* US glow ring */}
            <mesh position={usPos}>
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshStandardMaterial color="#60a5fa" transparent opacity={0.3} emissive="#60a5fa" emissiveIntensity={1} />
            </mesh>
        </group>
    )
}

function GlobeScene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[3, 3, 3]} intensity={1.5} color="#c9a84c" />
            <pointLight position={[-3, -3, -3]} intensity={0.5} color="#60a5fa" />
            <Globe />
            <OrbitControls enableZoom={false} autoRotate={false} enablePan={false} />
        </>
    )
}

export default function Home({ setActive }: { setActive: (s:string)=>void }) {
    return (
        <div style={{ minHeight:'100vh', paddingTop:64, display:'flex', alignItems:'center', position:'relative' }}>
            <div style={{ maxWidth:1100, margin:'0 auto', padding:'4rem 2rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center', width:'100%' }}>
                <div>
                    <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
                                style={{ color:'#c9a84c', fontSize:'0.85rem', letterSpacing:3, textTransform:'uppercase', marginBottom:'1rem', fontWeight:600 }}>
                        Software Engineer
                    </motion.div>

                    <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
                               style={{ fontFamily:'Playfair Display, serif', fontSize:'clamp(2.8rem,6vw,4.5rem)', fontWeight:900, lineHeight:1.05, marginBottom:'1.2rem', color:'white' }}>
                        Siva<br/>Yendluri
                    </motion.h1>

                    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45 }}
                                style={{ display:'flex', gap:'14px', marginBottom:'1.8rem', alignItems:'center' }}>
                        <a href="https://github.com/sivayendluri17/siva-portfolio" target="_blank" rel="noopener noreferrer"
                           style={{ width:44, height:44, borderRadius:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', transition:'all 0.2s', cursor:'pointer' }}
                           onMouseEnter={e => (e.currentTarget.style.background='rgba(201,168,76,0.2)')}
                           onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.07)')}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/siva-yendluri/" target="_blank" rel="noopener noreferrer"
                           style={{ width:44, height:44, borderRadius:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', transition:'all 0.2s', cursor:'pointer' }}
                           onMouseEnter={e => (e.currentTarget.style.background='rgba(201,168,76,0.2)')}
                           onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.07)')}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginLeft:'8px' }}>
                            <div style={{ width:10, height:10, borderRadius:'50%', background:'#c9a84c', boxShadow:'0 0 8px #c9a84c' }}></div>
                            <span style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)' }}>India</span>
                            <div style={{ width:10, height:10, borderRadius:'50%', background:'#60a5fa', boxShadow:'0 0 8px #60a5fa', marginLeft:'8px' }}></div>
                            <span style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)' }}>United States</span>
                        </div>
                    </motion.div>

                    <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
                              style={{ color:'rgba(255,255,255,0.7)', fontSize:'1.05rem', lineHeight:1.9, marginBottom:'1.5rem', maxWidth:480 }}>
                        I grew up in a small village in India with no laptop and no wifi. But I had one thing, the hunger to build something bigger. I packed one bag, bought a ticket to the US, and started from zero. Today I build software that millions of people use every day.
                    </motion.p>

                    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55 }}
                                style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'2rem' }}>
                        {['Java / J2EE', 'React', 'AWS Certified', 'Spring Boot', 'New York, NY'].map(tag => (
                            <span key={tag} style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.8)', padding:'0.3rem 0.85rem', borderRadius:20, fontSize:'0.8rem' }}>
                {tag}
              </span>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65 }}
                                style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'3rem' }}>
                        <button onClick={() => setActive('Projects')}
                                style={{ background:'#c9a84c', color:'#0a1628', padding:'0.75rem 2rem', border:'none', borderRadius:8, fontWeight:700, fontSize:'0.9rem', cursor:'pointer' }}>
                            View My Work
                        </button>
                        <button onClick={() => setActive('About')}
                                style={{ background:'transparent', color:'#c9a84c', padding:'0.75rem 2rem', border:'1px solid rgba(201,168,76,0.4)', borderRadius:8, fontWeight:500, fontSize:'0.9rem', cursor:'pointer' }}>
                            My Story
                        </button>
                    </motion.div>

                    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
                                style={{ display:'grid', gridTemplateColumns:'repeat(4, auto)', gap:'2rem', paddingTop:'1.5rem', borderTop:'1px solid rgba(255,255,255,0.08)', width:'fit-content' }}>
                        {[['4+','Years Experience'],['15+','Projects Delivered'],['2x','AWS Certified'],['3','Companies']].map(([num,lbl]) => (
                            <div key={lbl}>
                                <div style={{ fontFamily:'Playfair Display, serif', fontSize:'2rem', fontWeight:700, color:'#c9a84c' }}>{num}</div>
                                <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:1, marginTop:2 }}>{lbl}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.4, duration:0.8 }}
                            style={{ height:500, position:'relative' }}>
                    <Canvas camera={{ position:[0, 0, 5], fov:60 }}>
                        <GlobeScene />
                    </Canvas>
                    <div style={{ position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)', fontSize:'0.75rem', color:'rgba(255,255,255,0.35)', textAlign:'center', whiteSpace:'nowrap' }}>
                        Drag to explore
                    </div>
                </motion.div>
            </div>
        </div>
    )
}