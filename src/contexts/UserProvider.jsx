import { useState,useEffect } from "react";
import UserContext from "./UserContext";

function UserProvider(props){
    const[globalData, setGlobalData]=useState({token:"",percentage:0})

    useEffect(()=>{
        const userStorage = localStorage.getItem("storageData")
        if(userStorage){
            setGlobalData(JSON.parse(userStorage));
        }
    },[])
    return(
        <UserContext.Provider value={{globalData,setGlobalData}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;