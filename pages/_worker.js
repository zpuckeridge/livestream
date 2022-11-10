// API URL with relevant calls
const baseURL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ID}/stream/`;

// gatherResponse awaits and returns a response body as a string. * Use await gatherResponse(..) in an async function to get the response body * @param {Response} response
async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json(), null, 2);
  }
  return response.text();
}

async function handleRequest(id) {
  const init = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Auth-Key": `${CLOUDFLARE_TOKEN}`,
      "X-Auth-Email": `${CLOUDFLARE_EMAIL}`,
      "content-type": "application/json",
    },
  };

  const response = await fetch(`${baseURL}${id}`, init);
  const results = await gatherResponse(response);

  return new Response(results, init);
}

addEventListener("fetch", (event) => {
  // can use if statements here for multi-function
  const url = new URL(event.request.url);
  const idMatcher = new RegExp("^/(?<id>[a-zA-Z0-9-%]+)");
  const parsedId = url.pathname.match(idMatcher);
  return event.respondWith(handleRequest(parsedId ? parsedId.groups.id : ""));
});
