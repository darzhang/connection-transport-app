"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { registrationFormSchema } from "@/lib/validation";
import { signIn } from "next-auth/react";

const RegistrationForm = () => {
  // React Hook Form
  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle Form Submit
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: z.infer<typeof registrationFormSchema>) => {
    setLoading(true);
    try {
      // Create User
      const createUserResponse = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const createUserResponseData = await createUserResponse.json();

      // Check if there are any errors
      if (!createUserResponse.ok) {
        throw new Error(createUserResponseData.error);
      }

      // Show success message if there is no error thrown
      toast.success("Account created successfully", {
        description: "Please wait while we log you in",
        duration: 5000,
      });

      // Handle Login after the user has been created
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (error: any) {
      setLoading(false);
      toast.error("Something went wrong", {
        description: error.message,
        duration: 5000,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 p-4 md:w-[500px]"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="w-full" type="submit">
          {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;
