import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Bars } from  'react-loader-spinner';

import InputForm from "../Assets/InputForm";

function FormRegistration() {
    const [userData, setUserData] = useState({email: "",name: "",image: "",password: ""});
    const [disabled, setDisabled] = useState({ status: false, opacity: 1, currentText: "Cadastrar" });
    const navigate = useNavigate();

    function submitData(event) {
        event.preventDefault();
        setDisabled({ status: true, opacity: 0.8,
            currentText:<Bars color="#FFFFFF" height={40} width={120} />
           });

        const promisse = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", userData
        );
        promisse.then(response => {
            console.log(response.data);
            setDisabled({ status: false, opacity: 1, currentText: "Cadastrar" });
            navigate("/");
        });
        promisse.catch(error => {
            console.log(error.response);
            alert("Verifique os dados e tente novamente...");
            setDisabled({ status: false, opacity: 1, currentText: "Cadastrar" });
        });
    }

    return (
        <form onSubmit={(event) => submitData(event)}>
            <InputForm
                type={"email"}
                name={"email"}
                placeholder={"email"}
                value={userData.email}
                disabled={disabled}
                onChange={(e) => { setUserData({ ...userData, [e.target.name]: e.target.value }) }}
            />
            <InputForm
                type={"password"}
                name={"password"}
                placeholder={"senha"}
                value={userData.password}
                disabled={disabled}
                onChange={(e) => { setUserData({ ...userData, [e.target.name]: e.target.value }) }}
            />
            <InputForm
                type={"text"}
                name={"name"}
                placeholder={"nome"}
                value={userData.name}
                disabled={disabled}
                onChange={(e) => { setUserData({ ...userData, [e.target.name]: e.target.value }) }}
            />
            <InputForm
                type={"url"}
                name={"image"}
                placeholder={"imagem"}
                value={userData.image}
                disabled={disabled}
                onChange={(e) => { setUserData({ ...userData, [e.target.name]: e.target.value }) }}
            />

            <button style={{opacity:disabled.opacity}} type="submit" 
            disabled={disabled.status}>{disabled.currentText}</button>
            <Link to={"/"}>
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </form>
    );
}
export default FormRegistration;