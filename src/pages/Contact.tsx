import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Contact() {
  const isMobile = useIsMobile()

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '1rem 1.2rem 4rem' : '2rem 2rem 6rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ color: '#c9a84c', fontSize: '0.8rem', letterSpacing: 3, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Get In Touch</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? '1.9rem' : '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'white' }}>Contact</h2>
          <div style={{ width: 48, height: 3, background: '#c9a84c', borderRadius: 2, marginBottom: '1.5rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.8, marginBottom: isMobile ? '2rem' : '3rem', maxWidth: 500 }}>
            Open to collaborations, opportunities, and conversations. Feel free to reach out.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '3rem', alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {[
              { icon: '📧', label: 'Email', value: 'sivayendluri17@gmail.com' },
              { icon: '📱', label: 'Phone', value: '+1-779-902-0081' },
              { icon: '📍', label: 'Location', value: 'New York, NY' },
              { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/siva-yendluri' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: '1.1rem 1.3rem' }}>
                <div style={{ width: 44, height: 44, background: 'rgba(201,168,76,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500, wordBreak: 'break-word' }}>{item.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Your name', 'Your email', 'Subject'].map(ph => (
              <input key={ph} placeholder={ph} style={{ padding: '0.85rem 1.2rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white', fontSize: '0.9rem', fontFamily: 'Inter', outline: 'none', width: '100%' }} />
            ))}
            <textarea placeholder="Your message" rows={5} style={{ padding: '0.85rem 1.2rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white', fontSize: '0.9rem', fontFamily: 'Inter', outline: 'none', resize: 'vertical', width: '100%' }} />
            <button style={{ background: '#c9a84c', color: '#0a1628', padding: '0.85rem', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'Inter' }}>
              Send Message
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
