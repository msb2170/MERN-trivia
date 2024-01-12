import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit(props) {
    const params = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState({
        question: "",
        answer: "",
        id: params.id
    });

    useEffect(() => {
        async function fetchQuestions() {
            const id = params.id.toString();
            const response = await fetch(`https://mern-trivia.vercel.app/trivia/${params.id.toString()}`);

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

        //send a patch request to update the data in the database
        
        await fetch(`https://mern-trivia.vercel.app/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(editedQuestion),
            headers: {
                "Content-Type": "application/json"
            },
        });
        console.log(params.id)
        navigate("/");
    }

    return (
        <div>
            <h3 className={props.lightMode ? "edit-header-light" : "edit-header-dark"}>Update Question</h3>
            <form onSubmit={onSubmit}>
                <div className={props.lightMode ? "form-group-light" : "form-group-dark"}>
                    <label htmlFor='questionText' id={props.lightMode ? 'question-label-light' : 'question-label-dark'}>Question: </label>
                    <input
                        type="text"
                        className='form-control'
                        id="questionText"
                        value={question.question}
                        onChange={(e) => updateQuestion({ question: e.target.value})}
                    />
                </div>
                <div className={props.lightMode ? "form-group-light" : "form-group-dark"}>
                    <label htmlFor='answerText' id={props.lightMode ? "answer-label-light" : "answer-label-dark"}>Answer: </label>
                    <input
                        type="text"
                        className='form-control'
                        id="answerText"
                        value={question.answer}
                        onChange={(e) => updateQuestion({ answer: e.target.value})}
                    />
                </div>
                <br />
    
                <div className={props.lightMode ? "form-group-light" : "form-group-dark"}>
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
