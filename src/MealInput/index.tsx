import { useState } from "react";
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
  function createCurrentDate() {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDay().toString().padStart(2, '0')}`
  }
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(createCurrentDate());
  const [belongsToDiet, setBelongsToDiet] = useState<boolean>(true);

  return (
    <form action="" className="flex flex-col justify-center items-center">
      <fieldset className="flex flex-col justify-center gap-1">
        <legend>Add your Meal Info in the field below:</legend>
        <label htmlFor="">
          Meal Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none" type="text" id="title" />
        <label htmlFor="">
          Meal Description
        </label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none" type="text" id="desc" />
        <label htmlFor="">
          Meal Date
        </label>
        <input
          value={date}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-slate-200 py1- px-4 rounded focus:outline-fuchsia-300" type="date" id="date"
        />
        <label htmlFor="">
          Belongs to Diet
        </label>
        <input className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none self-start" type="checkbox" defaultChecked
          onClick={() => setBelongsToDiet(!belongsToDiet)}
          id="Title" />

        <button
          onClick={(e) => {
            e.preventDefault();
            const meal = {
              title,
              description,
              belongsToDiet,
              date
            }
            addMeal(meal)
            console.log()
            setTitle('');
            setDescription('');
            setBelongsToDiet(true);
            const now = createCurrentDate()
            setDate(now)
          }}
          className="bg-blue-500 cursor-pointer border-none rounded-lg h-8 my-1">Record Meal +</button>
      </fieldset>
    </form>
  )
}