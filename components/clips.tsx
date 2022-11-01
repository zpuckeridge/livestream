import { Key, ReactNode, useEffect, useState } from "react";
import UseSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "./skeleton";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function GetClips() {
  const [loading, setLoading] = useState(true);
  const { data, error } = UseSWR("/api/cloudflare", fetcher);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [data]);

  let skeletonCards = Array(2).fill(0);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      {loading ? (
        skeletonCards.map((index: number) => <SkeletonCard key={index} />)
      ) : (
        <div className="grid grid-cols-3 gap-4 m-4">
          {data.result.map(
            (v: {
              thumbnail: string;
              meta: any;
              uploaded: ReactNode;
              duration: ReactNode;
              uid: Key | null | undefined;
            }) => {
              return (
                <div className="mt-10" key="v">
                  <Link
                    href={{
                      pathname: `clip/[id]`,
                      query: {
                        id: `${v.uid}`,
                      },
                    }}
                    as={`clip/${v.uid}`}
                  >
                    <h1 className="font-bold">{v.meta.name}</h1>

                    <h1>Published: {v.uploaded}</h1>
                    <h1>Length: {v.duration}</h1>
                    <Image
                      src={v.thumbnail}
                      alt={v.meta.name}
                      width={640}
                      height={360}
                    />
                  </Link>
                </div>
              );
            }
          )}
        </div>
      )}
    </>
  );
}
