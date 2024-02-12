import { TableCell, TableRow } from "@/components/ui/table";
import { MealType } from "../MealInput";

export function MealRecord({ belongsToDiet, date, title, description }: MealType) {
  const bgColor = belongsToDiet === true ? 'bg-green-200' : 'bg-red-200'
  return (
    <TableRow className="bg-zinc-500 w-11/12 grow-1 flex items-center justify-between" >
      <TableCell className="font-bold text-xl">{title}</TableCell>
      <TableCell className="w-auto break-all text-wrap">{description != '' ? description : ''}</TableCell>
      <TableCell className="text-xs w-4 md:text-md">{new Date(date).toLocaleString('pt-BR')}</TableCell>
      <TableCell className="flex justify-center">  <div className={`${bgColor} rounded-xl size-4`}></div></TableCell>
    </TableRow>
  )
}