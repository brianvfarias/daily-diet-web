import { MealType } from "../MealInput";

export function MealRecord({ belongsToDiet, date, title, description }: MealType) {
  return (
    <div className="flex flex-col gap-1">
      <h1>{title}</h1>
      <span>{description != '' ? description : ''}</span>
      <span>{new Date(date).toLocaleString('pt-BR').substring(0, 10)}</span>
      <span>{belongsToDiet ? 'This meal Belongs to diet' : 'Does not belong to diet'}</span>
    </div>
  )
}