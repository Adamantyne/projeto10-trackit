import objectDay from "./objextDay"

function CreatedHabits(props) {
    const { id, name, days,excludingHabit } = props;
    const Days = objectDay();
    return (
        <div className="created-habit">
            <div onClick={()=>{excludingHabit(id)}} className="trash">
                <ion-icon name="trash-outline"></ion-icon>
            </div>
            <h2>{name}</h2>
            <div className="days">
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
            </div>
        </div>
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
export default CreatedHabits;