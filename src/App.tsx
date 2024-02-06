import { useState } from 'react'
import { MealInput, MealType } from './MealInput'
import { MealRecord } from './MealRecord';
import { Table, TableBody, TableHead, TableHeader, TableRow } from './components/ui/table';

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

      <Table className="flex items-center justify-center rounded border">
        <TableHeader>
          <TableRow>
            <TableHead>
              Title
            </TableHead>
            <TableHead>
              Description
            </TableHead>
            <TableHead>
              Time
            </TableHead>
            <TableHead>
              Belongs to diet
            </TableHead>
          </TableRow>
        </TableHeader>
        {
          meals.length > 0 ?
            <TableBody className="flex flex-col justify-center items-center m-auto">
              {meals.map((meal) => {
                return (
                  <MealRecord id={meal.id} title={meal.title} description={meal.description} date={meal.date}
                    belongsToDiet={meal.belongsToDiet} />
                )
              })}
            </TableBody>
            : null
        }
      </Table>
    </main >
  )
}


