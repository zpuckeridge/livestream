import CloudflareStream from "../lib/stream";
import GetClips from "../components/clips";

export default function Home() {
  return (
    <>
      <div className="xl:max-w-6xl mx-auto mt-10 mb-20">
        <div className="m-4 border-4 rounded-md shadow-xl">
          <CloudflareStream videoIdOrSignedUrl="4d4f99dc7903820b7fcd0c821a4880cf" />
        </div>
        <div>
          <GetClips />
        </div>
      </div>
    </>
  );
}
