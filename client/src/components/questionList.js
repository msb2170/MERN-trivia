import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";


const Question = (props) => (
    
    <tr>
        <td>{props.question.question}</td>
        <td className={props.showAnswer ? null : "answer-line-hide"}>{props.question.answer}</td>
        <td>
           <button className="btn-link"><Link className='edit-link' to={`/edit/${props.question._id}`}>Edit</Link></button>
           <span className="action-vertical-line">|</span>  
            <button className="btn-link"
                onClick={() => {
                   props.deleteQuestion(props.question._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function QuestionList(props) {
    const [questions, setQuestions] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false)

    //fetch the questions from the database
    useEffect(() => {
        async function getQuestions() {
            const response = await fetch(`https://mern-trivia.vercel.app/trivia/`)

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

    //toggle show/hide Answers
    function toggleAnswers() {
    
        if (!showAnswer) {
            setShowAnswer(true);
        }
        if (showAnswer) {
            setShowAnswer(false);
        }
    }

    //delete a question
    async function deleteQuestion(id) {
        await fetch(`https://mern-trivia.vercel.app/trivia/${id}`, {
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
                    showAnswer={showAnswer}
                    className="question"
                />
                
            );
        });
    }

    //display the table with the questions
    return (
        <div>
            <h3 className={props.lightMode ? 'table-header-light' : 'table-header-dark'}>Question List</h3>
            <button className='show-button' onClick={toggleAnswers}>Show/Hide Answers</button>
            <table className={props.lightMode ? 'table-light' : 'table-dark'}>
                <thead>
                    <tr className='table-content'>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {questionList()}
                </tbody>
            </table>
        </div>
    );
}