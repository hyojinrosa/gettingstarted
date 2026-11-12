import { useState } from 'react'
import './App.css'

const questions = [
  { statement: '웹 앱은 인터넷 브라우저에서 실행할 수 있어요.', answer: true, explanation: '웹 앱은 크롬이나 사파리 같은 브라우저에서 사용할 수 있어요.' },
  { statement: 'HTML은 웹 페이지의 뼈대와 내용을 만드는 데 사용해요.', answer: true, explanation: 'HTML로 제목, 문단, 버튼처럼 페이지에 들어갈 요소를 만들어요.' },
  { statement: 'CSS는 웹 페이지의 색상이나 모양을 꾸밀 수 없어요.', answer: false, explanation: 'CSS는 글자 색, 간격, 배치 등 웹 페이지의 디자인을 담당해요.' },
  { statement: 'AI는 데이터를 학습해 질문에 답하거나 글을 만들 수 있어요.', answer: true, explanation: 'AI는 학습한 패턴을 바탕으로 답변이나 글 같은 결과를 만들 수 있어요.' },
  { statement: 'AI가 만든 답변은 언제나 사실이라고 믿어도 돼요.', answer: false, explanation: 'AI도 틀릴 수 있으니 중요한 정보는 믿을 만한 자료로 확인해야 해요.' },
]

function App() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const finished = questionIndex >= questions.length
  const question = questions[questionIndex]
  const selected = answers[questionIndex]
  const score = answers.reduce((total, answer, index) => total + (answer === questions[index].answer ? 1 : 0), 0)

  function choose(answer: boolean) {
    if (selected !== undefined) return
    setAnswers((current) => [...current, answer])
  }

  function restart() {
    setQuestionIndex(0)
    setAnswers([])
  }

  return (
    <main className="page-shell">
      <header className="topbar"><a className="brand" href="#top" aria-label="한입 퀴즈 홈"><span className="brand-mark">Q</span> 한입 퀴즈</a><span className="top-note">오늘의 작은 지식 한 조각</span></header>
      <section className="quiz-wrap" id="top">
        <div className="eyebrow"><span className="eyebrow-dot" /> 웹 &amp; AI 기초</div>
        {finished ? (
          <section className="result-card" aria-live="polite">
            <div className="result-icon">✦</div><p className="result-kicker">QUIZ COMPLETE</p>
            <h1>참 잘했어요!</h1><p className="result-copy">웹과 AI에 대해 한 걸음 더 알게 됐어요.</p>
            <div className="score-box"><span>나의 점수</span><strong>{score}<small> / 5</small></strong><div className="score-track"><span style={{ width: `${score * 20}%` }} /></div></div>
            <button className="primary-button restart-button" onClick={restart}>다시 풀기 <span aria-hidden="true">↻</span></button>
          </section>
        ) : (
          <>
            <div className="heading-row"><div><p className="section-kicker">가볍게 풀어보는</p><h1>웹 &amp; AI 퀴즈</h1></div><div className="round-badge">OX <span>QUIZ</span></div></div>
            <p className="intro">맞다고 생각하면 O, 아니면 X를 골라보세요.<br />정답과 함께 간단한 설명도 알려드릴게요.</p>
            <div className="progress-area"><div className="progress-meta"><span>오늘의 퀴즈</span><span><b>{questionIndex + 1}</b> <i>/</i> {questions.length}</span></div><div className="progress-track"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div></div>
            <article className="question-card" key={questionIndex}>
              <div className="question-number">QUESTION <b>{String(questionIndex + 1).padStart(2, '0')}</b></div>
              <h2>{question.statement}</h2>
              <div className="answer-buttons" aria-label="답 선택">
                <button className={`answer-button answer-o ${selected === true ? (question.answer ? 'is-correct' : 'is-wrong') : ''}`} onClick={() => choose(true)} disabled={selected !== undefined} aria-label="O, 맞아요"><span>O</span><small>맞아요</small></button>
                <button className={`answer-button answer-x ${selected === false ? (!question.answer ? 'is-correct' : 'is-wrong') : ''}`} onClick={() => choose(false)} disabled={selected !== undefined} aria-label="X, 아니에요"><span>X</span><small>아니에요</small></button>
              </div>
              {selected !== undefined && <div className={`feedback ${selected === question.answer ? 'feedback-correct' : 'feedback-wrong'}`} role="status"><div className="feedback-title">{selected === question.answer ? '정답이에요!' : '아쉬워요, 정답은 ' + (question.answer ? 'O' : 'X') + '예요.'}</div><p>{question.explanation}</p></div>}
              <button className="primary-button next-button" onClick={() => setQuestionIndex((index) => index + 1)} disabled={selected === undefined}>{questionIndex === questions.length - 1 ? '결과 확인하기' : '다음 문제'} <span aria-hidden="true">→</span></button>
            </article>
            <p className="footer-note"><span>✳</span> 정답을 골라야 다음 문제로 넘어갈 수 있어요.</p>
          </>
        )}
      </section>
      <footer>작은 호기심이 쌓여 큰 지식이 돼요 <span>·</span> 한입 퀴즈</footer>
    </main>
  )
}

export default App
