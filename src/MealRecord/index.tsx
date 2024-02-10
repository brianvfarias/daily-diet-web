import { TableCell, TableRow } from "@/components/ui/table";
import { MealType } from "../MealInput";

export function MealRecord({ belongsToDiet, date, title, description }: MealType) {
  const bgColor = belongsToDiet === true ? 'bg-green-200' : 'bg-red-200'
  return (
    <TableRow className="bg-zinc-500" >
      <TableCell className="font-bold text-xl">{title}</TableCell>
      <TableCell className="w-44 break-all text-wrap">{description != '' ? description : ''}</TableCell>
      <TableCell>{new Date(date).toLocaleString('pt-BR')}</TableCell>
      <TableCell >  <div className={`${bgColor} rounded-xl size-4`}></div></TableCell>
    </TableRow>
  )
}