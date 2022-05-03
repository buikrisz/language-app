import React, { useEffect, useState } from 'react'
import './Card.css'
import Counter from '../Counter/Counter'

function Card({ id, english, serbian, img, tasks, setTasks, setAnswered, totalTaskCount, correctAnswerCount, setCorrectAnswerCount }) {
    
    // Making the input field a controlled component
    const [word, setWord] = useState("");
    function handleInput(e) {
        setWord(e.target.value);
    }

    // Choose from english/serbian version of the word randomly
    const [random, setRandom] = useState((Math.random() <= 0.5) ? 1 : 2);

    // Trigger useEffect after submit, check if the entered word is correct or not
    const [submitted, setSubmitted] = useState(false);
    useEffect(
        () => {
            if (submitted) {
                if (((random === 1) && (word.toLowerCase() === serbian.toLowerCase())) || ((random === 2) && (word.toLowerCase() === english.toLowerCase()))) {
                    setTasks([...tasks.slice(1)]);
                    setCorrectAnswerCount(correctAnswerCount + 1);
                } else {
                    setTasks([...tasks.slice(1), { id, english, serbian, img }])
                }
                setRandom((Math.random() <= 0.5) ? 1 : 2);
                setWord("")
                return setSubmitted(false) && setAnswered(true);
            }
        },
        [submitted]
    )

    return (
        <div className='card'>
            <form onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
            }}>
                <img src={img} alt="" />
                <h4>{(random === 1) ? english : serbian}</h4>
                <input type="text" name="word" id="word" value={word} onChange={handleInput} />
                <button>Let's see</button>
            </form>
            <div className='counters'>
                <Counter icon="up" count={correctAnswerCount} total={totalTaskCount} />
                <Counter icon="down" count={totalTaskCount - correctAnswerCount} total={totalTaskCount} />
            </div>
        </div>
    )
}

export default Card