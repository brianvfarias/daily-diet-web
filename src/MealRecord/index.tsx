import { MealType } from "../MealInput";

export function MealRecord({ belongsToDiet, date, title, description }: MealType) {
  return (
    <div className="flex flex-col gap-1">
      <h1>{title}</h1>
      <span>{description != '' ? description : ''}</span>
      <span>{date}</span>
      <span>{belongsToDiet ? 'This meal Belongs to diet' : 'Does not belong to diet'}</span>
    </div>
  )
}