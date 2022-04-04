import axios from "axios";
import { useState } from "react";
import GetUserContext from "../../contexts/GetUserContext";
import styled from 'styled-components';

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
            setHabitData({ ...habitData, name: ""})
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
            <HabitsOptions>
                <h2>Meus hábitos</h2>
                <article onClick={() => { setCreatingHabit(true) }}><p>+</p></article>
            </HabitsOptions>
            {creatingHabit === false ?
                <></> :
                <>
                    <CreatingHabitsStyle>
                        <div>
                            <input type="text" placeholder="nome do hábito"
                                onChange={(e) => { 
                                    setHabitData({ ...habitData, name: e.target.value }) 
                                }}
                                value={habitData.name} 
                                />
                            <DaysStyle>
                                <Days setHabitData={setHabitData} habitData={habitData} />
                            </DaysStyle>
                        </div>
                        <ButtonsDiv>

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

                        </ButtonsDiv>
                    </CreatingHabitsStyle>
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

const HabitsOptions = styled.div`
width: 100%;
margin-bottom: 20px;
display: flex;
align-items: center;
justify-content: space-between;
font-size: 22.976px;
line-height: 29px;
color: #126BA5;

article{
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: center;
}

p{
    font-size: 27px;
    line-height: 30px;
    color: #FFFFFF;
    position: absolute;
    top: 0;
    margin: 0 auto 0 auto;
}
`;
const CreatingHabitsStyle = styled.section`
    width: 340px;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 18px;
    margin-bottom: 20px;

    input{
        width: 100%;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 0 11px 0 11px;
        font-size: 18px;
        line-height: 25px;
        color: #666666;
        margin-bottom: 8px;
    }
`;
const DaysStyle = styled.div`
    display: flex;
    article{
        margin-right: 4px;
        width: 30px;
        height: 30px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        position: relative;
        display: flex;
        justify-content: center;
    }
    p{
        font-size: 20px;
        line-height: 25px;
        position: absolute;
        top: 0;
    }
`;
const ButtonsDiv = styled.div`
    wiwidth: 100%;
    display: flex;
    justify-content: flex-end;
    button{
        width: 84px;
        height: 35px;
        border-radius: 5px;
        border: none;
        font-size: 15.976px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
export default CreatingHabits;