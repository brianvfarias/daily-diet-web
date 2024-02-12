import { useReducer } from 'react'
import { MealInput, MealType } from './MealInput'
import { MealRecord } from './MealRecord';
import { Table, TableBody, TableHead, TableHeader, TableRow } from './components/ui/table';
import { MealFilterType, MealSearch } from './MealSearch';
import { Button } from './components/ui/button';
import { MealAnalytics } from './MealAnalytics';



interface MealState {
  meals: MealType[]
}

interface Action {
  type: 'ADD_NEW_MEAL' | 'FILTER_MEALS' | 'SHOW_ALL',
  payload: MealType | MealFilterType | null
}



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


  const initial = {
    meals: [] as MealType[]
  }
  const [state, dispatch] = useReducer(mealsReducer, initial);
  // const [showMeals, setShowMeals] = useState<MealType[]>([]);

  function handleAddMeal(meal: MealType) {
    dispatch({ type: 'ADD_NEW_MEAL', payload: meal })
  }

  function searchMeal(data: MealFilterType) {
    dispatch({ type: 'FILTER_MEALS', payload: data })
  }
  return (
    <main className="m-auto bg-zinc-50">
      <MealAnalytics meals={state.meals} />
      <nav className='mt-4 grid place-content-center grid-row-2 gap-2'>
        <div className='row'> <strong>Refeições</strong> </div>
        <div className="flex justify-center items-center">
          <MealInput addMeal={handleAddMeal} />
          <MealSearch searchMeal={searchMeal} />
          <Button variant={'link'}
            onClick={(e) => {
              e.preventDefault()
              dispatch({ type: 'SHOW_ALL', payload: null })
            }}
          >Clear</Button>
        </div>
      </nav>

      <Table className="flex flex-col items-center justify-center rounded border w-11/12 md:w-3/4 lg:w-[32rem] mx-auto my-4 bg-zinc-300">
        <TableHeader className="w-11/12">
          <TableRow className="flex justify-between">
            <TableHead className="text-md md:text-lg lg:text-xl">
              Title
            </TableHead>
            <TableHead className="text-md md:text-lg lg:text-xl">
              Description
            </TableHead>
            <TableHead className="text-md md:text-lg lg:text-xl">
              Time
            </TableHead>
            <TableHead className="text-md md:text-lg lg:text-xl">
              Belongs to diet
            </TableHead>
          </TableRow>
        </TableHeader>
        {
          state.meals.length > 0 ?
            <TableBody className="flex w-full justify-center">
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


