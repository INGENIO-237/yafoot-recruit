"use client";

import { useForm } from "react-hook-form";
import { object, string, z } from "zod";
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
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Link from "next/link";
import { toast } from "react-toastify";

const PaymentSchema = object({
  publicId: string({ required_error: "Please provide your public ID" }),
  phone: string({
    required_error: "Phone number is required",
    invalid_type_error: "Invalid phone number",
  }),
});

type PaymentData = z.infer<typeof PaymentSchema>;

const WaitlistSchema = object({
  publicId: string({ required_error: "Please provide your public ID" }),
});

type WaitlistData = z.infer<typeof WaitlistSchema>;

export default function PaymentForm() {
  const session = {
    _id: "sjkdjs9892893829skdlksa",
    date: "July 2024",
  };
  // const session = undefined;

  const form = useForm<PaymentData>({
    resolver: zodResolver(PaymentSchema),
  });

  const { control, handleSubmit } = form;

  function onSubmit(data: PaymentData) {
    const errors = [];

    if (!isValidPhoneNumber(data.phone)) errors.push("Invalid phone number");

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    } else {
      // TODO: Send data to backend
      toast.success("Data sent to backend");
    }
  }

  // Show waitlist form in case no recruitment session available
  const waitlistForm = useForm<WaitlistData>({
    resolver: zodResolver(WaitlistSchema),
  });

  const { control: waitlistControl, handleSubmit: handleWaitlistSubmit } =
    waitlistForm;

  function onSubmitWaitlist(data: WaitlistData) {
    // TODO: Send data to backend
    toast.success("Added the waitlist");
  }

  return (
    <Form {...form}>
      {session && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 bg-gray-500/40 px-3 py-5 rounded backdrop-blur-lg w-full max-w-[500px]"
        >
          <div>
            <h1 className="text-3xl md:text-4xl">
              Just one step to{" "}
              <span className="text-secondary-hover font-bold">your dream</span>
            </h1>
            <p className="text-white/60">
              You are about to pay{" "}
              <span className="text-secondary-hover font-bold">10.000 XAF</span>{" "}
              to participate to the recruitment session of{" "}
              <span className="text-secondary-hover font-bold">
                {session.date}
              </span>
            </p>
          </div>
          <FormField
            control={control}
            name="publicId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium capitalize">
                  Public ID
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your public ID"
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
            <Link href="/apply" className="text-secondary-hover">
              Not registered yet
            </Link>
            <Button type="submit">Pay</Button>
          </div>
        </form>
      )}
      {!session && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 bg-gray-500/40 px-3 py-5 rounded backdrop-blur-lg w-full max-w-[500px]"
        >
          <div>
            <h1 className="text-3xl md:text-4xl">
              No recruitment session available for the moment.{" "}
              <span className="text-secondary-hover font-bold">
                Join the waitlist
              </span>
              .
            </h1>
            <p className="text-white/60">
              Join the waitlist to get notified as soon as there is a new
              recruitment session available
            </p>
          </div>
          <FormField
            control={control}
            name="publicId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium capitalize">
                  Public ID
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your public ID"
                    className="text-black"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <Link href="/apply" className="text-secondary-hover">
              Not registered yet
            </Link>
            <Button type="submit">Join</Button>
          </div>
        </form>
      )}
    </Form>
  );
}
