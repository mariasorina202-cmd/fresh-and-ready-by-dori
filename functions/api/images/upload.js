const json=(d,s=200)=>new Response(JSON.stringify(d),{status:s,headers:{"content-type":"application/json"}});

export async function onRequestPost({request,env}){
 if(!env.ADMIN_KEY||request.headers.get("x-admin-key")!==env.ADMIN_KEY)return json({error:"Unauthorized"},401);
 if(!env.MEDIA_BUCKET)return json({error:"MEDIA_BUCKET R2 binding is missing"},500);

 const form=await request.formData(), file=form.get("file");

 if(!file||typeof file==="string")return json({error:"No image supplied"},400);
 if(!file.type?.startsWith("image/"))return json({error:"Images only"},400);
 if(file.size>10*1024*1024)return json({error:"Image must be 10MB or smaller"},400);

 const ext=(file.name.split(".").pop()||"jpg")
   .replace(/[^a-z0-9]/gi,"")
   .toLowerCase();

 const key=`${Date.now()}-${crypto.randomUUID()}.${ext}`;

 await env.MEDIA_BUCKET.put(
   key,
   await file.arrayBuffer(),
   {httpMetadata:{contentType:file.type}}
 );

 return json({
   ok:true,
   key,
   url:`/api/images/${key}`
 });
}
