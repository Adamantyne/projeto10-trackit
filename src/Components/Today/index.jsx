import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs'
import styled from 'styled-components';

import GetUserContext from "../../contexts/GetUserContext";
import Header from "../Header";
import Footer from "../Footer";

import "./today.css";

function Today() {
    const [todayHabits, setTodayHabits] = useState([]);
    const [numberHabits, setNumberHabits] = useState({ total: 1, completed: 0 });
    const { globalData,setGlobalData } = GetUserContext();
    const { token, url,percentage } = globalData;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const currentPercentage = ((numberHabits.completed / numberHabits.total) * 100).toFixed(0);
    let completedNumber = 0;

    const updateLocale = require('dayjs/plugin/updateLocale');
    dayjs.extend(updateLocale); 
    const todayDate = dayjs().format('dddd, DD/MM');
    dayjs.updateLocale('en', {
        weekdays: [
          "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
        ]
      })


    useEffect(() => {
        if (token.length > 0) {
            getTodayHabits();
        }
    }, [globalData]);

    function updateHabit(done, id, todayHabit) {
        if (done === false) {
            const promisse = axios.post(`${url}habits/${id}/check`, todayHabit, config);
            promisse.then(response => {
                getTodayHabits();
            });
            promisse.catch(error => { console.log(error.response); });
        }
        else {
            const promisse = axios.post(`${url}habits/${id}/uncheck`, todayHabit, config);
            promisse.then(response => {
                getTodayHabits();
            });
            promisse.catch(error => { console.log(error.response); });
        }
    }

    function updatePercentage() {
        if (todayHabits.length > numberHabits.total ||
            completedNumber !== numberHabits.completed) {
            setNumberHabits(
                { total: todayHabits.length, completed: completedNumber }
            );
        }
    }
    if(currentPercentage!==percentage && numberHabits.total=== todayHabits.length ){
        setTimeout(()=>{setGlobalData({...globalData,percentage:currentPercentage});},100);
    }

    function getTodayHabits() {
        const promisse = axios.get(`${url}habits/today`, config);
        promisse.then(response => {
            const data = response.data;
            setTodayHabits(data);
        });
        promisse.catch(error => { console.log(error.response); });
    }
    return (
        <>
            <Header globalData={globalData} />
            <div className="containerPage">
                <TodayHabits>
                    <TodayDate>{todayDate}</TodayDate>
                    <Title percentage={percentage} completedNumber={numberHabits.completed} />
                    {
                        todayHabits.map((todayHabit, index) => {
                            const { name, id, currentSequence, highestSequence, done } = todayHabit;
                            if (done) {
                                completedNumber++;
                            }
                            if (index === todayHabits.length - 1) {
                                updatePercentage();
                            }
                            return (
                                <TodayHabit key={id}>
                                    <TaskText
                                        name={name}
                                        done={done}
                                        currentSequence={currentSequence}
                                        highestSequence={highestSequence}
                                    />
                                    <IconCheck
                                        done={done}
                                        updateHabit={updateHabit}
                                        id={id}
                                        todayHabit={todayHabit}
                                    />
                                </TodayHabit>
                            );
                        })
                    }
                </TodayHabits>
            </div>
            <Footer />
        </>
    );
}
function Title(props) {
    const { percentage, completedNumber } = props;
    return (
        completedNumber === 0 ?
            <h2 className="title-false">Nenhum hábito concluído ainda</h2> :
            <h2 className="text-true">{percentage}% dos hábitos concluídos</h2>
    );
}
function TaskText(props) {
    const { name, done, currentSequence, highestSequence } = props;
    return (
        <Task>
            <h3>{name}</h3>
            <div className="sequence">
                <p>Sequência atual:
                    <strong className={` text-${done}`}>
                        {` ${currentSequence}`}
                        {currentSequence === 1 ? " dia" : " dias"}
                    </strong></p>
                <p>Seu recorde:
                    <strong className={` text-${done}`}>
                        {` ${highestSequence}`}
                        {highestSequence === 1 ? " dia" : " dias"}
                    </strong></p>
            </div>
        </Task>
    );
}
function IconCheck(props) {
    const { done, updateHabit, id, todayHabit } = props;
    return (
        <section className={`done-${done}`}
            onClick={() => { updateHabit(done, id, todayHabit) }}>
            <ion-icon name="checkmark-outline"></ion-icon>
        </section>
    );
}

const TodayHabits = styled.footer`
width: 100%;
    max-width: 375px;
    margin: 70px 0 70px 0;
    padding: 22px 17px 0 17px;
    display: flex;
    flex-direction: column;
h2{
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 28px;
}
`;
const TodayDate = styled.h1`
    font-size: 23px;
    line-height: 29px;
    color: #126BA5;
`;
const TodayHabit = styled.article`
width: 340px;
height: 94px;
background: #FFFFFF;
border-radius: 5px;
padding: 13px;
margin-bottom: 10px;
display: flex;
justify-content: space-between;
`;
const Task = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3{
        font-size: 20px;
        line-height: 25px;
        color: #666666;
    }
    p{
        font-size: 13px;
        line-height: 16px;
        color: #666666;
    }
`;

export default Today;