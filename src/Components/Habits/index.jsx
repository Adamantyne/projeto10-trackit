import axios from "axios";
import { useEffect, useState } from "react";
import GetUserContext from "../../contexts/GetUserContext";

import Footer from "../Footer";
import Header from "../Header";
import CreatingHabits from "./CreatingHabits";
import CreatedHabits from "./CreatedHabits";
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
        const promisse = axios.get(`${url}habits`, config);
        promisse.then(response => {
            const data = response.data;
            setHabitsList(data);
        });
        promisse.catch(error => { console.log(error.response); });
    }, [globalData]);


    function excludingHabit(currentID) {
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

    return (
        <div className="container" style={{ backgroundColor: "#F2F2F2" }}>
            <Header globalData={globalData} />
            <section className="page">
                <CreatingHabits habitsList={habitsList} setHabitsList={setHabitsList} config={config} />
                {
                    habitsList.length === 0 ?
                        <p className="no-habits">Você não tem nenhum hábito cadastrado ainda.
                            Adicione um hábito para começar a trackear!
                        </p>
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
export default Habits;