import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { Loader2Icon, XIcon } from "lucide-react";
import { connectionFormSchema } from "@/lib/validation";
import { Connection, Stop } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useFetch from "@/hooks/useFetch";
import { CREATE_NEW_CONNECTION_API } from "@/constants/route";
import { toast } from "sonner";

type ConnectionFormProps = {
  stops: Stop[];
};

const ConnectionForm = ({ stops }: ConnectionFormProps) => {
  // Router
  const router = useRouter();

  // React Hook Form
  const form = useForm<z.infer<typeof connectionFormSchema>>({
    resolver: zodResolver(connectionFormSchema),
    defaultValues: {
      title: "",
      stops: [{ id: "" }],
    },
  });

  // Hook to add and remove stop field
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "stops",
  });

  const { data, loading, fetchData } = useFetch<Connection>();

  // Handle Form Submit
  const onSubmit = async (data: z.infer<typeof connectionFormSchema>) => {
    try {
      // Create Connection
      await fetchData({
        url: CREATE_NEW_CONNECTION_API,
        method: "POST",
        body: data,
      });

      // Show success message if there is no error thrown
      toast.success("Connection created successfully");

      // Redirect to the home page
      router.push("/");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 p-4 md:w-[600px]"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>{"Name"}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Connection Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stops */}
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            name={`stops.${index}.id`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Stop</FormLabel>
                <div className="flex flex-row items-center gap-2">
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="h-18">
                        <SelectValue placeholder="Select a stop" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent side="bottom" className="h-64 md:h-fit">
                      {stops.map((stop) => (
                        <SelectItem
                          key={String(stop.id)}
                          value={String(stop.id)}
                        >
                          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                            <div className="text-sm font-semibold">
                              {stop.title}
                            </div>
                            <div className="text-xs text-muted-foreground">{`Towards ${stop.direction}`}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant={"ghost"} size={"icon"}>
                    <XIcon
                      color="red"
                      onClick={() => {
                        console.log("index", index);
                        remove(index);
                      }}
                    />
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Add New Stop Button */}
        <Button
          type="button"
          disabled={loading}
          onClick={() =>
            append({
              id: "",
            })
          }
        >
          {"Add Stop"}
        </Button>

        <Button disabled={loading} className="w-full" type="submit">
          {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          {"Create Connection"}
        </Button>
      </form>
    </Form>
  );
};
export default ConnectionForm;
