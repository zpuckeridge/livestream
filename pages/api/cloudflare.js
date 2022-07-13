export default function handler(req, res) {
  const handleListVideos = (err, data) => {
    return res.end(JSON.stringify(data));
  };

  var cf = require("cloudflare")({
    email: process.env.CLOUDFLARE_EMAIL,
    key: process.env.CLOUDFLARE_KEY,
  });

  if (req.method === "GET") {
    const accountId = process.env.CLOUDFLARE_ID;
    const listVideoPayload = { limit: 3, asc: "true" };
    cf.stream
      .listVideos(accountId, listVideoPayload)
      .then((response) => {
        return handleListVideos(null, response);
      })
      .catch((error) => {
        console.error(`Could not list videos: ${error}`);
      });
  }
}
