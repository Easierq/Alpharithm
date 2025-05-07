"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="h-full min-h-screen flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-7xl font-bold text-slate-700">404</h1>
      <p className="font-semibold text-slate-500">
        We couldn&apos;t find the Pages you were looking for.
      </p>
      <Button
        className="hover:bg-slate-800/80 text-white bg-slate-800 rounded-[10px]"
        asChild
      >
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
