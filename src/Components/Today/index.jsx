import { useEffect, useState } from "react";
import axios from "axios";

import GetUserContext from "../../contexts/GetUserContext";
import Header from "../Header";
import Footer from "../Footer";

import "./today.css";

function Today() {
    const [todayHabits, setTodayHabits] = useState([]);
    const [numberHabits, setNumberHabits] = useState({ total: 1, completed: 0 });
    const { globalData } = GetUserContext();
    const { token, url } = globalData;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const percentage = ((numberHabits.completed / numberHabits.total) * 100).toFixed(0);
    let completedNumber = 0;


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
    function updatePercentage(){
        if (todayHabits.length > numberHabits.total ||
            completedNumber !== numberHabits.completed) {
            setNumberHabits(
                { total: todayHabits.length, completed: completedNumber }
            );
        }
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
                <section className="page today-habits">
                    <Title percentage={percentage} completedNumber={numberHabits.completed}/>
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
                                <article key={id} className="today-habit">
                                    <section className="task">
                                        <h3>{name},{id}</h3>
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
                                    </section>
                                    <section className={`done-${done}`}
                                        onClick={() => { updateHabit(done, id, todayHabit) }}>
                                        <ion-icon name="checkmark-outline"></ion-icon>
                                    </section>
                                </article>
                            );
                        })
                    }
                </section>
            </div>
            <Footer globalData={globalData} />
        </>
    );
}
function Title(props){
    const{percentage, completedNumber}=props;
    return(
        completedNumber===0 ? 
        <h2 className="title-false">Nenhum hábito concluído ainda</h2>:
        <h2 className="text-true">{percentage}% dos hábitos concluídos</h2>
    );
}
export default Today;