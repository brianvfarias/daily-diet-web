import { useState } from 'react'
import { MealInput, MealType } from './MealInput'
import { MealRecord } from './MealRecord';

export function App() {
  const [meals, setMeals] = useState<MealType[]>([]);
  function handleAddMeal(meal: MealType) {
    setMeals(prev => [...prev, meal])
  }
  return (
    <main className="m-auto">
      <MealInput addMeal={handleAddMeal} />

      {
        meals.length > 0 ?
          meals.map((meal, idx) => {
            console.log(meal)
            return <MealRecord key={idx} title={meal.title} description={meal.description} date={meal.date}
              belongsToDiet={meal.belongsToDiet} />
          })
          : null
      }
    </main>
  )
}


