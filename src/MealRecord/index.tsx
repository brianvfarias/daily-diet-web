import { TableCell, TableRow } from "@/components/ui/table";
import { MealType } from "../MealInput";

export function MealRecord({ belongsToDiet, date, title, description }: MealType) {
  const bgColor = belongsToDiet === true ? 'bg-green-300' : 'bg-red-300'
  return (
    <TableRow className={`flex flex-col gap-1 max-w-80 rounded-lg my-2 box-border py-8 px-3 ${bgColor}`}>
      <TableCell className="font-bold text-3xl">{title}</TableCell>
      <TableCell className="break-all text-wrap">{description != '' ? description : ''}</TableCell>
      <TableCell>{new Date(date).toLocaleString('pt-BR')}</TableCell>
      <TableCell>{belongsToDiet ? 'This meal Belongs to diet' : 'Does not belong to diet'}</TableCell>
    </TableRow>
  )
}