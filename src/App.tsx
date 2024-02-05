import { useState } from 'react'
import { MealInput, MealType } from './MealInput'
import { MealRecord } from './MealRecord';

export function App() {
  const [meals, setMeals] = useState<MealType[]>([]);
  function handleAddMeal(meal: MealType) {
    setMeals(prev => {
      const meals = [...prev, meal]
      return meals.sort((m1, m2) => new Date(m1.date).getTime() - new Date(m2.date).getTime())
    })
  }
  return (
    <main className="bg-blue-300">
      <MealInput addMeal={handleAddMeal} />

      {
        meals.length > 0 ?
          <section className="flex flex-col justify-center items-center m-auto">
            {meals.map((meal, idx) => {
              if (idx < 5)
                return (
                  <div className="flex justify-center max-w-50 ">
                    <MealRecord key={new Date().getTime()} title={meal.title} description={meal.description} date={meal.date}
                      belongsToDiet={meal.belongsToDiet} />
                  </div>
                )
            })}
          </section>
          : null
      }
    </main>
  )
}


