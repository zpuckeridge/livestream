import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import ClipViews from "../../components/ClipViews";
import supabase from "../../lib/supabase";

export async function getServerSideProps() {
  const { data, error } = await supabase.from("livestream").select("*");

  if (error) {
    console.log(error);
    return;
  }

  return {
    props: { data },
  };
}

export default function Home({ data }: { data: any }) {
  const [searchValue, setSearchValue] = useState("");
  // Filter the videos based on the search value
  const filteredVideos = data.filter((search: any) =>
    search.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>sdelta | Clips</title>
      </Head>
      <div className="xl:max-w-6xl mx-auto mt-10 mb-20">
        <div className="m-4">
          <div className="relative w-full mb-4">
            <input
              aria-label="Search videos"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search videos"
              className="block w-full placeholder:text-[#888888] px-4 py-2 bg-white/5 border border-zinc-800/50 rounded-lg hover:ring-2 ring-gray-300 transition-all text-white"
            />
            <FiSearch className="absolute w-5 h-5 right-3 top-3 text-[#888888]" />
          </div>
        </div>
        <div className="mt-10 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 m-4">
          {filteredVideos.map((data: any) => (
            <div key={data.id}>
              <Link href={`/clip/${data.data}`}>
                <div className="transform hover:scale-[1.05] h-full w-full transition-all">
                  <p className="font-bold mt-2 text-lg truncate w-64 text-white">
                    {data.title}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm text-[#888888] font-semibold">
                      {data.timestamp}・ <ClipViews slug={data.id} />
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
