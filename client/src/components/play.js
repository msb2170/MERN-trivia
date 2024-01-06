import React, { useState, useEffect } from 'react';


export default function Play(props) {
    const [singleQuestion, setSingleQuestion] = useState([]) //state variable for the question we'll answer
    const [refresh, setRefresh] = useState(true) //we want to answer this question and then later refresh and pull another question
    const [userAnswer, setUserAnswer] = useState('')

    useEffect(() => {
        async function getQuestion() {
            setRefresh(false)

            const response = await fetch(`https://mern-trivia.vercel.app/`)

            if(!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const questions = await response.json();
            const question = questions[Math.floor(Math.random() * questions.length)];
            setSingleQuestion(question);
        }

        getQuestion()

        return;
    }, [refresh]);


    function handleSubmit(event) {
        event.preventDefault();
        if (userAnswer === singleQuestion.answer) {
            alert("Correct!");
        } else {
            alert(`Sorry, but the correct answer was "${singleQuestion.answer}"`);
        }
        setUserAnswer('')
        
        setRefresh(true)

        event.target.reset();
        
    }


    return (
    <div className={props.lightMode ? 'question-container-light' : 'question-container-dark'}>
        <h1>{singleQuestion.question}</h1>
        <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            id="answer-field" 
            placeholder="Enter Answer Here" 
            onChange={(e) => setUserAnswer(e.target.value)}>
        </input>
        <input type="submit" id="submit-btn" />
        </form>
    </div>
    )
}
