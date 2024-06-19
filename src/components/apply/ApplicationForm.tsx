"use client";

import { useForm } from "react-hook-form";
import { object, optional, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Cities from "./Cities";
import Positions from "./Positions";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Link from "next/link";
import { CITIES, POSITIONS } from "@/lib/enums";
import { toast } from "react-toastify";

const ApplicationSchema = object({
  firstname: optional(string()),
  lastname: string({ required_error: "Last name is required" }),
  phone: string({
    required_error: "Phone number is required",
    invalid_type_error: "Invalid phone number",
  }),
});

type ApplicationData = z.infer<typeof ApplicationSchema>;

export default function ApplicationForm() {
  const [city, setCity] = useState("");
  const [position, setPosition] = useState("");

  const form = useForm<ApplicationData>({
    resolver: zodResolver(ApplicationSchema),
  });

  const { control, handleSubmit } = form;

  function onSubmit(data: ApplicationData) {
    (data as ApplicationData & { city: string; position: string }).city = city;
    (data as ApplicationData & { city: string; position: string }).position =
      position;

    const errors = [];

    if (
      !Object.values(CITIES).includes(
        (data as ApplicationData & { city: string; position: string })
          .city as CITIES
      )
    )
      errors.push("Invalid city");
    if (
      !Object.values(POSITIONS).includes(
        (data as ApplicationData & { city: string; position: string })
          .position as POSITIONS
      )
    )
      errors.push("Invalid field position");

    if (!isValidPhoneNumber(data.phone)) errors.push("Invalid phone number");

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    } else {
      // TODO: Send data to backend
      toast.success("Data sent to backend");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 bg-gray-500/40 px-3 py-5 rounded backdrop-blur-lg w-full max-w-[500px]"
      >
        <div>
          <h1 className="text-3xl md:text-4xl">
            Time to{" "}
            <span className="text-secondary-hover font-bold">
              chase your dream
            </span>
          </h1>
          <p className="text-white/60">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <FormField
            control={control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="md:w-[45%]">
                <FormLabel className="font-medium capitalize">
                  First name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="First name"
                    className="text-black"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="md:w-[45%]">
                <FormLabel className="font-medium capitalize">
                  Last name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last name"
                    className="text-black"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormItem className="flex flex-col">
          <FormLabel className="font-medium capitalize">City</FormLabel>
          <FormControl>
            <Cities value={city} setCity={setCity} />
          </FormControl>
        </FormItem>
        <FormItem className="flex flex-col">
          <FormLabel className="font-medium capitalize">Position</FormLabel>
          <FormControl>
            <Positions value={position} setPosition={setPosition} />
          </FormControl>
        </FormItem>
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium capitalize">
                Phone Number
              </FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder="Enter phone number"
                  {...field}
                  // className="px-3 py-2 text-black w-full"
                  numberInputProps={{
                    className:
                      " w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 text-black",
                  }}
                  defaultCountry="CM"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <Link href="/payment" className="text-secondary-hover">
            Already registered
          </Link>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
