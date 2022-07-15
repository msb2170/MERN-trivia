import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [question, setQuestion] = useState({
        questionText: "",
        answerText: "",
        questions: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchQuestions() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/questions/${params.id.toString()}`);

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
            questionText: question.questionText,
            answer: question.answerText
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
                    <label htmlFor='questionText'>Question: </label>
                    <input
                        type="text"
                        className='form-control'
                        id="questionText"
                        value={question.questionText}
                        onChange={(e) => updateQuestion({ questionText: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='answerText'>Answer: </label>
                    <input
                        type="text"
                        className='form-control'
                        id="answerText"
                        value={question.answerText}
                        onChange={(e) => updateAnswer({ answerText: e.target.value})}
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
