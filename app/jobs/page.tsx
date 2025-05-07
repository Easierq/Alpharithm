import { Job } from "@/types";

import { Container } from "@/components/container";
import { getData } from "@/lib/get-data";

import Card from "@/components/card";
import { Plus } from "lucide-react";
import Link from "next/link";

const baseUrl = process.env.BASE_URL;

const Jobs = async () => {
  const jobs = await getData<Job[]>(`${baseUrl}/jobs`);

  return (
    <Container>
      <div className="min-h-[100vh] py-[100px]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-slate-600 font-bold">Jobs</h1>

          <Link
            href={`/jobs/new`}
            className="flex items-center justify-center bg-slate-900 text-white text-sm hover:opacity-90 rounded-full h-9 p-3"
          >
            <Plus className="h-4 w-4 text-white hover:text-slate-900" />
            Add new
          </Link>
        </div>
        <div className="grid gap-4 gap-y-12 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {jobs.map((item) => (
            <div key={item.id}>
              <Card
                title={item.title}
                subtitle={item.country}
                description={item.whyJoinUs}
                id={item.id}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Jobs;
