import { useRef, useState } from "react";
import * as UpChunk from "@mux/upchunk";
import supabase from "../../lib/supabase";
import router from "next/router";

const UploadForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [progress, setProgress] = useState<Number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({});

  const createUpload = async () => {
    try {
      return fetch("/api/upload", {
        method: "POST",
      })
        .then((res) => res.json())
        .then(({ url, playback_id }) => {
          return { url, playback_id };
        });
    } catch (e) {
      console.error("Error in createUpload", e);
      setErrorMessage("Error creating upload");
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please attach a video before submitting!");
      return;
    }

    setIsUploading(true);

    const files = inputRef.current?.files;
    if (!files) {
      setErrorMessage("An unexpected error has occurred.");
      return;
    }

    const response = await createUpload();

    if (
      typeof response !== "object" ||
      !response.hasOwnProperty("url") ||
      !response.hasOwnProperty("playback_id")
    ) {
      setErrorMessage("Error creating upload");
      return;
    }

    const { url, playback_id } = response;

    const upload = UpChunk.createUpload({
      endpoint: url,
      file: files[0],
    });

    upload.on("error", (err: any) => {
      setErrorMessage(err.detail.message);
    });

    upload.on("progress", (progress: any) => {
      setProgress(Math.floor(progress.detail));
    });

    upload.on("success", async () => {
      console.log(playback_id);
      const updatedForm = { ...formData, playback_id: playback_id };
      await supabase.from("livestream").insert(updatedForm);
      setTimeout(() => {
        router.push("/dashboard");
      }, 5000);
    });
  };

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <>
      <div className="text-white bg-white/5 border border-zinc-800/50 rounded-lg p-10">
        {isUploading ? (
          <>
            <div>Uploading...{progress ? `${progress}%` : ""}</div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold">Name</label>
                <input
                  type="text"
                  name="title"
                  className="block w-full placeholder:text-[#888888] px-4 py-2 bg-white/5 border border-zinc-800/50 rounded-lg hover:ring-2 ring-gray-300 transition-all text-white"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Select a video file</label>
                <div className="flex justify-between">
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={(event) => {
                      if (event.target.files) {
                        setSelectedFile(event.target.files[0]);
                      }
                    }}
                  />
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="px-6 py-1 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default UploadForm;
