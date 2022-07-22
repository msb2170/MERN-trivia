import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Add() {
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
    
        await fetch("http://localhost:5000/trivia/add", {
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
        <div>
            <h3>Add Question</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor='questionText'>Question: </label>
                    <input
                        type="text"
                        className='form-control'
                        id="questionText"
                        value={question.question}
                        onChange={(e) => updateQuestion({ question: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='answerText'>Answer: </label>
                    <input
                        type="text"
                        className='form-control'
                        id="answerText"
                        value={question.answer}
                        onChange={(e) => updateQuestion({ answer: e.target.value})}
                    />
                </div>
                <br />
    
                <div className="form-group">
                    <input
                        type="submit"
                        value="Add Question"
                        className="btn submit"
                    />
                </div>
            </form>
        </div>
    );
}


