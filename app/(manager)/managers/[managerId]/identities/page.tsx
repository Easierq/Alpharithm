import { IdentityArray } from "@/types";

import { Container } from "@/components/container";
import { getData } from "@/lib/get-data";

import { Plus } from "lucide-react";
import Link from "next/link";
import Card from "@/components/card";

const baseUrl = process.env.BASE_URL;

const Identites = async ({ params }: { params: { managerId: string } }) => {
  const data = await getData<IdentityArray>(
    `${baseUrl}/managers/${params.managerId}/identities`
  );
  console.log(data);

  return (
    <Container>
      <div className="min-h-[100vh] py-[100px]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-slate-600 font-bold">Identities</h1>

          <Link
            href={`/managers/${params.managerId}/identities/new`}
            className="flex items-center justify-center bg-slate-900 text-white text-sm hover:opacity-90 rounded-full h-9 p-3"
          >
            <Plus className="h-4 w-4 text-white hover:text-slate-900" />
            Add new
          </Link>
        </div>
        <div className="grid gap-4 gap-y-12 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {data?.identities?.map((item) => (
            <div key={item.id}>
              <Card
                title={item.identity}
                subtitle={item.identityType}
                description={item.verificationStatus}
                id={item.id}
              />
            </div>
          ))}
        </div>
        {data?.count === 0 && (
          <p className="text-base font-bold text-slate-900">No Identity yet</p>
        )}
      </div>
    </Container>
  );
};

export default Identites;
