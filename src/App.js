import './App.css';
import {useState} from "react";

function App() {
    const [schedule, setSchedule] =useState([])
    
    function getAllData() {
        fetch('http://schedule.back/main.php?inc=faculty', {
            method: "GET"
        })
            .then(res => res.text())
            .then(res => {
                console.log(res);
                setSchedule(res)
            })
            .catch(error => console.error('Ошибка:', error));
    }
  return (
    <div className="App">
      <button onClick={getAllData}>Нажми</button>

    </div>
  );
}

export default App;
