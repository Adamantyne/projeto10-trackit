import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Bars } from  'react-loader-spinner'

import GetUserContext from "../../contexts/GetUserContext";
import InputForm from "../Assets/InputForm";

function FormLogin() {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [disabled, setDisabled] = useState({ status: false, opacity: 1, currentText: "Entrar" });
    const navigate = useNavigate();
    const {globalData,setGlobalData} = GetUserContext();

    function submitData(event) {
        event.preventDefault();
        setDisabled({ status: true, opacity: 0.8,
             currentText:<Bars color="#FFFFFF" height={40} width={120} />
            });

        const promisse = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", userData
        );
        promisse.then(response => {
            const data = response.data;
            setDisabled({ status: false, opacity: 1, currentText: "Entrar" });
            localStorage.setItem("storageData",JSON.stringify({...data}));
            setGlobalData({...data});
            //navigate("/");
        });
        promisse.catch(error => {
            console.log(error.response);
            alert("Verifique os dados e tente novamente...");
            setDisabled({ status: false, opacity: 1, currentText: "Entrar" });
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
            <button style={{opacity:disabled.opacity}} type="submit" 
            disabled={disabled.status}>{disabled.currentText}</button>
            <Link to={"/registration"}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </form>
    );
}
export default FormLogin;