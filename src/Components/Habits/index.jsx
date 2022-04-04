import axios from "axios";
import { useEffect, useState } from "react";
import GetUserContext from "../../contexts/GetUserContext";

import Footer from "../Footer";
import Header from "../Header";
import CreatingHabits from "./CreatingHabits";
import CreatedHabits from "./CreatedHabits";
import styled from 'styled-components';
import "./habits.css";

function Habits() {
    const [habitsList, setHabitsList] = useState([]);
    const { globalData } = GetUserContext();
    const { token, url } = globalData;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        if (token.length > 0) {
            const promisse = axios.get(`${url}habits`, config);
            promisse.then(response => {
                const data = response.data;
                setHabitsList(data);
            });
            promisse.catch(error => { console.log(error.response); });
        }
    }, [globalData]);


    function excludingHabit(currentID, name) {
        const choice = window.confirm(`deseja mesmo excluir o hábito "${name}" ?`);
        if (choice === true) {
            const promisse = axios.delete(`${url}habits/${currentID}`, config);
            promisse.then(response => {
                const deleted = habitsList.filter(habit => {
                    if (habit.id !== currentID) {
                        return true;
                    }
                    return false;
                });
                setHabitsList(deleted);
            });
            promisse.catch(error => { console.log(error.response); });
        }
    }

    return (
        <div className="containerPage">
            <Header globalData={globalData} />
            <section className="page">
                <CreatingHabits habitsList={habitsList} setHabitsList={setHabitsList} config={config} />
                {
                    habitsList.length === 0 ?
                        <NoAbits className="no-habits">Você não tem nenhum hábito cadastrado ainda.
                            Adicione um hábito para começar a trackear!
                        </NoAbits>
                        :
                        <>
                            {habitsList.map(habit => {
                                const { id, name, days } = habit;
                                return (
                                    <CreatedHabits
                                        key={id}
                                        id={id}
                                        name={name}
                                        days={days}
                                        excludingHabit={excludingHabit}
                                    />
                                );
                            })}
                        </>
                }
            </section>
            <Footer globalData={globalData} />
        </div>
    );
}

const NoAbits = styled.p`
font-size: 18px;
line-height: 22px;
color: #666666;
margin-top: 8px;
`;
export default Habits;