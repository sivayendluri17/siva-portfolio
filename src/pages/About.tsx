import { motion } from 'framer-motion'

const journey = [
    { year:'~2000', title:'Born in a Village, India', desc:'Where it all began. A small village, a curious child, and big dreams.', img:'/images/baby.jpg', emoji:'🌱' },
    { year:'~2008', title:'Growing Up', desc:'School days with family. The foundation of who I am today was built here.', img:'/images/school.jpg', emoji:'📚' },
    { year:'2019', title:'Bapatla Engineering College', desc:'B.Tech Electronics Engineering, affiliated to Acharya Nagarjuna University.', img:'/images/college.jpg', emoji:'🎓' },
    { year:'2020', title:'Back to the Roots', desc:'Working in the farm fields before the big leap to America.', img:'/images/farm.jpg', emoji:'🌾' },
    { year:'Aug 2021', title:'The Big Goodbye', desc:'Said goodbye to my parents at the airport and flew to America.', img:'/images/airport.jpg', emoji:'✈️' },
    { year:'2021-2023', title:'First Days in America', desc:'Northern Illinois University, then Southern Arkansas University. Learning and grinding.', img:'/images/coding.jpg', emoji:'🇺🇸' },
    { year:'May 2023', title:"Master's Degree", desc:'M.S. Computer Science from Southern Arkansas University. First degree on American soil.', img:'/images/graduation.jpg', emoji:'🏆' },
    { year:'Jun 2024 - Dec 2025', title:'Amazon, New York', desc:'Software Development Engineer. Built systems serving millions globally.', img:'/images/professional.jpg', emoji:'📦' },
    { year:'Jan 2026 - Present', title:'Bank of America, New York', desc:'Software Engineer. Continuing to grow and lead at scale.', img:'/images/professional.jpg', emoji:'🏦' },
]

export default function About() {
    return (
        <div style={{ minHeight:'100vh', paddingTop:80, position:'relative' }}>
            <div style={{ maxWidth:900, margin:'0 auto', padding:'2rem 2rem 6rem' }}>
                <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
                    <div style={{ color:'#c9a84c', fontSize:'0.8rem', letterSpacing:3, textTransform:'uppercase', marginBottom:'0.5rem' }}>My Journey</div>
                    <h2 style={{ fontFamily:'Playfair Display, serif', fontSize:'2.5rem', fontWeight:900, marginBottom:'0.5rem', color:'white' }}>From Village to Wall Street</h2>
                    <div style={{ width:48, height:3, background:'#c9a84c', borderRadius:2, marginBottom:'1.5rem' }} />
                    <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', lineHeight:1.8, marginBottom:'3rem', maxWidth:600 }}>
                        Every step of this journey shaped who I am. From a small village in India to Bank of America in New York.
                    </p>
                </motion.div>
                <div style={{ position:'relative' }}>
                    <div style={{ position:'absolute', left:24, top:0, bottom:0, width:2, background:'rgba(201,168,76,0.2)' }} />
                    {journey.map((item, i) => (
                        <motion.div key={i}
                                    initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ delay: i * 0.1 }}
                                    style={{ display:'flex', gap:'2rem', marginBottom:'2rem', position:'relative' }}>
                            <div style={{ width:50, height:50, borderRadius:'50%', background:'rgba(201,168,76,0.15)', border:'2px solid #c9a84c', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0, zIndex:2 }}>
                                {item.emoji}
                            </div>
                            <div style={{ flex:1, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(201,168,76,0.15)', borderRadius:12, padding:'1.2rem', display:'grid', gridTemplateColumns:'1fr auto', gap:'1rem', alignItems:'start' }}>
                                <div>
                                    <div style={{ color:'#c9a84c', fontSize:'0.78rem', letterSpacing:2, textTransform:'uppercase', marginBottom:'0.3rem' }}>{item.year}</div>
                                    <div style={{ fontFamily:'Playfair Display, serif', fontSize:'1rem', fontWeight:700, marginBottom:'0.4rem', color:'white' }}>{item.title}</div>
                                    <div style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.88rem', lineHeight:1.6 }}>{item.desc}</div>
                                </div>
                                <div style={{ width:80, height:80, borderRadius:8, overflow:'hidden', flexShrink:0, border:'1px solid rgba(201,168,76,0.2)' }}>
                                    <img src={item.img} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}