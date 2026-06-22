import { motion } from 'framer-motion'

export default function Publications() {
    return (
        <div style={{ minHeight:'100vh', paddingTop:80, position:'relative' }}>
            <div style={{ maxWidth:900, margin:'0 auto', padding:'2rem 2rem 6rem' }}>
                <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
                    <div style={{ color:'#c9a84c', fontSize:'0.8rem', letterSpacing:3, textTransform:'uppercase', marginBottom:'0.5rem' }}>Research</div>
                    <h2 style={{ fontFamily:'Playfair Display, serif', fontSize:'2.5rem', fontWeight:900, marginBottom:'0.5rem', color:'white' }}>Publications</h2>
                    <div style={{ width:48, height:3, background:'#c9a84c', borderRadius:2, marginBottom:'1.5rem' }} />
                    <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', lineHeight:1.8, marginBottom:'3rem', maxWidth:600 }}>
                        My research contributions published on Zenodo. Contributing to the knowledge community beyond just shipping code.
                    </p>
                </motion.div>
                <motion.a href="https://zenodo.org/search?q=siva+yendluri" target="_blank" rel="noopener noreferrer"
                          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
                          whileHover={{ y:-4 }}
                          style={{ display:'block', background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.3)', borderRadius:16, padding:'2.5rem', marginBottom:'1.5rem', textDecoration:'none', cursor:'pointer' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
                        <div style={{ width:56, height:56, background:'rgba(201,168,76,0.15)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem', flexShrink:0 }}>📄</div>
                        <div>
                            <div style={{ color:'#c9a84c', fontSize:'0.75rem', letterSpacing:2, textTransform:'uppercase', fontWeight:600, marginBottom:'0.4rem' }}>Zenodo Repository</div>
                            <div style={{ fontFamily:'Playfair Display, serif', fontSize:'1.2rem', fontWeight:700, color:'white', marginBottom:'0.5rem' }}>View All Publications by Siva Yendluri</div>
                            <div style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.88rem', lineHeight:1.6 }}>Research papers covering software engineering, information science, and technology innovation. Published on Zenodo, open access.</div>
                        </div>
                    </div>
                </motion.a>
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
                            style={{ background:'rgba(255,255,255,0.02)', border:'1px dashed rgba(255,255,255,0.1)', borderRadius:16, padding:'3rem', textAlign:'center' }}>
                    <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>🔬</div>
                    <div style={{ color:'rgba(255,255,255,0.4)', fontSize:'0.9rem', lineHeight:1.7 }}>
                        Individual publication details coming soon.
                    </div>
                </motion.div>
            </div>
        </div>
    )
}