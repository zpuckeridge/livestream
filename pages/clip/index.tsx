import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { secondsToTime } from "../../components/time";
import dateFormat from "dateformat";
import { Search } from "react-feather";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.CLOUDFLARE_WORKER}`);
  const data = await res.json();

  return {
    props: { data },
  };
}

export default function Home({ data }: { data: any }) {
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
              // onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search videos"
              className="block w-full px-4 py-2 text-black border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-200 dark:bg-[#1d1f22] dark:text-gray-100 hover:ring-2 ring-gray-300 transition-all"
            />
            <Search className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300" />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1 text-sm font-semibold rounded-full border bg-gray-200 dark:bg-[#111111] border-gray-200 dark:border-gray-700 hover:ring-2 ring-gray-300 transition-all hover:dark:bg-[#1d1f22] hover:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-2">
              ARMA
            </button>
            <button className="px-4 py-1 text-sm font-semibold rounded-full border bg-gray-200 dark:bg-[#111111] border-gray-200 dark:border-gray-700 hover:ring-2 ring-gray-300 transition-all hover:dark:bg-[#1d1f22] hover:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-2">
              CSGO
            </button>
            <button className="px-4 py-1 text-sm font-semibold rounded-full border bg-gray-200 dark:bg-[#111111] border-gray-200 dark:border-gray-700 hover:ring-2 ring-gray-300 transition-all hover:dark:bg-[#1d1f22] hover:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-2">
              Other
            </button>
          </div>
        </div>
        <div className="mt-10 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 m-4">
          {data.result.map((video: any) => (
            <div key={video.uid}>
              <Link
                href={{
                  pathname: `clip/[id]`,
                  query: {
                    id: `${video.uid}`,
                  },
                }}
              >
                <div className="transform hover:scale-[1.05] transition-all">
                  <Image
                    src={video.thumbnail}
                    alt={video.meta.name}
                    width={640}
                    height={360}
                    className="rounded-2xl"
                    priority
                  />
                  <p className="font-bold mt-2 text-lg truncate w-64">
                    {video.meta.name}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm">
                      {dateFormat(video.uploaded, "dS mmm yy")} ・ 🤫 views
                    </p>
                    <p className="text-sm">{secondsToTime(video.duration)}</p>
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
