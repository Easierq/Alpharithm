import { Manager } from "@/types";

import { Container } from "@/components/container";
import { getData } from "@/lib/get-data";

import ManagerCard from "@/components/manager-card";
import { Plus } from "lucide-react";
import Link from "next/link";

const baseUrl = process.env.BASE_URL;

const Home = async () => {
  const managers = await getData<Manager[]>(`${baseUrl}/managers`);

  return (
    <Container>
      <div className="min-h-[100vh] py-[100px]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-slate-600 font-bold">Managers</h1>

          <Link
            href={`/managers/new`}
            className="flex items-center justify-center bg-slate-900 text-white text-sm hover:opacity-90 rounded-full h-9 p-3"
          >
            <Plus className="h-4 w-4 text-white hover:text-slate-900" />
            Add new
          </Link>
        </div>
        <div className="grid gap-4 gap-y-12 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {managers.map((mg) => (
            <div key={mg.id}>
              <ManagerCard
                fullName={mg.fullName}
                companyName={mg.companyName}
                companyDescription={mg.companyDescription}
                id={mg.id}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;
