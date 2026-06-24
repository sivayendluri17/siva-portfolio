import { motion } from 'framer-motion'

const links = ['Home','About','Projects','Skills','Publications','Blog','Contact']

export default function Navbar({ active, setActive }: { active: string, setActive: (s:string)=>void }) {
    return (
        <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
                    style={{
                        position:'fixed', top:0, left:0, right:0, zIndex:1000,
                        background:'rgba(8,18,32,0.92)',
                        backdropFilter:'blur(20px)',
                        WebkitBackdropFilter:'blur(20px)',
                        borderBottom:'1px solid rgba(201,168,76,0.12)',
                        padding:'0 2.5rem', height:64,
                        display:'flex', alignItems:'center', justifyContent:'space-between',
                        boxShadow:'0 4px 30px rgba(0,0,0,0.3)'
                    }}>

            {/* Logo */}
            <div style={{
                fontFamily:'Playfair Display, serif',
                fontSize:'1.4rem',
                fontWeight:900,
                color:'#c9a84c',
                letterSpacing:3,
                textShadow:'0 0 20px rgba(201,168,76,0.5)',
                cursor:'default'
            }}>
                SY
            </div>

            {/* Nav links */}
            <div style={{ display:'flex', gap:'0.1rem' }}>
                {links.map(l => (
                    <button key={l} onClick={() => setActive(l)}
                            style={{
                                background: active===l ? 'rgba(201,168,76,0.08)' : 'transparent',
                                border:'none',
                                borderBottom: active===l ? '2px solid #c9a84c' : '2px solid transparent',
                                color: active===l ? '#c9a84c' : 'rgba(255,255,255,0.5)',
                                padding:'0.5rem 1rem',
                                cursor:'pointer',
                                fontSize:'0.78rem',
                                fontWeight: active===l ? 600 : 400,
                                fontFamily:'Inter, sans-serif',
                                letterSpacing:'0.8px',
                                textTransform:'uppercase',
                                transition:'all 0.25s ease',
                                textShadow: active===l ? '0 0 12px rgba(201,168,76,0.6)' : 'none',
                                boxShadow: active===l ? '0 0 20px rgba(201,168,76,0.1)' : 'none',
                                borderRadius:'4px 4px 0 0',
                                position:'relative',
                            }}
                            onMouseEnter={e => {
                                if (active !== l) {
                                    e.currentTarget.style.color = '#c9a84c'
                                    e.currentTarget.style.textShadow = '0 0 12px rgba(201,168,76,0.5)'
                                    e.currentTarget.style.background = 'rgba(201,168,76,0.05)'
                                }
                            }}
                            onMouseLeave={e => {
                                if (active !== l) {
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                                    e.currentTarget.style.textShadow = 'none'
                                    e.currentTarget.style.background = 'transparent'
                                }
                            }}>
                        {l}
                    </button>
                ))}
            </div>
        </motion.nav>
    )
}