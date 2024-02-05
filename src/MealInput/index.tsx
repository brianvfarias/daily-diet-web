import { ForkKnife } from "@phosphor-icons/react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
export interface MealType {
  title: string,
  belongsToDiet: boolean,
  description?: string,
  date: string
}

interface MealInputProps {
  addMeal: (meal: MealType) => void;
}

const mealInputSchema = z.object({
  title: z.string().min(1, 'A meal needs a title to be created'),
  belongsToDiet: z.boolean().default(true),
  description: z.string(),
  date: z.string()
})

export function MealInput({ addMeal }: MealInputProps) {
  function createCurrentDate() {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors
    }
  } = useForm<MealType>({
    resolver: zodResolver(mealInputSchema)
  });

  function onSubmit(data: MealType) {
    console.log(data)
    addMeal(data)
    setValue('title', '')
    setValue('description', '')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col justify-center items-center  m-auto">
      <fieldset className="flex flex-col justify-center gap-1 max-w-80">
        <legend>Add your Meal Info in the field below:</legend>
        <label htmlFor="">
          Meal Title
        </label>
        <input
          {...register('title')}
          className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none" type="text" id="title" />
        {errors.title ? <span className="text-red-600">{errors.title?.message}</span> : null}
        <label htmlFor="">
          Meal Description
        </label>
        <input
          {...register('description')}
          className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none break-words text-wrap" type="text" />
        <label htmlFor="">
          Meal Date
        </label>
        <input
          {...register('date')}
          defaultValue={createCurrentDate()}
          className="bg-slate-200 py1- px-4 rounded focus:outline-fuchsia-300" type="datetime-local"
        />
        <label htmlFor="">
          Belongs to Diet
        </label>
        <input
          className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none self-start" type="checkbox" defaultChecked
          {...register('belongsToDiet')}
        />

        <button
          type="submit"
          className="bg-blue-500 cursor-pointer border-none rounded-lg h-8 my-1 inline-flex justify-center items-center gap-1 hover:bg-green-500 hover:text-xl focus:bg-green-500 focus:text-xl "> <ForkKnife size={16} /> Record Meal
        </button>
      </fieldset>
    </form>
  )
}