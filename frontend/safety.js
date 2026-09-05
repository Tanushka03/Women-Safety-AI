document.addEventListener("DOMContentLoaded",()=>{

const score=document.getElementById("scoreValue");
const risk=document.getElementById("riskLevel");
const list=document.getElementById("analysisList");
const circle=document.getElementById("scoreCircle");
const btn=document.getElementById("checkAgain");

btn.addEventListener("click",()=>{

const value=Math.floor(Math.random()*41)+60;

score.innerText=value;

if(value>=80){

risk.innerText="Low Risk Area";
risk.style.color="#10b981";
circle.style.background="linear-gradient(135deg,#10b981,#2563eb)";

list.innerHTML=`
<li>Street lighting available.</li>
<li>CCTV nearby.</li>
<li>Emergency services nearby.</li>`;

}

else if(value>=70){

risk.innerText="Moderate Risk Area";
risk.style.color="#f59e0b";
circle.style.background="linear-gradient(135deg,#f59e0b,#2563eb)";

list.innerHTML=`
<li>Limited lighting.</li>
<li>Moderate crowd density.</li>
<li>Remain alert.</li>`;

}

else{

risk.innerText="High Risk Area";
risk.style.color="#ef4444";
circle.style.background="linear-gradient(135deg,#ef4444,#2563eb)";

list.innerHTML=`
<li>Poor lighting.</li>
<li>Low crowd density.</li>
<li>Use another route.</li>`;

}

});

});