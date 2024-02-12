import { useEffect, useState } from "react"
import { MealType } from "@/MealInput"
interface MealAnalyticsProps {
  meals: MealType[]
}

interface MealStats {
  clean_meals: number,
  junk_meals: number,
  total_meals: number,
  percentage: number
}

export function MealAnalytics({ meals }: MealAnalyticsProps) {
  useEffect(() => {
    console.log('render')
    const newStats = meals.reduce((acc, meal) => {
      if (meal.show && meal.belongsToDiet) {
        acc.clean_meals += 1
        acc.total_meals += 1
      }
      if (meal.show && !meal.belongsToDiet) {
        acc.junk_meals += 1
        acc.total_meals += 1
      }
      return acc
    }, {
      clean_meals: 0,
      junk_meals: 0,
      total_meals: 0
    })
    const percentage = newStats.clean_meals > 0 ? newStats.clean_meals * 100 / newStats.total_meals : 0;
    setStats({ ...newStats, percentage })
  }, [meals])
  const [stats, setStats] = useState({} as MealStats)
  const bgColor = stats.total_meals === 0 ? 'bg-green-400' : (stats.clean_meals > 0 && (stats.clean_meals * 100 / stats.total_meals) >= 60) ? 'bg-green-400' : 'bg-red-400';
  return (
    <div className={`flex flex-col mx-auto items-center justify-center ${bgColor}`}>
      <h1 className="text-xl lg:text-2xl">Percentage of meals in diet: {Math.round(stats.percentage)}%</h1>
      <p>Number of meals:{stats.total_meals}</p>
      <p>Number of clean meals: {stats.clean_meals}</p>
      <p>Number of junk meals: {stats.junk_meals}</p>
    </div>
  )
}