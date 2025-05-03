import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import questions from '../data/questions'
import furiaLogo from '../assets/images/furiaLogo.png'



function QuizPage() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])

  function handleAnswer(option) {
    setAnswers([...answers, option])

    const nextQuestion = currentQuestion + 1

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      // Acabaram as perguntas
      const fanData = JSON.parse(localStorage.getItem('fanData'))
      fanData.answers = answers.concat(option)
      localStorage.setItem('fanData', JSON.stringify(fanData))
      
      navigate('/result')
    }
  }

  const question = questions[currentQuestion]

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{  
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  padding: '1rem',
                  // border: '1px solid white',
              }}>
                <img  style={{ width: '10rem' }} src={furiaLogo} />
              </div>

      <h1>Quiz do Fã</h1>
      <h2 style={{ marginTop: '2rem' }}>{question.question}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {question.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuizPage