import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// Se estiver usando Vite, crie um .env com VITE_OCR_API_KEY=35ef9f4f1a88957
const OCR_API_KEY = '35ef9f4f1a88957'

function DocumentUploadPage() {
  const navigate = useNavigate()
  const [fanData, setFanData] = useState(null)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('fanData'))
    if (!data) {
      navigate('/')  // volta ao início se não tiver registro ainda
    } else {
      setFanData(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setError('')
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Selecione um arquivo antes de enviar.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('apikey', OCR_API_KEY)
      formData.append('language', 'por')

      const resp = await axios.post(
        'https://api.ocr.space/parse/image',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      const results = resp.data.ParsedResults
      if (!results || results.length === 0) {
        throw new Error('Nenhum resultado de OCR retornado.')
      }

      const text = results[0].ParsedText || ''
      console.log('Texto extraído:', text)

      const cleanedText = text.replace(/\s+/g, ' ').trim()
      const cpfMatch = cleanedText.match(/\d{3}[.\s]?\d{3}[.\s]?\d{3}[-\s]?\d{2}/)

      if (!cpfMatch) {
        setError('Não foi possível encontrar um CPF válido no documento.')
        return
      }

      const docCpf = cpfMatch[0].replace(/\D/g, '')
      const userCpf = fanData.cpf.replace(/\D/g, '')

      if (docCpf !== userCpf) {
        setError('O CPF do documento não confere com o informado.')
      } else {
        navigate('/social')
      }
    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.ErrorMessage ||
        err.message ||
        'Erro ao processar o documento. Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!fanData) return null

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Validação de Documento</h1>
      <p>Envie uma foto do seu RG/CPF para validar seu cadastro.</p>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#444',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Validando...' : 'Enviar e Validar'}
      </button>
    </div>
  )
}

export default DocumentUploadPage