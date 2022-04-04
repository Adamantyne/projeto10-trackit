import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import { Bars } from  'react-loader-spinner'

import GetUserContext from "../../contexts/GetUserContext";
import InputForm from "../Assets/InputForm";

function FormLogin() {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [disabled, setDisabled] = useState({ status: false, opacity: 1, currentText: "Entrar" });
    const navigate = useNavigate();
    const {setGlobalData} = GetUserContext();
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/";

    function submitData(event) {
        event.preventDefault();
        setDisabled({ status: true, opacity: 0.8,
             currentText:<Bars color="#FFFFFF" height={40} width={120} />
            });

        const promisse = axios.post(
            `${URL}auth/login`, userData
        );
        promisse.then(response => {
            const data = response.data;
            setDisabled({ status: false, opacity: 1, currentText: "Entrar" });
            localStorage.setItem("storageData",JSON.stringify({...data,url:URL,percentage:0}));
            setGlobalData({...data,url:URL,percentage:0});
            navigate("/habits");
        });
        promisse.catch(error => {
            console.log(error.response);
            alert("Verifique os dados e tente novamente...");
            setDisabled({ status: false, opacity: 1, currentText: "Entrar" });
        });
    }

    //login automático
    useEffect(()=>{
        const userStorage = localStorage.getItem("storageData")
        if(userStorage){
            const userStorageJSON = JSON.parse(userStorage)
            const objectData = {email:userStorageJSON.email, password:userStorageJSON.password };
            const promisse = axios.post(
                `${URL}auth/login`, objectData
            );
            promisse.then(response => {
                const data = response.data;
                setGlobalData({...data,url:URL,percentage:0});
                navigate("/habits");
            });
            promisse.catch(error => {
                console.log(error.response);
            });

        }
    },[]);

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