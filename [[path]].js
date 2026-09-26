export async function onRequestGet({params,env}){
 if(!env.MEDIA_BUCKET)return new Response("Image storage unavailable",{status:500});
 const key=Array.isArray(params.path)?params.path.join("/"):params.path;
 const obj=await env.MEDIA_BUCKET.get(key); if(!obj)return new Response("Not found",{status:404});
 const h=new Headers();obj.writeHttpMetadata(h);h.set("etag",obj.httpEtag);h.set("cache-control","public, max-age=31536000, immutable");return new Response(obj.body,{headers:h});
}
export async function onRequestDelete({request,params,env}){
 if(!env.ADMIN_KEY||request.headers.get("x-admin-key")!==env.ADMIN_KEY)return new Response("Unauthorized",{status:401});
 const key=Array.isArray(params.path)?params.path.join("/"):params.path;await env.MEDIA_BUCKET.delete(key);return new Response(null,{status:204});
}
