import { useState,useEffect } from "react";
import UserContext from "./UserContext";

function UserProvider(props){
    const[globalData, setGlobalData]=useState({})

    useEffect(()=>{
        const userStorage = localStorage.getItem("storageData")
        if(userStorage){
            setGlobalData(JSON.parse(userStorage));
        }
    },[])
    console.log(globalData);
    return(
        <UserContext.Provider value={{globalData,setGlobalData}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;