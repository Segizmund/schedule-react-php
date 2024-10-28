import './App.css';
import {useState} from "react";
import React, {useEffect} from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function App() {
    const atr =[
        {
            "name": "Факультет",
            "value": "faculty"
        },
        {
            "name": "Курс",
            "value": "course"
        },
        {
            "name": "Форма Обучения",
            "value": "form_edu"
        }
    ]
    const [atrib, setAtrib] = useState('')
    const [schedule, setSchedule] =useState([])
    const [faculty, setFaculty] =useState(0)
    const [course, setCourse] =useState(0)
    const [formEdu, setFormEdu] =useState(0)

    const [allFaculty, setAllFaculty] = useState([])
    const [allCourse, setAllCourse] = useState([])
    const [allFormEdu, setAllFormEdu] =useState([])

    useEffect(() => {

        fetch(`http://schedule.back/main.php?inc=faculty`, {
            method: "GET"
        })
            .then(res => res.text())
            .then(res => {
                const data = JSON.parse(res);
                setAllFaculty(data);
            })
            .catch(error => console.error('Ошибка загрузки факультетов:', error));

        fetch(`http://schedule.back/main.php?inc=course`, {
            method: "GET"
        })
            .then(res => res.text())
            .then(res => {
                const data = JSON.parse(res)
                setAllCourse(data);
            })
            .catch(error => console.error('Ошибка загрузки курсов:', error));

        fetch(`http://schedule.back/main.php?inc=form_edu`, {
            method: "GET"
        })
            .then(res => res.text())
            .then(res => {
                const data = JSON.parse(res);
                setAllFormEdu(data);
            })
            .catch(error => console.error('Ошибка загрузки форым обучения:', error));
    },[allFaculty])

    function getAllData() {
        fetch('http://schedule.back/main.php?inc=all    ', {
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
                if(atrib == 'faculty') {setFaculty(res); console.log(faculty);}
                if(atrib == 'course') {setCourse(res);console.log(res);}
                if(atrib == 'form_edu') {setFormEdu(res)}
            })
            .catch(error => console.error('Ошибка:', error));
    }
    allCourse.sort((a, b) => {
        return a.course - b.course;
    })
  return (
    <div className="App">
        <div>
            <Row>
                <Col>
                    <Form.Select aria-label="Default select example">
                        <option>Все Факультеты</option>
                        {
                            allFaculty.map((obj, index) => (
                            <option key={index} value={obj.faculty}>
                        {obj.faculty}
                    </option>
                    ))
                        }


                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example">
                        <option>Форма обучения</option>
                        {
                            allFormEdu.map((obj, index) => (
                                <option key={index} value={obj.form_edu}>
                                    {obj.form_edu}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example">
                        <option>Курс</option>
                        {
                            allCourse.map((obj, index) => (
                                <option key={index} value={obj.course}>
                                    {obj.course}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Col>
            </Row>
        </div>
      <button onClick={getAllData}>Получить все группы</button>
      <button onClick={getForAtrib}>Получить все Факультеты</button>
        <ul>
        {
            atr.map((obj,index)=> (
                <button key={index} onClick={() => {setAtrib(obj.value);getForAtrib(atrib);}}>
                    {obj.name}
                </button>
            ))
        }
        </ul>
    </div>
  );
}

export default App;
