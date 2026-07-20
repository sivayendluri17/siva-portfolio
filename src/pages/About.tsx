import { motion } from 'framer-motion'

const journey = [
  { year: '1998', title: 'Born in Vinukonda, Andhra Pradesh', desc: 'Where it all began. A small village, a curious child, and big dreams. I did my schooling here from class 1 to 5.', img: '/images/baby.jpg', emoji: '🌱' },
  { year: '2008 - 2016', title: 'Growing Up in Guntur', desc: 'Moved to Guntur for class 6 to 10 and my intermediate. School days with family, the foundation of who I am today was built in these years.', img: '/images/school.jpg', emoji: '📚' },
  { year: '2016 - 2020', title: 'Bapatla Engineering College', desc: 'B.Tech Electronics Engineering at Bapatla Engineering College, affiliated to Acharya Nagarjuna University.', img: '/images/college.jpg', emoji: '🎓' },
  { year: '2020 - 2021', title: 'First Job and the Farm Fields', desc: 'Worked for Blue Cross Blue Shield through TCS from home, and helped my family in the farm fields at the same time. Two worlds in one year.', img: '/images/farm.jpg', emoji: '🌾' },
  { year: 'Aug 2021', title: 'The Big Goodbye', desc: 'Got my admission to Northern Illinois University. Said goodbye to my parents at the airport and flew to America with one bag and a dream.', img: '/images/airport.jpg', emoji: '✈️' },
  { year: '2021 - 2023', title: 'Finding My Way in America', desc: 'Started at Northern Illinois University, then transferred to Southern Arkansas University when my health was not good, moving closer to friends who became family.', img: '/images/coding.jpg', emoji: '🇺🇸' },
  { year: 'May 2023', title: "Master's Degree", desc: 'M.S. Computer Science from Southern Arkansas University. My first degree on American soil.', img: '/images/graduation.jpg', emoji: '🏆' },
  { year: 'Jun 2023 - May 2024', title: 'Regions Bank', desc: 'Software Developer. Built REST APIs, Kafka pipelines and CI/CD automation for banking systems.', img: '/images/coding.jpg', emoji: '🏛️' },
  { year: 'Jun 2024 - Dec 2025', title: 'Amazon, New York', desc: 'Software Development Engineer. Built systems serving millions of customers globally.', img: '/images/professional.jpg', emoji: '📦' },
  { year: 'Jan 2026 - Present', title: 'Bank of America, New York', desc: 'Software Engineer. Continuing to grow and lead at scale in financial technology.', img: '/images/professional.jpg', emoji: '🏦' },
  { year: '2024 - May 2026', title: 'Cumberland University', desc: 'Currently pursuing my second Master\u2019s, M.S. in Information Science, alongside my full time role. Always learning, always growing.', img: '/images/graduation.jpg', emoji: '📖' },
]

function Photo3D({ img, title, index }: { img: string, title: string, index: number }) {
  // Alternate the tilt direction for visual variety
  const tiltY = index % 2 === 0 ? -16 : 16
  return (
    <div style={{ perspective: 700, flexShrink: 0 }}>
      <motion.div
        initial={{ rotateY: tiltY, rotateX: 8 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 } }}
        whileHover={{ rotateY: 0, rotateX: 0, scale: 1.18, zIndex: 10 }}
        style={{
          width: 118, height: 118, borderRadius: 14, position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${tiltY}deg) rotateX(8deg)`,
          cursor: 'pointer',
        }}>
        {/* Back depth layer - creates the 3D slab effect */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 14,
          background: 'linear-gradient(135deg, #c9a84c, #7a6222)',
          transform: 'translateZ(-14px) translateX(7px) translateY(7px)',
          filter: 'blur(1px)', opacity: 0.85
        }} />
        {/* Middle depth layer */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 14,
          background: '#0f2040',
          transform: 'translateZ(-7px) translateX(3px) translateY(3px)',
          border: '1px solid rgba(201,168,76,0.4)'
        }} />
        {/* Front face - the photo */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 14, overflow: 'hidden',
          border: '2px solid rgba(201,168,76,0.6)',
          boxShadow: '0 18px 40px rgba(0,0,0,0.6), 0 0 25px rgba(201,168,76,0.25)',
          transform: 'translateZ(0px)'
        }}>
          <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          {/* Glass shine overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(120deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 30%, transparent 55%)',
            pointerEvents: 'none'
          }} />
        </div>
      </motion.div>
    </div>
  )
}

export default function About() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 2rem 6rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ color: '#c9a84c', fontSize: '0.8rem', letterSpacing: 3, textTransform: 'uppercase', marginBottom: '0.5rem' }}>My Journey</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'white' }}>From Village to Wall Street</h2>
          <div style={{ width: 48, height: 3, background: '#c9a84c', borderRadius: 2, marginBottom: '1.5rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '3rem', maxWidth: 600 }}>
            Every step of this journey shaped who I am. From a small village in Andhra Pradesh to Bank of America in New York.
          </p>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 2, background: 'rgba(201,168,76,0.2)' }} />

          {journey.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', gap: '2rem', marginBottom: '2.2rem', position: 'relative' }}>

              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '2px solid #c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, zIndex: 2 }}>
                {item.emoji}
              </div>

              <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: '1.2rem 1.4rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.6rem', alignItems: 'center', overflow: 'visible' }}>
                <div>
                  <div style={{ color: '#c9a84c', fontSize: '0.78rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.3rem' }}>{item.year}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'white' }}>{item.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
                <Photo3D img={item.img} title={item.title} index={i} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
