'use client'
import dynamic from 'next/dynamic'
const Platform = dynamic(
  () => import('../components/PlatformV3.jsx').then(m => ({ default: m.default })),
  {
    ssr: false,
    loading: () => (
      <div style={{minHeight:'100vh',background:'#0f1117',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:18,fontFamily:'system-ui,sans-serif'}}>
        <div style={{width:56,height:56,borderRadius:14,background:'linear-gradient(135deg,#58a6ff,#bc8cff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:900,color:'#fff'}}>N</div>
        <div style={{color:'#58a6ff',fontSize:18,fontWeight:700}}>NEET Prep AI</div>
        <div style={{color:'#6e7681',fontSize:13}}>Loading your study platform...</div>
        <div style={{width:180,height:3,background:'#21262d',borderRadius:100,overflow:'hidden'}}>
          <div style={{height:'100%',width:'60%',background:'linear-gradient(90deg,#58a6ff,#bc8cff)',borderRadius:100,animation:'s 1.4s ease-in-out infinite'}}/>
        </div>
        <style>{'@keyframes s{0%{transform:translateX(-180px)}100%{transform:translateX(360px)}}'}</style>
      </div>
    ),
  }
)
export default function Home() { return <Platform/> }
