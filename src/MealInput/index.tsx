// import { useRef } from "react";

import { useRef } from "react";
export interface MealType {
  title: string,
  belongsToDiet: boolean,
  description?: string,
  date: string
}

interface MealInputProps {
  addMeal: (meal: MealType) => void;
}

export function MealInput({ addMeal }: MealInputProps) {

  const today = new Date();
  const dateObj = {
    day: today.getDate(),
    month: String(today.getMonth() + 1).padStart(2, '0'),
    year: today.getFullYear(),
  }
  const resetDate = `${dateObj.year}-${dateObj.month}-${dateObj.day}`
  const title = useRef<HTMLInputElement | null>(null);
  const description = useRef<HTMLInputElement | null>(null);
  const date = useRef<HTMLInputElement | null>(null);
  const belongsToDiet = useRef<HTMLInputElement | null>(null);

  return (
    <form action="" className="flex flex-col justify-center items-center">
      <fieldset className="flex flex-col justify-center gap-1">
        <legend>Add your Meal Info in the field below:</legend>
        <label htmlFor="">
          Meal Title
        </label>
        <input
          ref={title}
          className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none" type="text" id="title" />
        <label htmlFor="">
          Meal Description
        </label>
        <input
          ref={description}
          className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none" type="text" id="desc" />
        <label htmlFor="">
          Meal Date
        </label>
        <input
          ref={date}
          defaultValue={resetDate}
          className="bg-slate-200 py1- px-4 rounded focus:outline-fuchsia-300" type="date" id="date"
        />
        <label htmlFor="">
          Meal Title
        </label>
        <input className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none self-start" type="checkbox" checked
          ref={belongsToDiet}
          id="Title" />

        <button
          onClick={(e) => {
            e.preventDefault();
            const meal = {
              title: title.current!.value,
              description: description.current!.value,
              belongsToDiet: belongsToDiet.current!.checked,
              date: date.current!.value
            }
            addMeal(meal)
            title.current!.value = '';
            description.current!.value = '';
            belongsToDiet.current!.checked = true;
            date.current!.value = resetDate;
          }}
          className="bg-blue-500 cursor-pointer border-none rounded-lg h-8 my-1">Record Meal +</button>
      </fieldset>
    </form>
  )
}