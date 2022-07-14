export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const handleListVideos = (err, data) => {
    return res.status(200).json(data);
  };

  var cf = require("cloudflare")({
    email: process.env.CLOUDFLARE_EMAIL,
    key: process.env.CLOUDFLARE_KEY,
  });

  if (req.method === "GET") {
    const accountId = process.env.CLOUDFLARE_ID;
    const listVideoPayload = { limit: 3, asc: "true" };
    return cf.stream
      .listVideos(accountId, listVideoPayload)
      .then((response) => {
        return handleListVideos(null, response);
      })
      .catch((error) => {
        console.error("Could not list videos", error);
        res
          .status(500)
          .json({ error: `Could not list videos: ${error.message}` });
      });
  }
  res.status(200).end();
}
