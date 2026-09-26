const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });

export async function onRequestGet({ env }) {
  const raw = await env.SITE_CONTENT.get("site-data");

  if (!raw) {
    return json({ error: "No live data saved yet" }, 404);
  }

  return new Response(raw, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export async function onRequestPost({ request, env }) {
  const key = request.headers.get("x-admin-key");

  if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) {
    return json({ error: "Unauthorized" }, 401);
  }

  let data;

  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  if (!data?.business || !data?.prices || !data?.photos) {
    return json({ error: "Invalid site data" }, 400);
  }

  await env.SITE_CONTENT.put("site-data", JSON.stringify(data));

  return json({
    ok: true,
    savedAt: new Date().toISOString()
  });
}
