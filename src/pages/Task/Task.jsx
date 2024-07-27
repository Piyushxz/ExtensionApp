import { useEffect, useState } from "react";
import { useBrowser } from "../../context/browser-context"
import "./Task.css"
import {quotes} from "../../db/quotes"
import { Todo } from "../../components/Todo";
const index  = Math.floor(Math.random() * quotes.length);
const quote = quotes[index].quote
export const Task = () =>{
    const [isChecked,setIsChecked] = useState(false);
    const [isTodoOpen,setIsTodoOpen] = useState(false);
    const {time ,message,name,task, browserDispatch} = useBrowser();

    useEffect(() => {
        const userTask = localStorage.getItem("task");
        browserDispatch({
            type: "TASK",
            payload: userTask
        });
    
        if (new Date().getDate() !== Number(localStorage.getItem("date"))) {
            localStorage.removeItem("task");
            localStorage.removeItem("date");
            localStorage.removeItem("checkedStatus");
        }
    }, []);

    useEffect(()=>{
        const checkStatus = localStorage.getItem("checkedStatus")
        checkStatus === 'true' ? setIsChecked(true) : setIsChecked(false)
    },[])
    useEffect(()=>{
        getCurrentTime();
    },[time])

    const getCurrentTime = () =>{
        const today = new Date();
        const hours = today.getHours();
        const minutes = today.getMinutes();

        const hour = hours < 10 ? `0${hours}` : hours;
        const minute = minutes < 10 ? `0${minutes}` : minutes;   
        
        const currentTime = `${hour} : ${minute}`
        setTimeout(getCurrentTime,1000);

        browserDispatch({
            type:"TIME",
            payload : currentTime
        })
        browserDispatch({
            type:"MESSAGE",
            payload:hours
        })
    }
    const handleTaskChange = (event) => {
        if (event.key === "Enter" && event.target.value.length > 0) {
            browserDispatch({
                type: "TASK",
                payload: event.target.value
            });
            localStorage.setItem("task", event.target.value);
            const today = new Date();
            localStorage.setItem("date", today.getDate().toString());
        }
    }
    const handleFormSubmit = (e) =>{
        e.preventDefault();

    }

    const handleCompleteTaskChange = (e) =>{
        if(e.target.checked){
            setIsChecked(isChecked=>!isChecked)
        }else{
            setIsChecked(isChecked=>!isChecked)
        }
        localStorage.setItem("checkedStatus",!isChecked);
    }

    const handleClearClick = () =>{
        browserDispatch({
            type:"CLEAR"
        })
        setIsChecked(false);
        localStorage.removeItem("task");
        localStorage.removeItem("checkedStatus")
    }

    const handleTodoClick = () =>{
        setIsTodoOpen(isTodoOpen=> !isTodoOpen)
    }
    return(
        <div className="task-container d-flex direction-column align-center">
            <span className="time">{time}</span>
            <span className="message">{message},{name}</span>
            {name !== null&& task === null ? (
                <>
                    <span className="focus-question">what is your main focus for today?</span>
                    <form onSubmit={handleFormSubmit}>
                         <input required className="input task-ip" onKeyPress={handleTaskChange}/>
                    </form>
                </>
            ) : (
            <div className="user-task-container">
            <span className="heading-2">Today's Focus</span>
            <div className="d-flex align-center gap">
               
                <label className={`${isChecked ? "strike-through " :"" }heading-3 d-flex align-center gap-sm`}> <input 
                onChange={handleCompleteTaskChange} checked={isChecked}
                className="check"type="checkbox"/>{task}</label>
                <button  onClick={handleClearClick}
                className="button cursor"><span className="material-icons-outlined">clear</span></button>
            </div>
            
            </div>
            )}
            <div className="quote-container">
                <span className="heading-3">{quote}</span>
            </div>
            {isTodoOpen && <Todo/>}
            <div className="todo-btn-container absolute">
                <button onClick={handleTodoClick} className="button cursor todo-btn">Todo</button>
            </div>

            

        </div>
        
    )
}