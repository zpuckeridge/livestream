import { useEffect, useRef, useState } from "react";
import * as UpChunk from "@mux/upchunk";
import Spinner from "../../components/Spinner";
import useSwr from "swr";
import Router from "next/router";
import supabase from "../../lib/supabase";

const fetcher = (url: string) => {
  return fetch(url).then((res) => res.json());
};

const UploadForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [uploadId, setUploadId] = useState(null);
  const [progress, setProgress] = useState<Number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, error } = useSwr(
    () => (isPreparing ? `/api/upload/${uploadId}` : null),
    fetcher,
    { refreshInterval: 5000 }
  );

  const upload = data && data.upload;

  useEffect(() => {
    if (upload && upload.asset_id) {
      Router.push({
        pathname: `/asset/${upload.asset_id}`,
      });
    }
  }, [upload]);

  const createUpload = async () => {
    try {
      return fetch("/api/upload", {
        method: "POST",
      })
        .then((res) => res.json())
        .then(({ id, url }) => {
          setUploadId(id);
          return url;
        });
    } catch (e) {
      console.error("Error in createUpload", e);
      setErrorMessage("Error creating upload");
    }
  };

  const startUpload = () => {
    setIsUploading(true);

    const files = inputRef.current?.files;
    if (!files) {
      setErrorMessage("An unexpected issue occurred");
      return;
    }

    const upload = UpChunk.createUpload({
      endpoint: createUpload,
      file: files[0],
    });

    upload.on("error", (err: any) => {
      setErrorMessage(err.detail.message);
    });

    upload.on("progress", (progress: any) => {
      setProgress(Math.floor(progress.detail));
    });

    upload.on("success", () => {
      setIsPreparing(true);
    });
  };

  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <>
      <div className="text-white bg-white/5 border border-zinc-800/50 rounded-lg p-10">
        {isUploading ? (
          <>
            {isPreparing ? (
              <div>Preparing...</div>
            ) : (
              <div>Uploading...{progress ? `${progress}%` : ""}</div>
            )}
            <Spinner />
          </>
        ) : (
          <>
            <label>
              <input type="file" onChange={startUpload} ref={inputRef} />
            </label>
          </>
        )}
      </div>
    </>
  );
};

export default UploadForm;
