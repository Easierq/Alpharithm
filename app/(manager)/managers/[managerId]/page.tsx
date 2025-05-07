import { getData } from "@/lib/get-data";
import { ManagerForm } from "./components/manager-form";
import { Manager } from "@/types";
import { Container } from "@/components/container";

const baseUrl = process.env.BASE_URL;

const ManagerPage = async ({ params }: { params: { managerId: string } }) => {
  const manager = await getData<Manager>(
    `${baseUrl}/managers/${params.managerId}`
  );

  return (
    <Container>
      <div className="min-h-[100vh] pt-[100px]">
        <div className="flex-col">
          <div className="flex-1 space-y-4">
            <ManagerForm managerData={manager} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ManagerPage;
