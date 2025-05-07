import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  fullName: string;
  companyName: string;
  companyDescription: string;
  id: string;
}

const ManagerCard = ({
  fullName,
  companyName,
  companyDescription,
  id,
}: Props) => {
  return (
    <div className="w-full h-auto p-4 py-6 bg-slate-100 rounded-[10px]">
      <div className="space-y-3">
        <h2 className="text-lg text-slate-600">{fullName}</h2>
        <p className="text-sm text-slate-700">{companyName}</p>
        <p className="text-sm text-slate-700 line-clamp-3">
          {companyDescription}
        </p>
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

export default ManagerCard;
