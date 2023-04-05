export default async function handler(req: any, res: any) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const pathsToRevalidate = ["/clips", "/"];

  try {
    // Loop through the paths and revalidate each one
    for (const path of pathsToRevalidate) {
      await res.revalidate(path);
    }
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
