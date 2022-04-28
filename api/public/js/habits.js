
const addHabits = document.querySelector(".add-habit");
const habitsList = document.querySelector(".habits");
const habits = JSON.parse(localStorage.getItem("habits")) || [];
const habitForm = document.querySelector("form");
const deleteButtons = document.querySelectorAll(".deleteButton")


 deleteButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    console.log(button.id);
    const habit = {
          id: button.id
      }    
      try {
          const options = {
              method: 'DELETE',
              header: { "Content-Type": "application/json" },
              body: JSON.stringify(habit)
          }
          const r = await fetch(`${window.location.href}`, options)
          // window.location.reload()
    
      } catch (err) {
          console.log(err)
      }
     
    })
  })

habitForm.addEventListener('submit',async (e) => { //POST request to habit
  e.preventDefault();
 
  const habit = {
    habitName: e.target['habitName'].value.trim(),
    habitMaxReps: e.target['habitMaxReps'].value.trim(),
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(habit),
    header: { "Content-Type": "application/json" }
  }
  
  await fetch(`${window.location.href}`, options)
  location.reload();
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

//  function deleteHabit(e) {
//   console.log(e.target);
  // const habit = {
  //     id: e.target.name
  // }    

  // try {
  //     const options = {
  //         method: 'DELETE',
  //         header: { "Content-Type": "application/json" },
  //         body: JSON.stringify(habit)
  //     }

  //     const r = await fetch(`${window.location.href}`, options)
  //     const data = await r.json()
  //     if (data.err) {
  //         throw Error(data.err)

  //     }

  //     window.location.reload()

  // } catch (err) {
  //     console.warn(err)
  // }
 
// }

//update streak
//
