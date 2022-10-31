var CLOUDFLARE_ID = "0139d167327c252643c7691dc8b25c33";

var cf = require("cloudflare")({
  email: "zacchary@puckeridge.me",
  key: "e5f80b8e52669c0ec2a2fc78eb54dde2fd0b8",
});

export default async function getVideos(req: any, res: any) {
  return new Promise<void>(async (resolve, reject) => {
    const data = await cf.stream
      .listVideos(`${CLOUDFLARE_ID}`)
      .then((response: any) => {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "max-age=180000");
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
