import { motion } from 'framer-motion'

const skillGroups = [
    { title:'Languages', color:'#c9a84c', skills:['Java','Python','JavaScript','TypeScript','SQL','Bash','C++'] },
    { title:'Frameworks', color:'#3b82f6', skills:['Spring Boot','Spring MVC','Hibernate','React','Angular','Node.js','J2EE'] },
    { title:'AWS Services', color:'#10b981', skills:['EC2','S3','Lambda','RDS','DynamoDB','Amplify','CloudWatch','SQS','SNS'] },
    { title:'Databases', color:'#8b5cf6', skills:['Oracle','MySQL','PostgreSQL','MongoDB','Cassandra','DynamoDB','DB2'] },
    { title:'DevOps', color:'#f59e0b', skills:['Docker','Kubernetes','Jenkins','Git','Terraform','Maven','CI/CD'] },
    { title:'AI Tools', color:'#ef4444', skills:['Amazon Q','Kiro','Cline','Copilot','ChatGPT'] },
]

const certs = [
    { name:'AWS Certified Cloud Practitioner', color:'#f59e0b' },
    { name:'AWS Certified Solutions Architect', color:'#c9a84c' },
    { name:'HashiCorp Terraform Associate', color:'#8b5cf6' },
]

export default function Skills() {
    return (
        <div style={{ minHeight:'100vh', paddingTop:80, position:'relative' }}>
            <div style={{ maxWidth:1000, margin:'0 auto', padding:'2rem 2rem 6rem' }}>
                <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
                    <div style={{ color:'#c9a84c', fontSize:'0.8rem', letterSpacing:3, textTransform:'uppercase', marginBottom:'0.5rem' }}>What I Know</div>
                    <h2 style={{ fontFamily:'Playfair Display, serif', fontSize:'2.5rem', fontWeight:900, marginBottom:'0.5rem', color:'white' }}>Skills</h2>
                    <div style={{ width:48, height:3, background:'#c9a84c', borderRadius:2, marginBottom:'3rem' }} />
                </motion.div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.2rem', marginBottom:'2rem' }}>
                    {skillGroups.map((g, i) => (
                        <motion.div key={g.title}
                                    initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }}
                                    style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:'1.3rem', borderLeft:`3px solid ${g.color}` }}>
                            <div style={{ fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:1, color:g.color, marginBottom:'0.8rem' }}>{g.title}</div>
                            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                                {g.skills.map(s => (
                                    <span key={s} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.75)', fontSize:'0.78rem', padding:'0.25rem 0.6rem', borderRadius:4 }}>{s}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div>
                    <div style={{ fontSize:'0.78rem', color:'#c9a84c', textTransform:'uppercase', letterSpacing:2, marginBottom:'1rem', fontWeight:600 }}>Certifications</div>
                    {certs.map((c, i) => (
                        <motion.div key={i} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5+i*0.1 }}
                                    style={{ background:'rgba(255,255,255,0.03)', border:`1px solid ${c.color}30`, borderRadius:8, padding:'0.9rem 1rem', marginBottom:'0.7rem', borderLeft:`3px solid ${c.color}` }}>
                            <div style={{ fontSize:'0.9rem', color:'rgba(255,255,255,0.85)', fontWeight:500 }}>{c.name}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}