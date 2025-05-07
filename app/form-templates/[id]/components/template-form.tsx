"use client";

import { apiRequest } from "@/lib/axios";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { DeleteModal } from "@/components/delete-modal";
import { Template } from "@/types";

const formSchema = z.object({
  managerId: z.string().min(1),
  title: z.string().min(1),
  formType: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  templateData: Template | null;
}

export const TemplateForm = ({ templateData }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(templateData);

  const initial = templateData?.title;
  const title = initial ? "Edit Template" : "Create Template";
  const description = initial
    ? "Make change to this Template"
    : "Add a new Template";
  const toastMessage = initial ? "Template Updated." : "Template Created.";
  const action = initial ? "Update changes" : "Create";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: templateData || {
      managerId: "",
      title: "",
      formType: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      setLoading(true);
      if (templateData?.createdAt) {
        await apiRequest.patch(`/form-templates/${params.id}`, data);
      } else {
        await apiRequest.post(
          "/form-templates",
          {
            title: data.title,
            managerId: data.managerId,
            formType: data.formType,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      router.refresh();
      router.push("/form-templates");
      toast.success(toastMessage);
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await apiRequest.delete(`/form-templates/${params.id}`);
      router.refresh();
      router.push("/form-templates");
      toast.success("Manager deleted.");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <DeleteModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {templateData?.createdAt && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4 text-white" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="managerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">Manager Id</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Manager Id"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">Title</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="formType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">FormType</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="formtype"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="ml-auto bg-slate-900 text-white hover:text-white hover:bg-slate-900/90 rounded-full px-5"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
