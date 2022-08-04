import React, { useState, useEffect } from 'react';


export default function Play() {
    const [singleQuestion, setSingleQuestion] = useState([]) //state variable for the question we'll answer
    const [refresh, setRefresh] = useState(true) //we want to answer this question and then later refresh and pull another question

    useEffect(() => {
        async function getQuestion() {
            setRefresh(false)

            const response = await fetch(`http://localhost:5000/trivia/`)

            if(!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const questions = await response.json();
            const question = questions[0]
            setSingleQuestion(question);
        }

        getQuestion()

        return;
    }, [refresh]);

    


    return (
        <h1>{singleQuestion.question}</h1>
    )
}
