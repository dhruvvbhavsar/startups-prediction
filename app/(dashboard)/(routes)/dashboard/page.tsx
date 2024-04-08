"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Select,
  } from "@/components/ui/select";

 
// const formSchema = z.object({
//    state_code : z.number().min(1, {
//     message: "State code is required.",
//    }),
//   age_first_funding_year : z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   age_last_funding_year : z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   relationships : z.number(),
//   funding_rounds : z.number().min(1, {
//     message: "Funding rounds is required.",
//   }),
//   funding_total_usd : z.number().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   milestones : z.number().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   avg_participants : z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   is_top500 : z.boolean()
// })

const formSchema = z
  .object({
    state_code: z.number().int().min(1),
    age_first_funding_year: z.string(),
    age_last_funding_year: z.string(),
    relationships: z.number(),
    funding_rounds: z.number(),
    funding_total_usd : z.number(),
    milestones: z.number(),
    startup_location: z.enum(["CA", "NY", "MA", "TX", "otherstate"]),
    startup_category: z.enum(["software", "web", "mobile", "enterprise", "advertising", "gamesvideo", "ecommerce", "biotech", "consulting", "other category"]),
    funding_type_received: z.enum(["VC", "Angel", "roundA", "roundB", "roundC"]),
    avg_participants: z.string(),
    is_top500: z.boolean()
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
                  <Input 
                    placeholder="" 
                    type="number"
                    {...field} 
                    onChange={event => field.onChange(parseInt(event.target.value))}
                    />
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
                  <Input 
                   placeholder="" 
                   type="number" 
                   {...field} 
                   onChange={event => field.onChange(parseInt(event.target.value))}
                   />
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
                  <Input 
                   placeholder="" 
                   type="number" 
                   {...field} 
                   onChange={event => field.onChange(parseInt(event.target.value))}
                   />
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
                <Input 
                 placeholder="" 
                 type="number" 
                 {...field}
                 onChange={event => field.onChange(parseInt(event.target.value))}
                 />
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
                <Input 
                 placeholder="" 
                 type="number" 
                 {...field} 
                 onChange={event => field.onChange(parseInt(event.target.value))}
                 />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="startup_location"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Startup's location</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select startup location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CA">CA</SelectItem>
                      <SelectItem value="NY">NY</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="TX">TX</SelectItem>
                      <SelectItem value="otherstate">Other State</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="startup_category"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Startup's category</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select startup category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="advertising">Advertising</SelectItem>
                      <SelectItem value="gamesvideo">Games Video</SelectItem>
                      <SelectItem value="ecommerce">Ecommerce</SelectItem>
                      <SelectItem value="biotech">BioTech</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other category">Other Category</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="funding_type_received"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Funding Type Received</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Funding Type Received" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="VC">VC</SelectItem>
                      <SelectItem value="angel">Angel</SelectItem>
                      <SelectItem value="roundA">Round A</SelectItem>
                      <SelectItem value="roundB">Round B</SelectItem>
                      <SelectItem value="roundC">Round C</SelectItem>
                      <SelectItem value="roundD">Round D</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
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
            <FormControl>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                  style={{ marginRight: '8px' }} // Add margin to create space between checkbox and label
                />
                <FormLabel>Total number of funding raised by the startup in USD</FormLabel>
              </div>
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
  