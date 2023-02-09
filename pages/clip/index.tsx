import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { secondsToTime } from "../../components/TimeConverter";
import dateFormat from "dateformat";
import { Search } from "react-feather";
import { useState } from "react";
import ClipViews from "../../components/ClipViews";

export async function getServerSideProps() {
  // Make a request to your API to fetch the video data
  const res = await fetch(`${process.env.PAGE_URL}/api/stream`);
  const data = await res.json();

  // Convert time to readable format
  data.result.forEach((video: any) => {
    video.uploaded = dateFormat(video.uploaded, "mmmm dS, yyyy");
    video.duration = secondsToTime(video.duration);
  });

  // Pass the data as a prop to your component
  return {
    props: { data },
  };
}

export default function Home({ data }: { data: any }) {
  const [searchValue, setSearchValue] = useState("");
  // Filter the videos based on the search value
  const filteredVideos = data.result.filter((search: any) =>
    search.meta.name.toLowerCase().includes(searchValue.toLowerCase())
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
            <Search className="absolute w-5 h-5 right-3 top-3 text-[#888888]" />
          </div>
          <div className="flex gap-2 text-white">
            <button className="p-2 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
              ARMA
            </button>
            <button className="p-2 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
              CSGO
            </button>
            <button className="p-2 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
              Other
            </button>
          </div>
        </div>
        <div className="mt-10 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 m-4">
          {filteredVideos.map((video: any) => (
            <div key={video.uid}>
              <Link href={`/clip/${video.uid}`}>
                <div className="transform hover:scale-[1.05] transition-all">
                  <Image
                    src={video.thumbnail}
                    alt={video.meta.name}
                    width={640}
                    height={360}
                    className="rounded-2xl"
                  />
                  <p className="font-bold mt-2 text-lg truncate w-64 text-white">
                    {video.meta.name}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm text-[#888888] font-semibold">
                      {video.uploaded}・ <ClipViews slug={video.uid} />
                    </p>
                    <p className="text-sm text-[#888888] font-semibold">
                      {video.duration}
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
