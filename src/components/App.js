import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  function handleNewQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function handleDelete(updatedQuestion) {
    const updatedQuestions = questions.filter(question => question.id !== updatedQuestion.id)
    setQuestions(updatedQuestions)
  }
  
  function handleUpdate(updatedQuestion) {
    const updatedQuestions = questions.map(question => {
      return question.id === updatedQuestion.id ? updatedQuestion : question
    })
    setQuestions(updatedQuestions)
  }

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(questionData => setQuestions(questionData))
  },[]);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ?
      <QuestionForm onFormSubmit={handleNewQuestion} /> :
      <QuestionList questions={questions} onDeleteQuestion={handleDelete} onUpdateQuestion={handleUpdate} />}
    </main>
  );
}

export default App;
