import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const links = ['Home','About','Projects','Skills','Publications','Blog','Contact']

export default function Navbar({ active, setActive }: { active: string, setActive: (s:string)=>void }) {
  const isMobile = useIsMobile()

  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        background:'rgba(8,18,32,0.92)',
        backdropFilter:'blur(20px)',
        WebkitBackdropFilter:'blur(20px)',
        borderBottom:'1px solid rgba(201,168,76,0.12)',
        padding: isMobile ? '0 1rem' : '0 2.5rem',
        height:64,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        boxShadow:'0 4px 30px rgba(0,0,0,0.3)',
        gap: 8
      }}>

      <div style={{
        fontFamily:'Playfair Display, serif',
        fontSize: isMobile ? '1.2rem' : '1.4rem',
        fontWeight:900,
        color:'#c9a84c',
        letterSpacing:3,
        textShadow:'0 0 20px rgba(201,168,76,0.5)',
        cursor:'default',
        flexShrink: 0
      }}>
        SY
      </div>

      <div style={{
        display:'flex',
        gap:'0.1rem',
        overflowX: isMobile ? 'auto' : 'visible',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        maxWidth: '100%'
      }}>
        {links.map(l => (
          <button key={l} onClick={() => setActive(l)}
            style={{
              background: active===l ? 'rgba(201,168,76,0.08)' : 'transparent',
              border:'none',
              borderBottom: active===l ? '2px solid #c9a84c' : '2px solid transparent',
              color: active===l ? '#c9a84c' : 'rgba(255,255,255,0.5)',
              padding: isMobile ? '0.45rem 0.6rem' : '0.5rem 1rem',
              cursor:'pointer',
              fontSize: isMobile ? '0.68rem' : '0.78rem',
              fontWeight: active===l ? 600 : 400,
              fontFamily:'Inter, sans-serif',
              letterSpacing:'0.6px',
              textTransform:'uppercase',
              transition:'all 0.25s ease',
              textShadow: active===l ? '0 0 12px rgba(201,168,76,0.6)' : 'none',
              borderRadius:'4px 4px 0 0',
              whiteSpace:'nowrap',
              flexShrink: 0
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
