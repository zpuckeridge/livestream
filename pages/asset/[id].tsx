import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import useSwr from "swr";
import Spinner from "../../components/Spinner";

// Defining a function to fetch data from the server
const fetcher = (url: string) => {
  return fetch(url).then((res) => res.json());
};

// Defining a default function to be exported
export default function Asset() {
  // Using the useRouter() hook from Next.js to get the current route information
  const router = useRouter();

  // Using the useSwr() hook from SWR library to fetch data from the server
  const { data, error } = useSwr(
    () => (router.query.id ? `/api/asset/${router.query.id}` : null),
    fetcher,
    { refreshInterval: 5000 }
  );

  // Assigning the fetched data to the asset variable
  const asset = data && data.asset;

  // Using the useEffect() hook from React to redirect the user to the playback page when the asset is ready
  useEffect(() => {
    if (asset && asset.playback_id && asset.status === "ready") {
      Router.push(`/v/${asset.playback_id}`);
    }
  }, [asset]);

  // Checking for errors and setting an error message
  let errorMessage: string = "";

  if (error) {
    errorMessage = "Error fetching api";
  }

  if (data && data.error) {
    errorMessage = data.error;
  }

  if (asset && asset.status === "errored") {
    const message = asset.errors && asset.errors.messages[0];
    errorMessage = `Error creating this asset: ${message}`;
  }

  // Returning the appropriate UI based on the error message and asset status
  return (
    <>
      <div className="text-center">
        {errorMessage ? (
          <p>
            Go <Link href="/">back home</Link> to upload another video.
          </p>
        ) : (
          <>
            <div>Preparing...</div>
            <Spinner />
          </>
        )}
      </div>
    </>
  );
}

// This file queries /api/asset/[id].ts checking every 5 seconds if the asset has finished processing.
