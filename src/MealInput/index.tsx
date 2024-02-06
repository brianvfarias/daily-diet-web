import { ForkKnife } from "@phosphor-icons/react";
import { Form, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@radix-ui/react-checkbox";
export interface MealType {
  id: number,
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

  const form = useForm<MealType>({
    resolver: zodResolver(mealInputSchema)
  });

  function onSubmit(data: MealType) {
    data.id = new Date().getTime()
    addMeal(data)
    form.setValue('title', '')
    form.setValue('description', '')
  }

  return (
    <div className="flex items-center justify-center">
      <Dialog >
        <DialogTrigger asChild>
          <Button variant={"default"}>Add new Meal</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Meal</DialogTitle>
            <DialogDescription>
              Fill the info of your latest meal below
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} action="" className="flex flex-col justify-center items-center  m-auto">
              <fieldset className="flex flex-col justify-center gap-1 max-w-80">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meal Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none" />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meal Description</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none" />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meal Title</FormLabel>
                      <FormControl>
                        <Input defaultValue={createCurrentDate()} {...field} className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none" />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meal Title</FormLabel>
                      <FormControl>
                        <Checkbox {...field} className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none" />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Label htmlFor="">
                  Meal Description
                </Label>
                <Input
                  {...form.register('description')}
                  className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none break-words text-wrap" type="text" />
                <Label htmlFor="">
                  Meal Date
                </Label>
                <Input
                  defaultValue={createCurrentDate()}
                  className="bg-slate-200 py1- px-4 rounded focus:outline-fuchsia-300" type="datetime-local"
                />

                <Checkbox
                  className="rounded self-start" defaultChecked
                />
                <Label htmlFor="">
                  Belongs to Diet
                  </Label>*/}
                <DialogFooter>
                  <Button variant={"outline"}
                    type="submit"
                    className="bg-blue-500 cursor-pointer border-none rounded-lg inline-flex justify-center items-center gap-1 transition-all hover:bg-green-500 hover:text-l focus:bg-green-500 focus:text-l "> <ForkKnife size={16} /> New Meal
                  </Button>
                  <DialogClose asChild>
                    <Button variant={"destructive"}>
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </fieldset>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div >
  )
}