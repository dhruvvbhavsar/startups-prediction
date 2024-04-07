"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"

 
const formSchema = z.object({
   state_code : z.number().min(1, {
    message: "State code is required.",
   }),
  age_first_funding_year : z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  age_last_funding_year : z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  relationships : z.number(),
  funding_rounds : z.number().min(1, {
    message: "Funding rounds is required.",
  }),
  funding_total_usd : z.number().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  milestones : z.number().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  avg_participants : z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  is_top500 : z.boolean()
})

export default function DashboardPage() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            state_code: 0,
            age_first_funding_year : "",
            age_last_funding_year: "",
            relationships: 0,
            funding_rounds: 0,
            funding_total_usd: 0,
            is_top500: false
        },
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values) 
      }

    return (
        <div className="items-center w-full flex justify-center">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col px-16 py-4 bg-gray-200 rounded-md">
        <FormField
            control={form.control}
            name="state_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State code of the startup</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age_first_funding_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age of startup when it received its first funding round</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="age_last_funding_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age of startup when it received its last funding round</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="relationships"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of relationships the startup has</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="funding_rounds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total number of funding rounds the startup has completed</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="funding_total_usd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total number of funding raised by the startup in USD</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="milestones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of milestones achieved by the startup</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avg_participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avg number of participants in the startup's funding round</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_top500"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total number of funding raised by the startup in USD</FormLabel>
              <FormControl>
                <Checkbox 
                  checked={field.value} onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
    )
  }
  