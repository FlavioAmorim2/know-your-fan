import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import furiaLogo from '../assets/images/furiaLogo.png'



function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '')
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
  
  const calc = (t) => {
    let sum = 0
    for (let i = 0; i < t - 1; i++) {
      sum += parseInt(cpf.charAt(i)) * (t - i)
    }
    let d = (sum * 10) % 11
    if (d === 10) d = 0
    return d === parseInt(cpf.charAt(t - 1))
  }
  return calc(10) && calc(11)
}

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    age: '',
    instagram: '',
    email: '',
    address: '',
    cpf: '',
    history: '',
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}

    // Validações
    if (!form.name.trim()) errs.name = 'Nome é obrigatório.'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = 'Email inválido.'
    if (!validateCPF(form.cpf))
      errs.cpf = 'CPF inválido.'
    if (!form.address.trim()) errs.address = 'Endereço é obrigatório.'
    if (!form.history.trim())
      errs.history = 'Informe eventos/atividades recentes.'

    setErrors(errs)
    if (Object.keys(errs).length) return

    // Salvar no localStorage
    const fanData = {
      ...form,
      age: Number(form.age),
      answers: [],
    }
    localStorage.setItem('fanData', JSON.stringify(fanData))
    navigate('/upload')
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', }}>
      <div  style={{  
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '1rem',
            // border: '1px solid white',            
        }}>

          <div style={ {borderRadius: '50%', backgroundColor: 'white'} }><img  style={{ width: '10rem', }} src={furiaLogo} /> </div>

        </div>

      <h1>Cadastro do Fã</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <input
          name="name"
          type="text"
          placeholder="Nome completo"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}

        <input
          name="age"
          type="number"
          placeholder="Idade"
          value={form.age}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

        <input
          name="cpf"
          type="text"
          placeholder="CPF (somente números)"
          maxLength={14}
          value={form.cpf}
          onChange={handleChange}
        />
        {errors.cpf && <span style={{ color: 'red' }}>{errors.cpf}</span>}

        <input
          name="instagram"
          type="text"
          placeholder="Instagram (@usuario)"
          value={form.instagram}
          onChange={handleChange}
        />

        <input
          name="address"
          type="text"
          placeholder="Sua cidade"
          value={form.address}
          onChange={handleChange}
        />
        {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}

        <textarea
          name="history"
          placeholder="Fale sobre você (Eventos / atividades / compras no último ano)"
          rows={3}
          value={form.history}
          onChange={handleChange}
        />
        {errors.history && <span style={{ color: 'red' }}>{errors.history}</span>}

        <button type="submit">Começar Quiz</button>
      </form>
    </div>
  )
}

export default RegisterPage