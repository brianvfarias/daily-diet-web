import { useReducer } from 'react'
import { MealInput, MealType } from './MealInput'
import { MealRecord } from './MealRecord';
import { Table, TableBody, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Form, FormControl, FormField, FormItem, FormLabel } from './components/ui/form';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

interface MealFilterType {
  dateFilter: string,
  titleFilter: string
}
interface MealState {
  meals: MealType[]
}

interface Action {
  type: 'ADD_NEW_MEAL' | 'FILTER_MEALS' | 'SHOW_ALL',
  payload: MealType | MealFilterType | null
}

const mealsFilter = z.object({
  dateFilter: z.string(),
  titleFilter: z.string(),
})

function mealsReducer(state: MealState, action: Action) {
  const { payload, type } = action
  if (type === 'ADD_NEW_MEAL') {
    let newMeals = state.meals.length > 0 ? [action.payload, ...state.meals] : [action.payload];
    newMeals = newMeals.sort((m1, m2) => new Date(m1.date).getTime() - new Date(m2.date).getTime())
    return { ...state, meals: newMeals }
  }

  if (type === 'FILTER_MEALS') {
    const newMeals = state.meals.map(m => {
      if (payload!.titleFilter) {
        return m.title.toLowerCase().includes(payload!.titleFilter.toLowerCase()) || m?.description.toLowerCase().includes(payload!.titleFilter.toLowerCase()) ? { ...m, show: true } : { ...m, show: false }
      }
    })
    return { ...state, meals: newMeals }
  }

  if (type === 'SHOW_ALL') {
    const newMeals = state.meals.map(m => { return { ...m, show: true } })
    console.log(newMeals)
    return { ...state, meals: newMeals }
  }

  return state
}

export function App() {

  const form = useForm<z.infer<typeof mealsFilter>>({
    resolver: zodResolver(mealsFilter),
    defaultValues: {
      dateFilter: '',
      titleFilter: ''
    }
  })
  const initial = {
    meals: [] as MealType[]
  }
  const [state, dispatch] = useReducer(mealsReducer, initial);
  // const [showMeals, setShowMeals] = useState<MealType[]>([]);

  function handleAddMeal(meal: MealType) {
    dispatch({ type: 'ADD_NEW_MEAL', payload: meal })
  }

  function searchMeal(data: z.infer<typeof mealsFilter>) {
    dispatch({ type: 'FILTER_MEALS', payload: data })
    form.reset()
  }
  return (
    <main className="bg-zinc-900">

      <nav className='flex items-center justify-center gap-2'>
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(searchMeal)}
            className='flex items-center justify-center gap-2'>
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
            <Button onClick={(e) => {
              e.preventDefault()
              dispatch({ type: 'SHOW_ALL', payload: null })
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
          state.meals.length > 0 ?
            <TableBody className="">
              {state.meals.map((meal) => {
                if (meal.show) return (
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


