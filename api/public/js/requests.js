
//get all habits
function getHabits(uid){
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                headers: new Headers({'Authorization': `Bearer ${localStorage.getItem('token')}`})
            }
            const response = await fetch(`${API_HOST}/users/${uid}/habits`, options);
            const json = await response.json();
            if(response.status !== 200) throw new Error(json);
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}

function newHabit(uid, {habit, goal, unit, duration}){
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: "POST",
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    habit, 
                    goal: parseInt(goal), 
                    unit, 
                    duration: parseInt(duration)
                })
            };
            const response = await fetch(`${API_HOST}/users/${uid}/habits`, options);
            const json = await response.json();
            if(!json.acknowledged) throw new Error(json);
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}
