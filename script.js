document.addEventListener("DOMContentLoaded",()=>{

const sos=document.getElementById("sosBtn");
const locationBtn=document.getElementById("locationBtn");
const locationBox=document.getElementById("locationBox");
const reportBtn=document.getElementById("reportBtn");
const reportText=document.getElementById("reportText");
const status=document.getElementById("status");

sos.addEventListener("click",()=>{

let count=5;

sos.disabled=true;

const timer=setInterval(()=>{

sos.innerText=`SOS in ${count}`;

count--;

if(count<0){

clearInterval(timer);

sos.innerText="SOS Activated";

alert("Emergency SOS Activated");

setTimeout(()=>{
sos.innerText="SOS Emergency";
sos.disabled=false;
},2000);

}

},1000);

});

locationBtn.addEventListener("click",()=>{

navigator.geolocation.getCurrentPosition(pos=>{

locationBox.innerHTML=`
<strong>Live Location</strong><br>
Lat: ${pos.coords.latitude.toFixed(5)}<br>
Lng: ${pos.coords.longitude.toFixed(5)}
`;

});

});

reportBtn.addEventListener("click",()=>{

if(reportText.value===""){

status.style.color="#f87171";
status.innerText="Please enter a report.";
return;

}

status.style.color="#86efac";
status.innerText="Report submitted.";

reportText.value="";

});

});