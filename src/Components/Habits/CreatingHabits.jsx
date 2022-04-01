import axios from "axios";
import { useState } from "react";
import GetUserContext from "../../contexts/GetUserContext";

import Days from "./Days";

import { Bars } from 'react-loader-spinner'

function CreatingHabits(props) {
    const { habitsList, setHabitsList, config } = props;
    const [creatingHabit, setCreatingHabit] = useState(false);
    const [habitData, setHabitData] = useState({ name: "", days: [] })
    const [disabled, setDisabled] = useState({ status: false, opacity: 1, currentText: "Salvar" });
    const { globalData } = GetUserContext();
    const { url } = globalData;

    function sendingHabit() {
        setDisabled({
            status: true, opacity: 0.8,
            currentText: <Bars color="#FFFFFF" height={35} width={35} />
        });
        if (habitData.name.length > 0 && habitData.days.length > 0) {
            const promisse = axios.post(`${url}habits`, habitData, config);
            promisse.then(promisseSuccess);
            promisse.catch(promisseError);
        }
        else {
            alert("selecione um nome e pelo menos um dia para o hábito ...");
            setDisabled({ status: false, opacity: 1, currentText: "Salvar" });
        }
    }
    function promisseSuccess(response) {
        const data = response.data;
        setHabitsList([...habitsList, data]);
        setCreatingHabit(false);
        setDisabled({ status: false, opacity: 1, currentText: "Salvar" });
    }
    function promisseError(error) {
        console.log(error.response);
        setDisabled({ status: false, opacity: 1, currentText: "Salvar" });
        alert("algo deu errado :(");
    }

    return (
        <>
            <div className="habits-options">
                <h2>Meus hábitos</h2>
                <article onClick={() => { setCreatingHabit(true) }}><p>+</p></article>
            </div>
            {creatingHabit === false ?
                <></> :
                <>
                    <section className="creating-habits">
                        <div>
                            <input type="text" placeholder="nome do hábito"
                                onChange={(e) => { setHabitData({ ...habitData, name: e.target.value }) }} />
                            <div className="days">
                                <Days setHabitData={setHabitData} habitData={habitData} />
                            </div>
                        </div>
                        <div className="buttons-div">

                            <Buttons 
                            disabled={disabled} 
                            text={"Cancelar"} 
                            click={() => { setCreatingHabit(false) }}
                            buttonClass={"cancel"}
                            />
                            <Buttons 
                            disabled={disabled} 
                            text={disabled.currentText} 
                            click={() => { sendingHabit() }}
                            buttonClass={"save"}
                            />

                        </div>
                    </section>
                </>
            }
        </>
    );
}
function Buttons(props) {
    const { text, click, buttonClass,disabled } = props;
    return (
        <button className={buttonClass} onClick={click}
            style={{ opacity: disabled.opacity }} disabled={disabled.status}
        >{text}</button>
    );
}
export default CreatingHabits;