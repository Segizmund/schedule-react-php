import './App.css';
import {useState} from "react";
import React from ".";

function App() {
    const atr =['faculty', 'course', 'form_edu']
    const [atrib, setAtrib] = useState('')
    const [schedule, setSchedule] =useState([])
    const [faculty, setFaculty] =useState([])

    function getAllData() {
        fetch('http://schedule.back/main.php?inc=all', {
            method: "GET"
        })
            .then(res => res.text())
            .then(res => {
                console.log(res);
                setSchedule(res)
            })
            .catch(error => console.error('Ошибка:', error));
    }
    function getForAtrib(atrib) {
        fetch(`http://schedule.back/main.php?inc=${atrib}`, {
            method: "GET"
        })
            .then(res => res.text())
            .then(res => {
                console.log(res);
                setFaculty(res)
            })
            .catch(error => console.error('Ошибка:', error));
    }
  return (
    <div className="App">
      <button onClick={getAllData}>Получить все группы</button>
      <button onClick={getForAtrib}>Получить все Факультеты</button>
        <ul>
        {
            atr.map((obj,index)=> (
                <button key={index} onClick={() => {setAtrib(obj);getForAtrib(atrib);}}>
                    {obj}
                    {console.log(atrib)}
                </button>
            ))
        }
        </ul>
    </div>
  );
}

export default App;
