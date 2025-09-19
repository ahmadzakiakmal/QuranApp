"use client"
import { useEffect, useState } from "react"
import { Chapter } from "@/types/api"
import axios from "axios";

export default function Page() {
  const [chapters, SetChapter] = useState<Chapter[]>([]); 
  useEffect(() => {
    axios.get("/api/quran/chapters")
      .then((res) => {
        console.log(res)
        SetChapter(res.data.chapters)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return(
    <main>
      <h1><strong>QuranApp</strong></h1>


      <h2><strong>Chapters</strong></h2>
      <div className="grid gap-2 grid-cols-4">
        {
          chapters?.map((c) => {
            return(
              <a href={"/api/quran/chapters/"+c.id} key={c.id}><div >{c.name_complex}</div></a>
            )
          })
        }
      </div>
    </main>
  )
}