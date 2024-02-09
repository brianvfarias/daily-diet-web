import { TableCell, TableRow } from "@/components/ui/table";
import { MealType } from "../MealInput";

export function MealRecord({ belongsToDiet, date, title, description }: MealType) {
  const bgColor = belongsToDiet === true ? 'bg-green-200' : 'bg-red-200'
  return (
    <TableRow className={`${bgColor}`}>
      <TableCell className="font-bold text-xl">{title}</TableCell>
      <TableCell className="break-all text-wrap">{description != '' ? description : ''}</TableCell>
      <TableCell>{new Date(date).toLocaleString('pt-BR')}</TableCell>
      <TableCell>{belongsToDiet ? 'This meal Belongs to diet' : 'Does not belong to diet'}</TableCell>
    </TableRow>
  )
}