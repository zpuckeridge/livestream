import type { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";
const { Video } = new Mux();

// Defining an async function to handle file uploads
export default async function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Switch case to handle different HTTP methods
  switch (method) {
    case "POST":
      try {
        // Creating a new asset on Mux using the Mux API
        const upload = await Video.Uploads.create({
          new_asset_settings: { playback_policy: "public" },
          cors_origin: "*",
        });

        // Returning the ID and URL of the newly created asset as a JSON response
        res.json({
          id: upload.id,
          url: upload.url,
        });
      } catch (e) {
        // Catching any errors that occur during the file upload and returning an error response
        console.error("Request error", e);
        res.status(500).json({ error: "Error creating upload" });
      }
      break;
    default:
      // Returning an error response if the HTTP method is not allowed
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
