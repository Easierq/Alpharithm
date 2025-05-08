import { getData } from "@/lib/get-data";
import { IdentityForm } from "./components/identity-form";
import { Identity } from "@/types";
import { Container } from "@/components/container";

const baseUrl = process.env.BASE_URL;

const IdentitesId = async ({
  params,
}: {
  params: { managerId: string; id: string };
}) => {
  const identity = await getData<Identity>(
    `${baseUrl}/managers/${params.managerId}/identities/${params.id}`
  );

  return (
    <Container>
      <div className="min-h-[100vh] pt-[100px]">
        <div className="flex-col">
          <div className="flex-1 space-y-4">
            <IdentityForm identityData={identity} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default IdentitesId;
