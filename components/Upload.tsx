"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import useSwr from "swr";
import * as UpChunk from "@mux/upchunk";
import Link from "next/link";

const fetcher = (url: string) => {
  return fetch(url).then((res) => res.json());
};

export default function Upload() {
  const [uploadId, setUploadId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [final, setFinal] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [progress, setProgress] = useState<Number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  const { data, error } = useSwr(
    () => (final ? `/api/upload/${uploadId}` : null),
    fetcher,
    { refreshInterval: 5000 }
  );

  if (data && data.upload) {
    const finishUpload = async () => {
      const response = await fetch(`/api/asset/${data.upload.asset_id}`);
      const asset = await response.json();

      if (asset.status === "ready") {
        await fetch("/api/db/publish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            asset_id: data.upload.asset_id,
            playback_id: asset.playback_id,
            duration: Math.floor(asset.duration),
            title: title,
            tag: tag,
          }),
        });
      }

      setIsPreparing(false);
    };

    finishUpload();

    return (
      <>
        {isPreparing ? (
          <div className="text-center">
            <p className="text-lg font-medium">Preparing video...</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg font-medium">Upload complete!</p>
            <Link href={`/clip/${data.upload.asset_id}`} className="mt-4">
              <Button>View video</Button>
            </Link>
          </div>
        )}
      </>
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
    }
  };

  const startUpload = () => {
    const files = inputRef.current?.files;

    if (!title || !files) {
      alert("Please enter a title and select a file...");
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
      setFinal(true);
      setIsPreparing(true);
    });
  };

  return (
    <>
      <div className="space-y-2">
        {isUploading ? (
          <>
            <div className="text-center">
              <p className="text-lg font-medium">
                Uploading...
                {progress ? `${progress}%` : ""}
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <Label>Choose a title</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label>Select a video file</Label>
              <Input type="file" ref={inputRef} />
            </div>
            <div>
              <Label>Add a tag for the video</Label>
              <Input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>

            <Button onClick={startUpload} title="Upload">
              Upload
            </Button>
          </>
        )}
      </div>
    </>
  );
}
