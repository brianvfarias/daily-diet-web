import { ForkKnife } from "@phosphor-icons/react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
export interface MealType {
  id: number,
  title: string,
  belongsToDiet: boolean,
  description?: string,
  date: string
  show?: boolean
}

interface MealInputProps {
  addMeal: (meal: MealType) => void;
}

const mealInputSchema = z.object({
  title: z.string().min(1, 'A meal needs a title to be created'),
  belongsToDiet: z.boolean(),
  description: z.string(),
  date: z.string().min(1, 'Inform the meal date')
})

export function MealInput({ addMeal }: MealInputProps) {
  // function createCurrentDate() {
  //   const now = new Date();
  //   return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  // }

  const form = useForm<z.infer<typeof mealInputSchema>>({
    resolver: zodResolver(mealInputSchema),
    defaultValues: {
      belongsToDiet: true,
      date: '',
      description: '',
      title: ''
    }
  });

  function onSubmit(data: z.infer<typeof mealInputSchema>) {
    const id = new Date().getTime()
    const { date, description, title } = data
    addMeal({
      id,
      date,
      description,
      title,
      belongsToDiet: !!data.belongsToDiet,
      show: true
    })
    form.control._reset()
  }

  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-auto md:w-44 lg:w-80" variant={"secondary"}>Add new Meal</Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-600">
          <DialogHeader>
            <DialogTitle>New Meal</DialogTitle>
            <DialogDescription>
              Fill the info of your latest meal below
            </DialogDescription>
          </DialogHeader>
          <Form {...form} >
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
                      <FormLabel>Meal Date</FormLabel>
                      <FormControl>
                        <Input  {...field} type="datetime-local" className="bg-slate-200 p-1 px-4 rounded focus:border-cyan-800 outline-none" />
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
                  name="belongsToDiet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meal Title</FormLabel>
                      <FormControl>
                        <Input type="checkbox" {...field} checked={field.value} className="p-1 px-4 size-6 border- rounded focus:border-cyan-800" />
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