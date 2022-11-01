var cf = require("cloudflare")({
  email: process.env.CLOUDFLARE_EMAIL,
  key: process.env.CLOUDFLARE_TOKEN,
});

export default async function getVideos(req: any, res: any) {
  return new Promise<void>(async (resolve, reject) => {
    const data = await cf.stream
      .listVideos(process.env.CLOUDFLARE_ID)
      .then((response: any) => {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response));
        resolve();
      })
      .catch((error: { message: any }) => {
        console.error("Could not list videos", error);
        res
          .status(500)
          .json({ error: `Could not list videos: ${error.message}` });
      });
    res.status(200).end();
  });
}
