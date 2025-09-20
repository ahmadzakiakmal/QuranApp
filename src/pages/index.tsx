import { Chapter } from "@/types/api";
import chaptersData from "@/data/chapters.json";
import Layout from "@/components/Layout";

export default function Page() {
  const chapters = chaptersData as Chapter[];
  return (
    <Layout>
      <main>
        <h2>
          <strong>Chapters</strong>
        </h2>
        <div className="grid gap-2 grid-cols-4">
          {chapters?.map((c) => {
            return (
              <a
                href={"/api/quran/chapters/" + c.id}
                key={c.id}
              >
                <div>{c.name_arabic}</div>
                <div>{c.name_complex}</div>
              </a>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}

