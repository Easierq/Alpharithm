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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { DeleteModal } from "@/components/delete-modal";
import { Job } from "@/types";

const formSchema = z.object({
  title: z.string().min(1),
  country: z.string().min(1),
  whyJoinUs: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  jobData: Job | null;
}

export const JobForm = ({ jobData }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(jobData);

  const initial = jobData?.title;
  const title = initial ? "Edit Job" : "Create Job";
  const description = initial ? "Make change to this Job" : "Add a new Job";
  const toastMessage = initial ? "Job Updated." : "Job Created.";
  const action = initial ? "Update changes" : "Create";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: jobData || {
      title: "",
      country: "",
      whyJoinUs: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      setLoading(true);
      if (jobData?.createdAt) {
        await apiRequest.patch(`/jobs/${params.id}`, data);
      } else {
        await apiRequest.post(
          "/jobs",
          {
            title: data.title,
            country: data.country,
            whyJoinUs: data.whyJoinUs,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      router.refresh();
      router.push("/jobs");
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
      await apiRequest.delete(`/jobs/${params.id}`);
      router.refresh();
      router.push("/jobs");
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
        {jobData?.createdAt && (
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">Country</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whyJoinUs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">Why join us</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Why join us"
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
