console.log(window.location.href)
const addHabits = document.querySelector(".add-habit");
const habitsList = document.querySelector(".habits");
const habits = JSON.parse(localStorage.getItem("habits")) || [];
const habitForm = document.querySelector("form");

habitForm.addEventListener('submit',(e) => { //POST request to habit
  e.preventDefault();
 
  const habit = {
    habitName: e.target['habitName'].value.trim(),
    habitMaxReps: e.target['habitMaxReps'].value.trim(),
  };
  console.log(habit);
  const options = {
    method: 'POST',
    body: JSON.stringify(habit),
    header: { "Content-Type": "application/json" }
  }

  // habitForm.reset();
  
  fetch(`${window.location.href}`, options)
    // .then(location.reload())
})


// Toggle If Complete
function toggleCompleted(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  habits[index].reps += 1;

  if (habits[index].reps === habits[index].totalCounts) {
    habits[index].completed = true;
    habits[index].maxStreak += 1;
  } else if (habits[index].reps > habits[index].totalCounts) {
    habits[index].reps = 0;
    habits[index].completed = false;
    habits[index].maxStreak -= 1;
  }

  listHabits(habits, habitsList);
  localStorage.setItem("habits", JSON.stringify(habits));
}

// Delete Habit
// function deleteHabit(e) { //DELETE request 
//   if (!e.target.matches("button")) return;
//   const el = e.target;
//   const index = el.dataset.index;

//   habits.splice(index, 1);

//   listHabits(habits, habitsList);
//   localStorage.setItem("habits", JSON.stringify(habits));
// }

// addHabits.addEventListener("submit", addHabit);
// habitsList.addEventListener("click", toggleCompleted);
// habitsList.addEventListener("click", deleteHabit);

// listHabits(habits, habitsList);

async function deleteHabit(e) {
  e.preventDefault();
  const obj = {
      id: e.target.name
  }     
  try {
      const options = {
          method: 'DELETE',
          headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
          body: JSON.stringify(obj)
      }

      const r = await fetch(`http://localhost:3000/habits/delete/${e.target.name}`, options)
      const data = await r.json()
      if (data.err) {
          throw Error(data.err)

      }

      window.location.reload()

  } catch (err) {
      console.warn(err)
  }
 
}

//create element - set custom attribute of actual mongoose id
async function createHabit(e) {

}
//update streak
//
