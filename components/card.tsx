import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  id: string;
}

const Card = ({ title, subtitle, description, id }: Props) => {
  return (
    <div className="w-full h-auto p-4 py-6 bg-slate-100 rounded-[10px]">
      <div className="space-y-3">
        <h2 className="text-lg text-slate-600">{title}</h2>
        <p className="text-sm text-slate-700">{subtitle}</p>
        <p className="text-sm text-slate-700 line-clamp-3">{description}</p>
        <Link
          href={`/managers/${id}`}
          className="flex w-max items-center justify-center bg-slate-900 text-white text-sm hover:opacity-90 rounded-full h-9 p-3"
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Card;
