import objectDay from "./objextDay"

import styled from 'styled-components';

function CreatedHabits(props) {
    const { id, name, days,excludingHabit } = props;
    const Days = objectDay();
    return (
        <CreatedHabitStyle>
            <Trash onClick={()=>{excludingHabit(id,name)}} className="trash">
                <ion-icon name="trash-outline"></ion-icon>
            </Trash>
            <h2>{name}</h2>
            <DaysStyle>
                {Days.map(objectDay => {
                    const { day, name } = objectDay;
                    return (
                        <Day
                            key={name + day}
                            dayNumber={day}
                            dayName={name}
                            days={days}
                        />
                    );
                })}
            </DaysStyle>
        </CreatedHabitStyle>
    );
}
function Day(props) {
    const { dayNumber, dayName, days } = props;
    let status = "";
    if (days.includes(dayNumber) === true) {
        status = "selected";
    }
    else {
        status = "desselected"
    }

    return (
        <article className={status}>
            <p>{dayName}</p>
        </article>
    );
}
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

const CreatedHabitStyle = styled.article`
width: 340px;
min-height: 91px;
background: #FFFFFF;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 15px;
margin-bottom: 10px;
position: relative;

h2{
    font-size: 20px;
    line-height: 25px;
    color: #666666;
}
`;
const Trash = styled.div`
    position: absolute;
    font-size: 16px;
    right: 10px;
    top: 10px;
    color: #666666;
`;
export default CreatedHabits;