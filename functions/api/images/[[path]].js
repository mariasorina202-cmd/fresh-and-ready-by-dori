export async function onRequestGet({params,env}) {
  if (!env.MEDIA_BUCKET) {
    return new Response("MEDIA_BUCKET R2 binding is missing", {status:500});
  }

  const path = Array.isArray(params.path)
    ? params.path.join("/")
    : params.path;

  if (!path) {
    return new Response("Image not found", {status:404});
  }

  const object = await env.MEDIA_BUCKET.get(path);

  if (!object) {
    return new Response("Image not found", {status:404});
  }

  const headers = new Headers();

  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, {
    headers
  });
}
