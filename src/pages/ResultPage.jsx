import { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas'

import furiaLogo from  "../assets/images/furiaLogo.png";
import { getFanProfile } from '../utils/getFanProfile'


function ResultPage() {
  const [fanData, setFanData] = useState(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('fanData'))
    setFanData(data)
  }, [])

  if (!fanData) {
    return <div>Carregando...</div>
  }
  
  const fanProfile = getFanProfile(fanData.answers)

  async function generateImage() {
    const element = profileRef.current

    if (element) {
      const canvas = await html2canvas(element)
      const image = canvas.toDataURL('image/png')

      // Cria um link para download
      const link = document.createElement('a')
      link.href = image
      link.download = 'meu-perfil-de-fa.png'
      link.click()
    }
  }

  return (
    <div style={{ padding: '2rem',}}>
      <h1>Seu Perfil de Fã 🎉</h1>
      
      <div  ref={profileRef} style={{
       backgroundImage: `url(${furiaLogo})`,
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat',
       backgroundColor: '#504e4ecf',
       borderRadius: '12px',
       padding: '40px',
       width: '300px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      marginTop: '1rem'
          }}>
            

        <p className="rgb-text" ><strong>Nome:</strong> {fanData.name}</p>
        <p className="rgb-text"><strong>Idade:</strong> {fanData.age}</p>
        <p className="rgb-text"><strong>Cidade:</strong> {fanData.address}</p>
        <p className="rgb-text"><strong>Instagram:</strong> {fanData.instagram}</p>

        <h2 className="rgb-text rgb-animated" style={{ marginTop: '2rem' }}>🏆 Você é: {fanProfile}</h2>

      </div>

       {/* Botões */}
    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
      <button onClick={generateImage}>Gerar Imagem do Meu Perfil</button>
    </div>

    </div>
  )
}

export default ResultPage