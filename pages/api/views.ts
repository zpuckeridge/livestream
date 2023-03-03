import type { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";

// Initialize a new instance of Mux Video
const { Data } = new Mux();

// Define the function that handles the API endpoint
export default async function viewHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the HTTP method of the request
  const { method } = req;

  // Use a switch statement to handle different HTTP methods
  switch (method) {
    case "GET":
      try {
        // Call the Mux Data API to retrieve view counts
        const views = await Data.Dimensions.get("playback_id"); // need to add timeframe here -- is it possible to do infinite?

        res.json({
          views,
        });
      } catch (e) {
        // If there was an error, log it and send an error response
        console.error("Request error", e);
        res.status(500).json({ error: "Error retrieving asset" });
      }
      break;
    default:
      // If the HTTP method is not GET, send an "Method Not Allowed" error response
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
