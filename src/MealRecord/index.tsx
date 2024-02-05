import { MealType } from "../MealInput";

export function MealRecord({ belongsToDiet, date, title, description }: MealType) {
  const bgColor = belongsToDiet === true ? 'bg-green-300' : 'bg-red-300'
  return (
    <div className={`flex flex-col gap-1 max-w-80 rounded-lg my-2 box-border py-8 px-3 ${bgColor}`}>
      <h1 className="font-bold text-3xl">{title}</h1>
      <span className="break-all text-wrap">{description != '' ? description : ''}</span>
      <span>{new Date(date).toLocaleString('pt-BR')}</span>
      <span>{belongsToDiet ? 'This meal Belongs to diet' : 'Does not belong to diet'}</span>
    </div>
  )
}