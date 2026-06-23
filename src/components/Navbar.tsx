import { motion } from 'framer-motion'

const links = ['Home','About','Projects','Skills','Publications','Blog','Contact']

export default function Navbar({ active, setActive }: { active: string, setActive: (s:string)=>void }) {
    return (
        <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
                    style={{
                        position:'fixed', top:0, left:0, right:0, zIndex:1000,
                        background:'rgba(10,22,40,0.95)', backdropFilter:'blur(12px)',
                        borderBottom:'1px solid rgba(201,168,76,0.15)',
                        padding:'0 2rem', height:64,
                        display:'flex', alignItems:'center', justifyContent:'space-between'
                    }}>
            <div style={{ fontFamily:'Playfair Display, serif', fontSize:'1.3rem', color:'#c9a84c', fontWeight:700, letterSpacing:2 }}>
                SY
            </div>
            <div style={{ display:'flex', gap:'0.2rem', flexWrap:'wrap' }}>
                {links.map(l => (
                    <button key={l} onClick={() => setActive(l)}
                            style={{
                                background: active===l ? 'rgba(201,168,76,0.1)' : 'transparent',
                                border:'none', borderBottom: active===l ? '2px solid #c9a84c' : '2px solid transparent',
                                color: active===l ? '#c9a84c' : 'rgba(255,255,255,0.55)',
                                padding:'0.4rem 0.85rem', cursor:'pointer',
                                fontSize:'0.8rem', fontWeight: active===l ? 600 : 400,
                                fontFamily:'Inter, sans-serif', letterSpacing:0.4,
                                transition:'all 0.2s'
                            }}>
                        {l}
                    </button>
                ))}
            </div>
        </motion.nav>
    )
}