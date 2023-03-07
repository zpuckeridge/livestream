import type { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";

// Initialize a new instance of Mux Video
const { Video } = new Mux();

// Define the function that handles the API endpoint
export default async function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the HTTP method of the request
  const { method } = req;

  // Use a switch statement to handle different HTTP methods
  switch (method) {
    case "GET":
      try {
        // Call the Mux Video API to get information about an upload
        const upload = await Video.Uploads.get(req.query.id as string);

        // Send a JSON response containing information about the upload
        res.json({
          upload: {
            status: upload.status,
            url: upload.url,
            asset_id: upload.asset_id,
          },
        });
      } catch (e) {
        // If there was an error, log it and send an error response
        console.error("Request error", e);
        res.status(500).json({ error: "Error getting upload/asset" });
      }
      break;
    default:
      // If the HTTP method is not GET, send an "Method Not Allowed" error response
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
