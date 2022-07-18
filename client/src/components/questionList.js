import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Question = (props) => (
    <tr>
        <td>{props.question.question}</td>
        <td>{props.question.answer}</td>
        <td>
            <Link className="btn link" to={`/edit/${props.question._id}`}>Edit</Link> |
            <button className="btn link"
                onClick={() => {
                    props.deleteQuestion(props.question._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function QuestionList() {
    const [questions, setQuestions] = useState([]);

    //fetch the questions from the database
    useEffect(() => {
        async function getQuestions() {
            const response = await fetch(`http://localhost:5000/trivia/`)

            if(!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const questions = await response.json();
            setQuestions(questions);
        }

        getQuestions()

        return;
    }, [questions.length]);

    //delete a question
    async function deleteQuestion(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        })

        const newQuestions = questions.filter((el) => el._id !== id);
        setQuestions(newQuestions);
    }

    //map out the questions on the table
    function questionList() {
        return questions.map((question) => {
            return (
                <Question
                    question={question}
                    deleteQuestion={() => deleteQuestion(question._id)}
                    key={question._id}
                />
            );
        });
    }

    //display the table with the questions
    return (
        <div>
            <h3>Question List</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{questionList()}</tbody>
            </table>
        </div>
    );
}