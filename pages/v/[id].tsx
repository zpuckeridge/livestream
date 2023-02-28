import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import MuxPlayer from "@mux/mux-player-react";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";

// Define the types for the route parameters
type Params = {
  id?: string;
};

// Define the getStaticProps function to fetch data for the page at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Extract the playbackId parameter from the route parameters
  const { id: playbackId } = params as Params;

  // Create the URL for the poster image based on the playbackId
  const poster = `https://image.mux.com/${playbackId}/thumbnail.png`;

  // Return the playbackId and poster image URL as props
  return { props: { playbackId, poster } };
};

// Define the getStaticPaths function to specify which route parameters to pre-generate
export const getStaticPaths: GetStaticPaths = () => {
  // Return an empty array for the paths, as this page will not have any pre-generated routes
  // Set fallback to true to enable dynamic route generation for unknown route parameters
  return {
    paths: [],
    fallback: true,
  };
};

// Define the Playback component, which will be rendered when the page is requested
export default function Playback({
  playbackId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // Get the router object to check if the page is still loading
  const router = useRouter();

  // If the page is still loading, display a spinner component
  if (router.isFallback) {
    return <Spinner />;
  }

  // If the page is not loading, render the MuxPlayer component with the specified props
  return (
    <MuxPlayer
      style={{ width: "100%" }}
      playbackId={playbackId}
      metadata={{ player_name: "with-mux-video" }}
    />
  );
}
