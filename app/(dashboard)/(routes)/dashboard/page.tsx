"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { convertFormValues, states } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useCompletion } from "ai/react";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  age_first_funding_year: z.string(),
  age_last_funding_year: z.string(),
  relationships: z.number(),
  funding_rounds: z.number(),
  funding_total_usd: z.number(),
  milestones: z.number(),
  startup_location: z.string(),
  startup_category: z.enum([
    "software",
    "web",
    "mobile",
    "enterprise",
    "advertising",
    "gamesvideo",
    "ecommerce",
    "biotech",
    "consulting",
    "other category",
  ]),
  funding_type_received: z.array(z.string()),
  avg_participants: z.string(),
  is_top500: z.boolean(),
});

export default function DashboardPage() {
  const [prediction, setPrediction] = useState(false);
  const [value, setValue] = useState(false);
  const [convertedData, setConvertedData] = useState({});
  const [answer, setAnswer] = useState("");
  const { completion, complete } = useCompletion({
    api: "/api/completion",
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age_first_funding_year: "",
      age_last_funding_year: "",
      relationships: 0,
      funding_rounds: 0,
      funding_total_usd: 0,
      funding_type_received: [],
      is_top500: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPrediction(false);
    setConvertedData({});
    let x = convertFormValues(values);
    setConvertedData(x);
    let res = await fetch("/api/python", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_data: x }),
    });

    let data = await res.json();
    setPrediction(true);
    if (data.prediction === 1) {
      setValue(true);
    } else {
      setValue(false);
    }

    let prompt = `
      You are a Startup Investor. You have VC experience and you are looking to invest in a startup. You have come across a startup named ${
        values.name
      }. You have the following information about the startup:
      - Startup Description: ${values.description}
      - Age of startup when it received its first funding round: ${
        values.age_first_funding_year
      }
      - Age of startup when it received its last funding round: ${
        values.age_last_funding_year
      }
      - Number of relationships the startup has: ${values.relationships}
      - Total number of funding rounds the startup has completed: ${
        values.funding_rounds
      }
      - Total number of funding raised by the startup in USD: ${
        values.funding_total_usd
      }
      - Number of milestones achieved by the startup: ${values.milestones}
      - Startup's location: ${values.startup_location}
      - Startup's category: ${values.startup_category}
      - Funding Type Received: ${values.funding_type_received}
      - Avg number of participants in the startup's funding round: ${
        values.avg_participants
      }
      - Is the startup in the top 500?: ${values.is_top500}
      
      We think the startup will be ${value ? "Acquired" : "Closed"}. 

      Give your opinion on how the startup should proceed and why.
      `;
    complete(prompt);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 px-16 py-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Startup Name</FormLabel>
                <FormControl>
                  <Input placeholder="Lawyer AI" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Startup Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="a web3 company who deals with safe and secure storage of legal documents"
                    {...field}
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
                <FormLabel>
                  Age of startup when it received its first funding round
                </FormLabel>
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
                <FormLabel>
                  Age of startup when it received its last funding round
                </FormLabel>
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
                    onChange={(event) =>
                      field.onChange(parseInt(event.target.value))
                    }
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
                <FormLabel>
                  Total number of funding rounds the startup has completed
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(parseInt(event.target.value))
                    }
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
                <FormLabel>
                  Total number of funding raised by the startup in USD
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(parseInt(event.target.value))
                    }
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
                <FormLabel>
                  Number of milestones achieved by the startup
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(parseInt(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startup_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Startup's location</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select startup location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
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
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="advertising">Advertising</SelectItem>
                      <SelectItem value="gamesvideo">Games Video</SelectItem>
                      <SelectItem value="ecommerce">Ecommerce</SelectItem>
                      <SelectItem value="biotech">BioTech</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other category">
                        Other Category
                      </SelectItem>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding Type Received</FormLabel>
                <FormControl>
                  <>
                    <div>
                      <Checkbox
                        value="VC"
                        checked={field.value.includes("VC")}
                        onCheckedChange={(checked) =>
                          checked
                            ? field.onChange([...field.value, "VC"])
                            : field.onChange(
                                field.value.filter((v) => v !== "VC")
                              )
                        }
                      />
                      <Label>VC</Label>
                    </div>
                    <div>
                      <Checkbox
                        value="Angel"
                        checked={field.value.includes("Angel")}
                        onCheckedChange={(checked) =>
                          checked
                            ? field.onChange([...field.value, "Angel"])
                            : field.onChange(
                                field.value.filter((v) => v !== "Angel")
                              )
                        }
                      />
                      <Label>Angel</Label>
                    </div>
                    <div>
                      <Checkbox
                        value="roundA"
                        checked={field.value.includes("roundA")}
                        onCheckedChange={(checked) =>
                          checked
                            ? field.onChange([...field.value, "roundA"])
                            : field.onChange(
                                field.value.filter((v) => v !== "roundA")
                              )
                        }
                      />
                      <Label>Round A</Label>
                    </div>
                    <div>
                      <Checkbox
                        value="roundB"
                        checked={field.value.includes("roundB")}
                        onCheckedChange={(checked) =>
                          checked
                            ? field.onChange([...field.value, "roundB"])
                            : field.onChange(
                                field.value.filter((v) => v !== "roundB")
                              )
                        }
                      />
                      <Label>Round B</Label>
                    </div>
                    <div>
                      <Checkbox
                        value="roundC"
                        checked={field.value.includes("roundC")}
                        onCheckedChange={(checked) =>
                          checked
                            ? field.onChange([...field.value, "roundC"])
                            : field.onChange(
                                field.value.filter((v) => v !== "roundC")
                              )
                        }
                      />
                      <Label>Round C</Label>
                    </div>
                  </>
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
                <FormLabel>
                  Avg number of participants in the startup's funding round
                </FormLabel>
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      style={{ marginRight: "8px" }}
                    />
                    <FormLabel>Is the startup in the top 500?</FormLabel>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {prediction && (
        <div className="flex flex-col items-center">
          <h1>Result</h1>
          <p>{value ? "Acquired" : "Closed"}</p>
        </div>
      )}

      <p>{completion}</p>
    </div>
  );
}
