import "./historic.css"
import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../Header";
import Footer from "../Footer";

import GetUserContext from "../../contexts/GetUserContext";

function Historic() {
    const [historic, setHistoric] = useState([]);
    const { globalData } = GetUserContext();
    const { token, url } = globalData;
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        if (token.length > 0) {
            getHistoric();
        }
    }, [globalData]);


    function getHistoric() {
        const promisse = axios.get(`${url}habits/history/daily`, config);
        promisse.then(response => {
            const data = response.data;
            setHistoric(data);
        });
        promisse.catch(error => { console.log(error.response); });
    }

    return (
        <>
            <Header globalData={globalData} />
            <div className="containerPage">
                <section className="page historic">
                    <h1>Histórico</h1>
                    {
                        historic.length === 0 ?
                            <p className="no-historic">
                                Em breve você poderá ver o histórico dos seus hábitos aqui!
                            </p> :
                            <>{historic.map(days => {
                                const { day, habits } = days;
                                return (
                                    <div key={day} className="historic-info">
                                        <HistoricDays day={day} habits={habits}/>
                                    </div>
                                );
                            })}</>
                    }
                </section>
            </div>
            <Footer globalData={globalData} />
        </>
    );
}
function HistoricDays(props) {
    const { day, habits } = props;
    return (
        <>
            <h2>{day}</h2>
            {habits.map(habit => {
                const { done, name, id, weekDay } = habit;
                return (
                    <Habit
                        key={id}
                        name={name}
                        done={done}
                        weekDay={weekDay}
                        weekDayName={weekDayName}
                    />
                );
            })}
        </>
    );
}
function Habit(props) {
    const { name, done, weekDay,weekDayName } = props
    let status = "";
    if(done){
        status="Feito";
    }
    else status="Não feito"
    return (
        <section className={`historic-habit historic-${done}`}>
            <h2>{name}</h2>
            <p>Dia: {weekDayName(weekDay)}</p>
            <strong>{status}</strong>
        </section>
    );
}
function weekDayName(weekDay){
    let day ="";
    switch(weekDay){
        case 0: day = "domingo";
        break;
        case 1: day = "segunda";
        break;
        case 2: day = "terça";
        break;
        case 3: day = "quarta";
        break;
        case 4: day = "quinta";
        break;
        case 5: day = "sexta";
        break;
        case 6: day = "sábado";
        break;
    }
    return day;
}
export default Historic;