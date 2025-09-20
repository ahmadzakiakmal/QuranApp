import QuranIcon from "@/../public/arcticons_quran-indonesia.png";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Layout({ children }: { children: ReactNode }) {
  const [selectedMenu, SetSelectedMenu] = useState<"chapters" | "juz" | "verses">("chapters");

  return (
    <>
      <nav className="flex justify-between px-10">
        <div className="flex items-center">
          <Image
            priority
            src={QuranIcon}
            alt="QuranIcon"
          />
          <h1>
            <strong
              className="text-2xl"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              QuranApp
            </strong>
          </h1>
        </div>
        <ThemeToggle />
      </nav>
      <main className="flex font-rubik">
        <aside className="p-5 ">
          <ul>
            <li>
              <button
                onClick={() => SetSelectedMenu("chapters")}
                className={selectedMenu === "chapters" ? "font-bold" : ""}
              >
                <span>Chapters</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => SetSelectedMenu("juz")}
                className={selectedMenu === "juz" ? "font-bold" : ""}
              >
                <span>Juz</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => SetSelectedMenu("verses")}
                className={selectedMenu === "verses" ? "font-bold" : ""}
              >
                <span>Verses</span>
              </button>
            </li>
          </ul>
        </aside>

        <section>{children}</section>
      </main>
    </>
  );
}

