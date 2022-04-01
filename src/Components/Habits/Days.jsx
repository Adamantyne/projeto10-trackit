import { useState,useEffect } from "react";

import objectDay from "./objextDay";

function Days(props) {
    const{setHabitData,habitData}=props
    const [daysArray, setDaysArray]= useState([]);
    const Days = objectDay();


    useEffect(()=>{
        setHabitData({...habitData, days:[...daysArray]})
    },[daysArray]);
    
    return (
        <>
            {Days.map(objectDay => {
                const { day, name } = objectDay;
                return (
                    <Day 
                    key={name + day} 
                    day={day} 
                    name={name} 
                    selectingDay={selectingDay} 
                    daysArray={daysArray}
                    setDaysArray={setDaysArray}
                    />
                );
            })}
        </>
    );
}
function Day(props) {
    const { day, name,daysArray,setDaysArray } = props;
    const [selected, setSelected] = useState(false);
    let status = "";
    if (selected === true) {
        status = "selected";
    }
    else {
        status = "desselected"
    }

    return (
        <article className={status} onClick={() =>{
             selectingDay(selected, setSelected,day,setDaysArray,daysArray)
             }}>
            <p>{name}</p>
        </article>
    );
}
function selectingDay(selected, setSelected, day,setDaysArray,daysArray) {
    setSelected(!selected);
    if(!selected){
        setDaysArray([...daysArray,day])
    }
    else{
        const filterDays = daysArray.filter(dayArray=>{
            if(dayArray!==day){
                return true;
            }
            return false;
        });
        setDaysArray([...filterDays]);
    }
}

export default Days;