import React, {useState,useEffect} from "react";
import './schedule-style.css'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Schedule({}) {

    return (
        <div className="">
            <div className="parent grid-head">
                <div className="div1">№</div>
                <div className="div2">Время</div>
                <div className="div3">Понедельник</div>
                <div className="div4">Вторник</div>
                <div className="div5">Среда</div>
                <div className="div6">Четверг</div>
                <div className="div7">Пятница</div>
                <div className="div8 justify-content-between">
                    <div>
                        Дисциплина, вид занятия, преподаватель
                    </div>
                    <div>
                        Ауд.
                    </div>
                </div>
                <div className="div9 justify-content-between">
                    <div>
                        Дисциплина, вид занятия, преподаватель
                    </div>
                    <div>
                        Ауд.
                    </div>
                </div>
                <div className="div10 justify-content-between">
                    <div>
                        Дисциплина, вид занятия, преподаватель
                    </div>
                    <div>
                        Ауд.
                    </div>
                </div>
                <div className="div11 justify-content-between">
                    <div>
                        Дисциплина, вид занятия, преподаватель
                    </div>
                    <div>
                        Ауд.
                    </div>
                </div>
                <div className="div12 justify-content-between">
                    <div>
                        Дисциплина, вид занятия, преподаватель
                    </div>
                    <div>
                        Ауд.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Schedule;
