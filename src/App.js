import './App.css';
import React, {useState,useEffect} from "react";
import Container from "react-bootstrap/Container";
import Filters from "./Filters/Filters";
import Schedule from "./Schedule/Schedule";


function App() {

    const [atrib, setAtrib] = useState('')
    const [schedule, setSchedule] = useState([])
    const [faculty, setFaculty] = useState('all')
    const [course, setCourse] = useState(0)
    const [formEdu, setFormEdu] = useState(0)



    function getAllData() {
        fetch('http://schedule.back/main.php?inc=all    ', {
            method: "GET"
        })
            .then(res => res.text())
            .then(res => {
                const data = JSON.parse(res)
                console.log(data);
                setSchedule(data)
            })
            .catch(error => console.error('Ошибка:', error));
    }
    const daysOfWeek = {
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
        7: 'Воскресенье'
    };

  return (
    <div className="App">
        <Container className={'mw-100'}>
        <div>
            <Filters
                faculty={faculty}
                course={course}
                formEdu={formEdu}
                setFaculty={setFaculty}
                setCourse={setCourse}
                setFormEdu={setFormEdu}
            />
        </div>
        <div>
            <Schedule/>
        </div>
      <button onClick={getAllData}>Получить все группы</button>
        <p>
            Расписание:
            <br/>
            {schedule.map((item, index) => (
                <div key={index}>
                    <h2>{daysOfWeek[item.weekday]} - Пара {item.time}</h2>
                    <p><strong>Предмет:</strong> {item.subject}</p>
                    <p><strong>Тип:</strong> {item.type}</p>
                    <p><strong>Время:</strong> {item.time_start} - {item.time_end}</p>
                    <p><strong>Аудитория:</strong> {item.auditory_name}</p>
                    <p><strong>Преподаватель:</strong> {item.teacher_name}</p>
                </div>
            ))}
        </p>
        </Container>
    </div>
  );
}

export default App;
