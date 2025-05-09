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
import { Identity } from "@/types";

const formSchema = z.object({
  identity: z.string().min(1),
  identityType: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  identityData: Identity | null;
}

export const IdentityForm = ({ identityData }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const initial = identityData?.identity;
  const title = initial ? "Edit Identity" : "Create Identity";
  const description = initial
    ? "Make change to this Identity"
    : "Add a new Identity";
  const toastMessage = initial ? "Identity Updated." : "Identity Created.";
  const action = initial ? "Update changes" : "Create";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: identityData || {
      identity: "",
      identityType: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      if (identityData?.createdAt) {
        await apiRequest.patch(
          `/managers/${params.managerId}/identities/${params.id}`,
          data
        );
        // {
        //   identity: data.identity,
        //   identityType: data.identityType,
        // },
      } else {
        await apiRequest.post(`/managers/${params.managerId}/identities`, {
          identity: "third.com or example@domain.com",
          identityType: "third",
        });
      }
      router.refresh();
      router.push(`/managers/${params.managerId}/identities`);
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);

      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await apiRequest.delete(
        `/managers/${params.managerId}/identities/${params.id}`
      );
      router.refresh();
      router.push(`/managers/${params.managerId}/identities`);
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
        {identityData?.createdAt && (
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
              name="identity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">Identity</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Identity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="identityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">Type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Identity type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="verificationStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">Status</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="verificationStatus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
