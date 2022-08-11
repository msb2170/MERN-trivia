import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [question, setQuestion] = useState({
        question: "",
        answer: "",
        questions: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchQuestions() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/trivia/${params.id.toString()}`);

            if(!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const question = await response.json();
            if (!question) {
                window.alert(`Question with id ${id} not found`);
                navigate("/");
                return;
            }

            setQuestion(question);
        }

        fetchQuestions();

        return;
    }, [params.id, navigate]);

    //update the state properties
    function updateQuestion(value) {
        return setQuestion((prev) => {
            return {...prev, ...value};
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedQuestion = {
            question: question.question,
            answer: question.answer
        };

        //send a post request to update the data in the database
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedQuestion),
            headers: {
                "Content-Type": "application/json"
            },
        });

        navigate("/");
    }

    return (
        <div>
            <h3>Update Question</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor='questionText' id="question-label">Question: </label>
                    <input
                        type="text"
                        className='form-control'
                        id="questionText"
                        value={question.question}
                        onChange={(e) => updateQuestion({ question: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='answerText' id="answer-label">Answer: </label>
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
                        value="Update Question"
                        className="btn-add"
                    />
                </div>
            </form>
        </div>
    );
}
