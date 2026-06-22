import React, { useState } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import StarField from './components/StarField'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Publications from './pages/Publications'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

export default function App() {
    const [active, setActive] = useState('Home')

    const pages: Record<string, React.ReactElement> = {
        Home: <Home setActive={setActive} />,
        About: <About />,
        Projects: <Projects />,
        Skills: <Skills />,
        Publications: <Publications />,
        Blog: <Blog />,
        Contact: <Contact />,
    }

    return (
        <div style={{ position:'relative', minHeight:'100vh' }}>
            <StarField />
            <div style={{ position:'relative', zIndex:1 }}>
                <Navbar active={active} setActive={setActive} />
                {pages[active]}
            </div>
        </div>
    )
}