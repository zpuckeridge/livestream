import { useEffect, useRef, useState } from "react";
import * as UpChunk from "@mux/upchunk";
import Spinner from "../../components/Spinner";
import useSwr from "swr";
import router from "next/router";
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
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const { data, error } = useSwr(
    () => (isPreparing ? `/api/upload/${uploadId}` : null),
    fetcher,
    { refreshInterval: 5000 }
  );

  useEffect(() => {
    if (data && data.upload) {
      const finishUpload = async () => {
        await supabase.from("livestream").insert({
          title: title,
          asset_id: data.upload.asset_id,
          public: isPublic,
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 5000);
      };

      finishUpload();
    }
  }, [data]);

  if (data && data.upload) {
    return (
      <p className="text-center">
        Successfully uploaded!
        <br />
        Asset ID: {data.upload.asset_id}
      </p>
    );
  }

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
    const files = inputRef.current?.files;

    if (!title || !files) {
      setShowModal(true);
      return;
    }

    setIsUploading(true);

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
      {showModal && (
        <>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="text-white bg-[#1d1d1d] border border-zinc-800/50 rounded-lg p-10">
              <p className="text-lg font-medium mb-4">
                Please enter a title and/or select a file.
              </p>
              <button
                title="OK"
                className="mt-4 py-1 px-6 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all"
                onClick={() => setShowModal(false)}>
                OK
              </button>
            </div>
          </div>
        </>
      )}

      <div className="text-white bg-white/5 border border-zinc-800/50 rounded-lg p-10">
        {isUploading ? (
          <>
            {isPreparing ? (
              <div className="text-center">Preparing...</div>
            ) : (
              <div className="text-center">
                Uploading...{progress ? `${progress}%` : ""}
              </div>
            )}
            <Spinner />
          </>
        ) : (
          <>
            <label>
              <span className="font-bold">Choose a title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 rounded-lg bg-white/5 text-sm placeholder:text-[#888888]"
              />
            </label>
            <span className="font-bold">Select a video file</span>
            <label>
              <input
                type="file"
                ref={inputRef}
                className="w-full p-2 mb-4 rounded-lg bg-white/5 text-sm placeholder:text-[#888888]"
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="mr-2"
              />
              <span>Public</span>
            </label>
            <button
              onClick={startUpload}
              title="Upload"
              className="mt-4 py-1 px-6 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
              Upload
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default UploadForm;
