import React, {useState,useEffect} from "react";
import './filters-style.css'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';

function Filters({faculty, course, formEdu, setFaculty, setCourse, setFormEdu}) {

    const [allFaculty, setAllFaculty] = useState([]);
    const [allCourse, setAllCourse] = useState([]);
    const [allFormEdu, setAllFormEdu] = useState([]);


    useEffect(() => {

        Promise.all([ // Используйте Promise.all для одновременной загрузки данных
            fetch(`http://schedule.back/main.php?inc=faculty`, {
                method: "GET"
            }),
            fetch(`http://schedule.back/main.php?inc=course`, {
                method: "GET"
            }),
            fetch(`http://schedule.back/main.php?inc=form_edu`, {
                method: "GET"
            }),
        ])
            .then(([facultyRes, courseRes, formEduRes]) => Promise.all([
                facultyRes.text(),
                courseRes.text(),
                formEduRes.text()
            ]))
            .then(([facultyText, courseText, formEduText]) => Promise.all([
                JSON.parse(facultyText),
                JSON.parse(courseText),
                JSON.parse(formEduText)
            ]))
            .then(([facultyData, courseData, formEduData]) => {
                setAllFaculty(facultyData);
                setAllCourse(courseData);
                setAllFormEdu(formEduData);
            })
            .catch(error => console.error('Ошибка загрузки данных:', error))
    }, []);
    allCourse.sort((a, b) => {
        return a.course - b.course;
    })
    return (
        <div className="App">
            <div>
                <Row>
                    <Col className={'col-2'}>
                        <Form.Select aria-label="Default select example"  value={faculty} onChange={(e) => setFaculty(e.target.value)}>
                            <option value={'all'}>Все Факультеты</option>
                            {
                                allFaculty.map((obj, index) => (
                                    <option
                                        key={index}
                                        value={obj.faculty}
                                    >
                                        {obj.faculty}
                                    </option>
                                ))
                            }
                        </Form.Select>

                    </Col>
                    <Col className={'col-2'}>
                        <Form.Select aria-label="Default select example" value={formEdu} onChange={(e) => setFormEdu(e.target.value)}>
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
                    <Col className={'col-2'}>
                        <Form.Select aria-label="Default select example" value={course} onChange={(e) => setCourse(e.target.value)}>
                            <option>Курс</option>
                            {
                                allCourse.map((obj, index) => (
                                    <option key={index} value={obj.course}>
                                        {obj.course === 6 ? 'М1' : obj.course}
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </Col>
                    <Col className={'col-2'}>
                        <Button variant="danger">Применить</Button>{' '}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Filters;
