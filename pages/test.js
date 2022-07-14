import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Heading, Box } from "@chakra-ui/react";
import { Cloudflare } from "../components/cloudflare";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Videos />
    </QueryClientProvider>
  );
}

function Videos() {
  const { isLoading, error, data } = useQuery(
    ["repoData"],
    async () => {
      try {
        const result = await fetch("/api/cloudflare");
        return await result.json();
      } catch (error) {
        throw error;
      }
    },
    { cacheTime: 0 }
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data.result.map((v) => {
        return <Cloudflare videoIdOrSignedUrl={v.uid} key={v.uid} />;
      })}
    </>
  );
}
