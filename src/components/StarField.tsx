import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

export default function StarField() {
    return (
        <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none' }}>
            <Canvas camera={{ position:[0,0,1] }}>
                <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={0.5} />
            </Canvas>
        </div>
    )
}