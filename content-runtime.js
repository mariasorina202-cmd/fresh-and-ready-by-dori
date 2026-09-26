
(function(){
 const d=window.SITE_DATA||{};
 document.querySelectorAll("[data-price]").forEach(el=>{
   const k=el.dataset.price;if(d.prices&&d.prices[k]!=null) el.textContent="£"+d.prices[k];
 });
 document.querySelectorAll("[data-business]").forEach(el=>{
   const k=el.dataset.business;if(d.business&&d.business[k]) el.textContent=d.business[k];
 });
 document.querySelectorAll("[data-photo]").forEach(el=>{
   const k=el.dataset.photo, u=d.photos&&d.photos[k];
   if(u){el.style.backgroundImage=`linear-gradient(rgba(20,35,27,.12),rgba(20,35,27,.12)),url("${u}")`;el.style.backgroundSize="cover";el.style.backgroundPosition="center";}
 });
})();
