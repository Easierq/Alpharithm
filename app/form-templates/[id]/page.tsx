import { getData } from "@/lib/get-data";
import { Template } from "@/types";
import { Container } from "@/components/container";
import { TemplateForm } from "./components/template-form";

const baseUrl = process.env.BASE_URL;

const FormTemplateId = async ({ params }: { params: { id: string } }) => {
  const template = await getData<Template>(
    `${baseUrl}/form-templates/${params.id}`
  );

  return (
    <Container>
      <div className="min-h-[100vh] pt-[100px]">
        <div className="flex-col">
          <div className="flex-1 space-y-4">
            <TemplateForm templateData={template} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FormTemplateId;
