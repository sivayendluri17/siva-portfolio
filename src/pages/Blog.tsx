import { motion } from 'framer-motion'

const posts = [
    { title:'What I learned building an AI code review bot at Amazon', date:'Coming Soon', color:'#3b82f6', excerpt:'How we automated the first pass of code reviews using product-specific knowledge and saved hours of reviewer time every week across teams.' },
    { title:'Migrating a marketplace at scale — lessons from the India DV3 project', date:'Coming Soon', color:'#c9a84c', excerpt:'How small engineering decisions create billion-rupee impacts for millions of customers.' },
    { title:'From farm fields to Bank of America — my unlikely path into tech', date:'Coming Soon', color:'#10b981', excerpt:'I grew up working in farm fields in a village in India. Here is how I ended up building financial software in New York.' },
    { title:'Building for people who cannot read — my village platform project', date:'Coming Soon', color:'#f59e0b', excerpt:'Why I am building a video platform in local languages for my village in India and what I am learning along the way.' },
]

export default function Blog() {
    return (
        <div style={{ minHeight:'100vh', paddingTop:80, position:'relative' }}>
            <div style={{ maxWidth:900, margin:'0 auto', padding:'2rem 2rem 6rem' }}>
                <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
                    <div style={{ color:'#c9a84c', fontSize:'0.8rem', letterSpacing:3, textTransform:'uppercase', marginBottom:'0.5rem' }}>Thoughts</div>
                    <h2 style={{ fontFamily:'Playfair Display, serif', fontSize:'2.5rem', fontWeight:900, marginBottom:'0.5rem', color:'white' }}>Blog</h2>
                    <div style={{ width:48, height:3, background:'#c9a84c', borderRadius:2, marginBottom:'3rem' }} />
                </motion.div>
                <div style={{ display:'grid', gap:'1.2rem' }}>
                    {posts.map((p, i) => (
                        <motion.div key={i}
                                    initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }}
                                    whileHover={{ x:6 }}
                                    style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:'1.8rem', borderLeft:`4px solid ${p.color}`, cursor:'pointer', transition:'all 0.2s' }}>
                            <div style={{ color:p.color, fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:1, marginBottom:'0.5rem' }}>{p.date}</div>
                            <div style={{ fontFamily:'Playfair Display, serif', fontSize:'1.1rem', fontWeight:700, marginBottom:'0.6rem', lineHeight:1.4, color:'white' }}>{p.title}</div>
                            <div style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.88rem', lineHeight:1.7 }}>{p.excerpt}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}