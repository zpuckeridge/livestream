import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import supabase from "../lib/supabase";
import { secondsToTime } from "../components/TimeConverter";
import { useState } from "react";
import { FiHeart, FiSearch } from "react-icons/fi";
import dateFormat from "dateformat";
import ClipViews from "../components/ClipViews";

export async function getServerSideProps() {
  const response = await fetch(`${process.env.DEV_PAGE_URL}/api/asset`);
  const { asset } = await response.json();

  const { data, error } = await supabase.from("livestream").select("*");

  data?.forEach((data: any) => {
    data.timestamp = dateFormat(data.timestamp, "mmmm dS, yyyy");
  });

  return {
    props: {
      data: data
        ? data.map((item: any) => ({
            ...item,
            asset: asset.find((a: any) => a.id === item.asset_id),
          }))
        : [],
    },
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
        <div className="relative w-full mb-4">
          <input
            aria-label="Search videos"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search videos"
            className="block w-full placeholder:text-[#888888] px-4 py-2 bg-white/5 border border-zinc-800/50 rounded-lg hover:ring-2 ring-gray-300 transition-all text-white"
          />
          <FiSearch className="absolute w-5 h-5 right-3 top-3 text-[#888888]" />
          <div className="inline-flex space-x-2 mt-2">
            <button className="py-1 px-6 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
              Gaming
            </button>
            <button className="py-1 px-6 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
              Life
            </button>
            <button className="py-1 px-6 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
              Other
            </button>
          </div>
        </div>
        <div className="mt-10 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
          {filteredVideos.map((data: any) => (
            <div key={data.asset_id}>
              <Link href={`/clip/${data.asset_id}`} title={data.title}>
                <div className="transform hover:scale-[1.05] h-full w-full transition-all">
                  <div className="absolute top-2 left-2 rounded-md bg-black/75 p-1 text-xs font-semibold">
                    {data.tag}
                  </div>
                  <div className="absolute top-2 right-2 rounded-md bg-black/75 p-1 text-xs font-semibold">
                    {secondsToTime(data.asset.duration)}
                  </div>
                  <Image
                    src={`https://image.mux.com/${data.asset.playback_ids[0].id}/thumbnail.png`}
                    alt={data.title}
                    width={400}
                    height={400}
                    className="rounded-2xl aspect-video"
                  />
                  <div className="flex justify-between mt-1">
                    <div className="font-bold text-lg truncate w-56 text-white">
                      {data.title}
                    </div>
                    <div className="inline-flex my-auto">
                      {data.likes}
                      <FiHeart className="my-auto ml-2" />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-[#888888] font-semibold">
                    <p>{data.timestamp}</p>
                    <ClipViews slug={data.asset_id} />
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

// Tag buttons on press should only show videos with same tag
// Should only display 16 videos per page, and use pagination, search might not work then
// Need to make sure videos are sorted by created date.
