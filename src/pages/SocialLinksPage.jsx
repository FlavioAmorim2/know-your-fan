import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SocialLinksPage() {
  const navigate = useNavigate()
  const [fanData, setFanData] = useState(null)
  const [form, setForm] = useState({ instagramUrl: '', twitterUrl: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('fanData'))
    if (!data) return navigate('/')
    setFanData(data)
  }, [navigate])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    await new Promise((r) => setTimeout(r, 1500))

    const socialData = {
      instagram: {
        url: form.instagramUrl,
        followers: Math.floor(Math.random() * 5000) + 100,
        posts: Math.floor(Math.random() * 200),
      },
      twitter: {
        url: form.twitterUrl,
        followers: Math.floor(Math.random() * 10000) + 500,
        tweets: Math.floor(Math.random() * 1000),
      },
    }

    const updated = { ...fanData, socialData }
    localStorage.setItem('fanData', JSON.stringify(updated))

    // Avança para o quiz
    navigate('/quiz')
  }

  if (!fanData) return null

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Vincule suas Redes Sociais</h1>
      <p>Insira os links do seu Instagram e Twitter para analisarmos suas interações.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <input
          name="instagramUrl"
          type="url"
          placeholder="https://instagram.com/seu_usuario"
          value={form.instagramUrl}
          onChange={handleChange}
          required
        />
        <input
          name="twitterUrl"
          type="url"
          placeholder="https://twitter.com/seu_usuario"
          value={form.twitterUrl}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Analisando...' : 'Continuar para o Quiz'}
        </button>
      </form>
    </div>
  )
}

export default SocialLinksPage
