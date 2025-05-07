import { getData } from "@/lib/get-data";
import { JobForm } from "./components/job-form";
import { Job } from "@/types";
import { Container } from "@/components/container";

const baseUrl = process.env.BASE_URL;

const JobId = async ({ params }: { params: { id: string } }) => {
  const job = await getData<Job>(`${baseUrl}/jobs/${params.id}`);

  return (
    <Container>
      <div className="min-h-[100vh] pt-[100px]">
        <div className="flex-col">
          <div className="flex-1 space-y-4">
            <JobForm jobData={job} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default JobId;
