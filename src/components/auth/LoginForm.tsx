import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { loginFormSchema } from "@/lib/validation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  // Router
  const router = useRouter();

  // React Hook Form
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle Form Submit
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
      console.log(response);
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
        <Button disabled={loading} className="w-full" type="submit">
          {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
