import { Form, FormControl, FormField, FormItem, FormLabel } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export interface MealFilterType {
  dateFilter: string,
  titleFilter: string
}

interface MealSearchProps {
  searchMeal: (data: MealFilterType) => void
}

const mealsFilter = z.object({
  dateFilter: z.string(),
  titleFilter: z.string(),
})


export function MealSearch({ searchMeal }: MealSearchProps) {

  const form = useForm<z.infer<typeof mealsFilter>>({
    resolver: zodResolver(mealsFilter),
    defaultValues: {
      dateFilter: '',
      titleFilter: ''
    }
  })
  function onSubmitFilter(data: MealFilterType) {
    searchMeal(data)
    form.reset()
  }
  return (
    <Dialog>
      <DialogTrigger asChild >
        <Button variant={'ghost'}>
          <MagnifyingGlass size={25} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmitFilter)}
            className='flex items-center justify-center gap-2'>
            <FormField
              control={form.control}
              name="titleFilter"
              render={({ field }) =>
                <FormItem>
                  <FormLabel />
                  <FormControl >
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              }
            />

            <FormField
              control={form.control}
              name="dateFilter"
              render={({ field }) =>
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                </FormItem>

              }
            />
            <DialogClose asChild>
              <Button type="submit">
                Search
              </Button>
            </DialogClose>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}