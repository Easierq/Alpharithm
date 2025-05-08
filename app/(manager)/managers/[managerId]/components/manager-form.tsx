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
import { Manager } from "@/types";
import Link from "next/link";

const formSchema = z.object({
  fullName: z.string().min(1),
  companyName: z.string().min(1),
  // email: z.string().min(1),
  email: z.string().email().optional(),
  companyDescription: z.string().min(1),
});

type ManagerFormValues = z.infer<typeof formSchema>;

interface Props {
  managerData: Manager | null;
}

export const ManagerForm = ({ managerData }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const initial = managerData?.fullName;
  const title = initial ? "Edit Manager" : "Create Manager";
  const description = initial
    ? "Make change to this manager"
    : "Add a new Manager";
  const toastMessage = initial ? "Manager Updated." : "Manager Created.";
  const action = initial ? "Update changes" : "Create";

  const form = useForm<ManagerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: managerData || {
      fullName: "",
      companyName: "",
      email: "",
      companyDescription: "",
    },
  });

  const onSubmit = async (data: ManagerFormValues) => {
    try {
      setLoading(true);
      if (managerData?.createdAt) {
        await apiRequest.patch(`/managers/${params.managerId}`, data);
      } else {
        await apiRequest.post(
          "/managers",
          // data
          {
            fullName: data.fullName,
            companyName: data.companyName,
            email: data.email,
            companyDescription: data.companyDescription,
          }
        );
      }
      router.refresh();
      router.push("/managers");
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
      await apiRequest.delete(`/managers/${params.managerId}`);
      router.refresh();
      router.push("/managers");
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
          {managerData?.createdAt && (
            <div className="flex items-center justify-center gap-6 my-4">
              <Link
                href={`/managers/${params.managerId}/identities/new`}
                className="flex items-center justify-center bg-sky-700 text-white text-sm hover:opacity-90 rounded-full h-9 p-3"
              >
                Add Identity
              </Link>
              <Link
                href={`/managers/${params.managerId}/identities`}
                className="flex items-center justify-center text-sky-700 font-bold text-sm hover:opacity-90 rounded-full h-9 p-3"
              >
                All Identities
              </Link>
            </div>
          )}
        </div>
        {managerData?.createdAt && (
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Manager fullName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">Company name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Manager companyName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!managerData?.createdAt && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">
                      Company email
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Manager Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">
                    Company description
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Manager companyDescription"
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
