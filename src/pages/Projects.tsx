import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const projects = [
  { title:'AI Code Review Bot', company:'Amazon', year:'2024', color:'#c9a84c', desc:'Built an AI-powered code review framework with product-specific knowledge that automatically flags issues in commits before manual review, saving reviewers significant time.', tags:['AI/ML','Python','Automation','Amazon Internal'], impact:'Saved hours of reviewer time weekly' },
  { title:'DV2 to DV3 India Marketplace Migration', company:'Amazon', year:'2024', color:'#3b82f6', desc:'Led the migration for the India marketplace delivering enhanced delivery messaging and updated Prime badge on search pages.', tags:['Java','AAPI','Global Deployment','Cart & Checkout'], impact:'Rs 1.4B INR in C-sales revenue' },
  { title:'UDM on Cart Global Deployment', company:'Amazon', year:'2024', color:'#10b981', desc:'Contributed to global deployment of UDM on Cart. Removed Prisma-based latency with optimized AAPI methods enabling a massive annualized profit boost.', tags:['Java','Performance','Global','Cart'], impact:'$1.2B annualized profit boost' },
  { title:'Kafka Data Pipeline', company:'Regions Bank', year:'2023', color:'#8b5cf6', desc:'Developed data pipeline converting legacy data to Avro format and streaming into Kafka using Apache Camel. Created REST APIs and batch processes importing data to Cassandra cluster.', tags:['Kafka','Spring Boot','Cassandra','Java 8'], impact:'25% reduction in code complexity' },
  { title:'CI/CD Pipeline Automation', company:'Regions Bank', year:'2023', color:'#f59e0b', desc:'Configured Jenkins server with self-operating build pipeline jobs using Groovy scripting delivering 50% less build efforts and a 60% decrease in build errors.', tags:['Jenkins','Docker','Kubernetes','Groovy'], impact:'60% decrease in build errors' },
  { title:'Village Knowledge Platform', company:'Personal Project', year:'2025 - Present', color:'#ef4444', desc:'Building a video platform for my village community in India where people can watch how-to videos in their local language for farming, household repairs, and daily tasks. No reading required.', tags:['React','AWS','Social Impact','Multilingual'], impact:'Giving back to where I came from' },
]

export default function Projects() {
  const isMobile = useIsMobile()

  return (
    <div style={{ minHeight:'100vh', paddingTop:80, position:'relative' }}>
      <div style={{ maxWidth:1000, margin:'0 auto', padding: isMobile ? '1rem 1.2rem 4rem' : '2rem 2rem 6rem' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <div style={{ color:'#c9a84c', fontSize:'0.8rem', letterSpacing:3, textTransform:'uppercase', marginBottom:'0.5rem' }}>What I Built</div>
          <h2 style={{ fontFamily:'Playfair Display, serif', fontSize: isMobile ? '1.9rem' : '2.5rem', fontWeight:900, marginBottom:'0.5rem', color:'white' }}>Projects</h2>
          <div style={{ width:48, height:3, background:'#c9a84c', borderRadius:2, marginBottom: isMobile ? '2rem' : '3rem' }} />
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(440px, 100%), 1fr))', gap:'1.5rem' }}>
          {projects.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ y:-4 }}
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding: isMobile ? '1.4rem' : '2rem', borderTop:`3px solid ${p.color}`, transition:'all 0.3s' }}>
              <div style={{ fontSize:'0.75rem', color:p.color, textTransform:'uppercase', letterSpacing:1, fontWeight:600, marginBottom:'0.4rem' }}>{p.company} · {p.year}</div>
              <div style={{ fontFamily:'Playfair Display, serif', fontSize:'1.1rem', fontWeight:700, color:'white', marginBottom:'0.8rem', lineHeight:1.3 }}>{p.title}</div>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.88rem', lineHeight:1.75, marginBottom:'1rem' }}>{p.desc}</p>
              <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:8, padding:'0.6rem 1rem', marginBottom:'1rem', fontSize:'0.8rem', color:p.color, fontWeight:500 }}>
                Impact: {p.impact}
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                {p.tags.map(t => (
                  <span key={t} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', fontSize:'0.75rem', padding:'0.2rem 0.6rem', borderRadius:4 }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
