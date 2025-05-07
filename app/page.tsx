import { Container } from "@/components/container";
import Link from "next/link";

const links = [
  { id: 1, title: "Managers Page", url: "/managers" },
  { id: 2, title: "Identites Page", url: "/identities" },
  { id: 3, title: "Jobs Page", url: "/jobs" },
  { id: 4, title: "Form actions", url: "/forms" },
  { id: 5, title: "Form templates", url: "/form-templates" },
  { id: 6, title: "Form Response", url: "/forms-responses" },
  { id: 7, title: "Public form links", url: "/form-links" },
];

const Home = async () => {
  return (
    <Container>
      <div className="min-h-[100vh] py-[100px]">
        <h1 className="text-3xl md:text-4xl text-slate-600 font-medium mb-8">
          Welcome
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <Link
              href={item.url}
              key={item.id}
              className="h-[200px] w-full bg-sky-300 rounded-2xl p-3 flex items-center justify-center"
            >
              <p className="text-xl font-semibold w-max text-slate-700 hover:underline">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;
