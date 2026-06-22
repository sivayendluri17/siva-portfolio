import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

function AnimatedSphere() {
    return (
        <Sphere visible args={[1, 100, 200]} scale={2}>
            <MeshDistortMaterial color="#c9a84c" attach="material" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
        </Sphere>
    )
}

export default function Home({ setActive }: { setActive: (s:string)=>void }) {
    return (
        <div style={{ minHeight:'100vh', paddingTop:64, display:'flex', alignItems:'center', position:'relative' }}>
            <div style={{ maxWidth:1100, margin:'0 auto', padding:'4rem 2rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center', width:'100%' }}>
                <div>
                    <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
                                style={{ color:'#c9a84c', fontSize:'0.85rem', letterSpacing:3, textTransform:'uppercase', marginBottom:'1rem', fontWeight:600 }}>
                        Software Engineer @ Bank of America
                    </motion.div>
                    <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
                               style={{ fontFamily:'Playfair Display, serif', fontSize:'clamp(2.5rem,5vw,3.8rem)', fontWeight:900, lineHeight:1.1, marginBottom:'1.5rem', color:'white' }}>
                        Siva Yendluri
                    </motion.h1>
                    <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
                              style={{ color:'rgba(255,255,255,0.6)', fontSize:'1.05rem', lineHeight:1.8, marginBottom:'2rem', maxWidth:480 }}>
                        From the farm fields of a village in India to building systems that serve millions. Full-stack engineer with 4+ years of high-impact software delivery.
                    </motion.p>
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
                                style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap', paddingTop:'1.5rem', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
                        {[['4+','Years Experience'],['15+','Projects Delivered'],['2x','AWS Certified'],['3','Companies']].map(([num,lbl]) => (
                            <div key={lbl}>
                                <div style={{ fontFamily:'Playfair Display, serif', fontSize:'2rem', fontWeight:700, color:'#c9a84c' }}>{num}</div>
                                <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:1, marginTop:2 }}>{lbl}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
                <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.4, duration:0.8 }}
                            style={{ height:400 }}>
                    <Canvas>
                        <ambientLight intensity={0.3} />
                        <directionalLight position={[10,10,5]} intensity={1} color="#c9a84c" />
                        <pointLight position={[-10,-10,-5]} intensity={0.5} color="#1a56db" />
                        <AnimatedSphere />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                    </Canvas>
                </motion.div>
            </div>
        </div>
    )
}