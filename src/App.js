import React, {useEffect, useState} from 'react';
import './App.css';
import Card from './components/Card/Card';

function App() {
    const staticTasks = [
        { id: 0, english: "happy", serbian: "srecan", img: "./images/happy.jpg" },
        { id: 1, english: "nice", serbian: "lijepo", img: "./images/nice.jpg" },
        { id: 2, english: "friend", serbian: "prijatelju", img: "./images/friend.jpg" },
        { id: 3, english: "explosion", serbian: "eksplizija", img: "./images/explosion.jpg" },
        { id: 4, english: "carrot", serbian: "sargarepa", img: "./images/carrot.jpg" },
        { id: 5, english: "car", serbian: "auto", img: "./images/car.jpg" },
        { id: 6, english: "soldier", serbian: "vojnik", img: "./images/soldier.jpg" },
        { id: 7, english: "fear", serbian: "strah", img: "./images/fear.jpg" },
        { id: 8, english: "relativity", serbian: "relativnost", img: "./images/relativity.jpg" },
        { id: 9, english: "book", serbian: "knjiga", img: "./images/book.jpg" },
        { id: 10, english: "Earth", serbian: "Zemlja", img: "./images/earth.jpg" },
        { id: 11, english: "speed limit", serbian: "ogranicenje brzine", img: "./images/speed_limit.jpg" }
    ];

    const [tasks, setTasks] = useState(staticTasks);

    // After every answer, shuffle the remaining tasks
    const [answered, setAnswered] = useState(false);
    useEffect(
        () => {
            setTasks(tasks.sort(() => Math.random() - 0.5));
            return setAnswered(false);
        },
        [answered]
    )
    
    // Choose the task that is sent into the Card component after every shuffle
    const [currentTask, setCurrentTask] = useState(tasks[0]);
    useEffect(
        () => {
            setCurrentTask(tasks[0]);
        },
        [tasks]
    )

    // Total count of tasks and state for correct answers
    const totalTaskCount = 12;
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
    
    // Once all tasks have been answered, reset the app to original state
    useEffect(
        () => {
            if (correctAnswerCount === totalTaskCount) {
                setTasks(staticTasks);
                setCurrentTask(tasks[0]);
                setTimeout(() => {
                    setCorrectAnswerCount(0);
                }, 2000)
            }
        },
        [correctAnswerCount]
    )

    return (
        <div className="App">
            <img src="/images/logo.png" alt="Logo" className='logo'/>
            {   
                (correctAnswerCount < totalTaskCount) ?
                <Card id={currentTask.id} english={currentTask.english} serbian={currentTask.serbian} img={currentTask.img} tasks={tasks} setTasks={setTasks} setAnswered={setAnswered} totalTaskCount={totalTaskCount} correctAnswerCount={correctAnswerCount} setCorrectAnswerCount={setCorrectAnswerCount} /> :
                <div className='finished'>
                    Congratulations! You finished the task!
                </div>
            }
        </div>
    );
}

export default App;
