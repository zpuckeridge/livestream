import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "./skeleton";
import { secondsToTime } from "./time";
import dateFormat from "dateformat";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function GetClips() {
  const [loading, setLoading] = useState(true);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/cloudflare`,
    fetcher,
    {
      suspense: true,
    }
  );

  if (error) return <div>Failed to load</div>;

  let skeletonCards = Array(3).fill(0);

  return (
    <Suspense
      fallback={
        <>
          {skeletonCards.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </>
      }
    >
      <div className="mt-10 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 m-4">
        {data.result.map(
          (v: {
            uploaded: string | number | Date | undefined;
            duration: number;
            thumbnail: string;
            meta: any;
            uid: string;
          }) => {
            return (
              <div key={v.uid}>
                <Link
                  href={{
                    pathname: `/clip/[id]`,
                    query: {
                      id: `${v.uid}`,
                    },
                  }}
                >
                  <div className="transform hover:scale-[1.05] transition-all">
                    <Image
                      src={v.thumbnail}
                      alt={v.meta.name}
                      width={640}
                      height={360}
                      className="rounded-2xl"
                      priority
                    />
                    <h1 className="font-bold mt-2">{v.meta.name}</h1>
                    <div className="flex justify-between">
                      <h1>{dateFormat(v.uploaded, "dS mmmm yyyy")}</h1>
                      <h1>{secondsToTime(v.duration)}</h1>
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
        )}
      </div>
    </Suspense>
  );
}
