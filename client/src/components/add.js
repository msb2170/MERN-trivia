import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Add(props) {
    const [question, setQuestion] = useState({
        question: "",
        answer: "",
    });
    const navigate = useNavigate();

    //update State props
    const updateQuestion = (value) => {
        return setQuestion((prev) => {
            return {...prev, ...value}
        });
    }
    //function to handle submissions
    async function onSubmit(e) {
        e.preventDefault();
    
        //when a post is sent to the add url, add a new question to the database
        const newQuestion = {...question};
    
        await fetch("https://mern-trivia.vercel.app/trivia/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestion),
        })
        .catch(err => {
            window.alert(err);
            return;
        });
    
        setQuestion({ question: "", answer: ""});
        navigate("/");
        
    }
    return (
        <div className={props.lightMode ? "add-container-light" : "add-container-dark"}>
            <h3 className='add-header'>Add Question</h3>
            <form onSubmit={onSubmit}>
                <div className={props.lightMode ? 'form-group-light' : 'form-group-dark'}>
                    <label htmlFor='questionText' id={props.lightMode ? 'question-label-light' : 'question-label-dark'}>Question: </label>
                    <input
                        type="text"
                        className='form-control'
                        id="questionText"
                        placeholder='Enter question text here:'
                        value={question.question}
                        onChange={(e) => updateQuestion({ question: e.target.value})}
                    />
                </div>
                <div className={props.lightMode ? 'form-group-light' : 'form-group-dark'}>
                    <label htmlFor='answerText' id={props.lightMode ? 'answer-label-light' : 'answer-label-dark'}>Answer: </label>
                    <input
                        type="text"
                        className='form-control'
                        id="answerText"
                        placeholder='Enter answer text here:'
                        value={question.answer}
                        onChange={(e) => updateQuestion({ answer: e.target.value})}
                    />
                </div>
                <br />
    
                <div className={props.lightMode ? 'form-group-light' : 'form-group-dark'}>
                    <input
                        type="submit"
                        value="Add Question"
                        className="btn-add"
                    />
                </div>
            </form>
        </div>
    );
}


