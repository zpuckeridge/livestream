import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import supabase from "../../lib/supabase";

export async function getServerSideProps() {
  const response = await fetch(`${process.env.DEV_PAGE_URL}/api/asset`);
  const { asset } = await response.json();

  const { data, error } = await supabase.from("livestream").select("*");

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

export default function Home({ asset, data }: { asset: any; data: any }) {
  return (
    <>
      <Head>
        <title>sdelta | Clips</title>
      </Head>
      <div className="xl:max-w-6xl mx-auto mt-10 mb-20">
        <div className="mt-10 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 m-4">
          {data.map((data: any) => (
            <div key={data.asset_id}>
              <Link href={`/clip/${data.asset_id}`}>
                <div className="transform hover:scale-[1.05] h-full w-full transition-all">
                  <Image
                    src={`https://image.mux.com/${data.asset.playback_ids[0].id}/thumbnail.png`}
                    alt={data.title}
                    width={400}
                    height={400}
                    className="rounded-2xl"
                  />
                  <p className="font-bold mt-2 text-lg truncate w-64 text-white">
                    {data.title}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm text-[#888888] font-semibold">
                      {data.timestamp}
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
