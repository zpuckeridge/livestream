"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRef, useState } from "react";
import useSwr from "swr";
import * as UpChunk from "@mux/upchunk";
import { Eye, Loader2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function Upload() {
  const [uploadId, setUploadId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [final, setFinal] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [progress, setProgress] = useState<Number>(0);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [visibility, setVisibility] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();

  const fetcher = (url: string) => {
    return fetch(url, {
      method: "POST", // Adjust the HTTP method as needed
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: uploadId }),
    }).then((res) => res.json());
  };

  const { data, error } = useSwr(
    () => (final ? [`/api/upload/${uploadId}`] : null),
    fetcher,
    { refreshInterval: 5000 },
  );

  if (data && data.upload) {
    const assetStatus = data.upload.status;

    if (assetStatus === "asset_created" && isPreparing) {
      finishUpload();
    }

    return (
      <>
        {isPreparing ? (
          <div className="flex justify-center my-20">
            <div>
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          </div>
        ) : (
          <div className="my-20">
            <p className="text-center">Upload Complete!</p>
          </div>
        )}
      </>
    );
  }

  async function finishUpload() {
    try {
      const response = await fetch(`/api/asset/${data.upload.asset_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.upload.asset_id }),
      });

      const asset = await response.json();

      if (asset.status === "ready") {
        try {
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
              description: description,
              tag: tag,
              visibility: visibility,
            }),
          });

          toast({
            title: "Upload Successful!",
            description: `Your video ${title} was uploaded successfully. 🎉`,
            action: (
              <Link href={`/clip/${data.upload.asset_id}`}>
                <ToastAction altText="View">View</ToastAction>
              </Link>
            ),
          });

          setIsPreparing(false);

          router.refresh();
        } catch (error) {
          console.error("Error in publishing the video.", error);
          toast({
            title: "Upload Failed!",
            description: `Your video ${title} was not uploaded. 🎉`,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
    }
  }

  async function createUpload() {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create upload.");
      }

      const data = await response.json();

      // Return the entire data object including url and id
      return data;
    } catch (error) {
      console.error("Error in creating the upload link.", error);
      throw error; // Re-throw the error to handle it in the caller function
    }
  }

  function startUpload() {
    const files = inputRef.current?.files;

    if (!title || !files) {
      alert("Please enter a title and select a file...");
      return;
    }

    setIsUploading(true);

    createUpload()
      .then((data) => {
        const upload = UpChunk.createUpload({
          endpoint: data.url, // Use the URL from the data object
          file: files[0],
        });

        upload.on("error", (err) => {
          setErrorMessage(err.detail.message);
        });

        upload.on("progress", (progress) => {
          setProgress(Math.floor(progress.detail));
        });

        upload.on("success", () => {
          setIsPreparing(true);
          setFinal(true);
          setUploadId(data.id);
        });
      })
      .catch((error) => {
        // Handle the error from createUpload
        console.error("Error in starting the upload.", error);
      });
  }

  return (
    <>
      <div className="space-y-2">
        {isUploading ? (
          <>
            <div className="my-20">
              <Progress
                value={progress ? Number(progress) : 0}
                className="w-full"
              />
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Enter a name for your video.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Enter a short description for your video.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Tag</Label>
                <Input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Set a tag for your video.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>File</Label>
                <Input type="file" ref={inputRef} required />
                <p className="text-sm text-muted-foreground">
                  Select a valid video file.
                </p>
              </div>
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <Eye />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Visibility</p>
                  <p className="text-sm text-muted-foreground">
                    Should this video be public?
                  </p>
                </div>
                <Switch
                  id="visibility"
                  checked={visibility}
                  onCheckedChange={(checked: boolean) => setVisibility(checked)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={startUpload}>Start Upload</Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
