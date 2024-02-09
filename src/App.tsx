import { useState } from 'react'
import { MealInput, MealType } from './MealInput'
import { MealRecord } from './MealRecord';
import { Table, TableBody, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Form, FormControl, FormField, FormItem, FormLabel } from './components/ui/form';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

const mealsFilter = z.object({
  dateFilter: z.string(),
  titleFilter: z.string(),
})

export function App() {
  const form = useForm<z.infer<typeof mealsFilter>>({
    resolver: zodResolver(mealsFilter),
    defaultValues: {
      dateFilter: '',
      titleFilter: ''
    }
  })

  const [meals, setMeals] = useState<MealType[]>([]);
  const [showMeals, setShowMeals] = useState<MealType[]>([]);

  function handleAddMeal(meal: MealType) {
    setMeals(prev => {
      const newMeals = [meal, ...prev]
      return newMeals.sort((m1, m2) => new Date(m1.date).getTime() - new Date(m2.date).getTime())
    })
    setShowMeals(prev => {
      const newMeals = [meal, ...prev]
      return newMeals.sort((m1, m2) => new Date(m1.date).getTime() - new Date(m2.date).getTime())
    })
  }

  function searchMeal(data: z.infer<typeof mealsFilter>) {
    const mealsFiltered = meals.filter((m) => {
      if (data.dateFilter === "" && data.titleFilter === "") return meals
      if (data.dateFilter != "" && data.titleFilter != "") {
        return new Date(m.date).getMonth() === new Date(data.dateFilter).getMonth()
          && (m.title.toLowerCase().includes(data.titleFilter) || m?.description.toLowerCase().includes(data.titleFilter))
      }
      if (data.dateFilter) {
        return new Date(m.date).getMonth() === new Date(data.dateFilter).getMonth()
      }

      if (data.titleFilter) return m.title.toLowerCase().includes(data.titleFilter) || m?.description.toLowerCase().includes(data.titleFilter)
    })
    console.log(mealsFiltered)
    console.log(meals)
    console.log(showMeals)
    setShowMeals(mealsFiltered)
    form.reset()
  }
  return (
    <main className="bg-zinc-900">
      {showMeals.length > 0 ? <span className='text-white'>Showing :{showMeals.length} </span> : null}
      <nav className='flex items-center justify-center gap-2'>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(searchMeal)} className='flex items-center justify-center gap-2'>
            <FormField
              control={form.control}
              name="titleFilter"
              render={({ field }) =>
                <FormItem>
                  <FormLabel />
                  <FormControl >
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              }
            />

            <FormField
              control={form.control}
              name="dateFilter"
              render={({ field }) =>
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                </FormItem>

              }
            />
            <Button type="submit">
              Search
            </Button>
            <Button onClick={() => {
              setShowMeals(meals)
              form.reset()
            }}>
              Clear
            </Button>
          </form>
        </Form>
        <MealInput addMeal={handleAddMeal} />
      </nav>

      <Table className="flex flex-col items-center justify-center rounded border w-[32rem] mx-auto my-4">
        <TableHeader>
          <TableRow className="flex justify-between">
            <TableHead className="text-xl">
              Title
            </TableHead>
            <TableHead className="text-xl">
              Description
            </TableHead>
            <TableHead className="text-xl">
              Time
            </TableHead>
            <TableHead className="text-xl">
              Belongs to diet
            </TableHead>
          </TableRow>
        </TableHeader>
        {
          meals.length > 0 ?
            <TableBody className="">
              {showMeals.map((meal) => {
                return (
                  <MealRecord key={meal.id} id={meal.id} title={meal.title} description={meal.description} date={meal.date}
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


