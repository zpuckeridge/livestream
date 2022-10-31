import { Key, ReactNode } from "react";
import UseSWR from "swr";
import Image from "next/image";
import Link from "next/link";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function getClips() {
  const { data, error } = UseSWR("/api/cloudflare", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <ul>
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
                </Link>

                <h1>Published: {v.uploaded}</h1>
                <h1>Length: {v.duration}</h1>
                <Image
                  src={v.thumbnail}
                  alt={v.meta.name}
                  width={100}
                  height={100}
                />
              </div>
            );
          }
        )}
      </ul>
    </div>
  );
}
