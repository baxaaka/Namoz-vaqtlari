"use strict";

const regions = [...provencie];

// ============== DYNAMIC OPTIONS ===========

function renderOptions() {
   regions.sort();
   regions.forEach((item) => {
      const option = createElement("option", "item-option", item);
      $("#region").appendChild(option);
   });
}
renderOptions();

// getData("toshkent");
// ============= SEND region name ============////

$("#region").addEventListener("change", (e) => {
   e.preventDefault();

   localStorage.setItem("region", e.target.value);
   const city = localStorage.getItem("region");



   switch (city.toLowerCase()) {
      case "farg'ona":
         getData("qo'qon");
         getWeek("qo'qon")
         break;
      case "qashqadaryo":
         getData("qarshi");
         break;
      case "surxondaryo":
         getData("termiz");
         break;
      case "xorazm":
         getData("urganch");
         break;
      case "sirdaryo":
         getData("guliston");
         break;
      case "buxoro":
         getData("buxoro");
         break;
      case "andijon":
         getData("andijon");
         break;
      case "samarqand":
         getData("samarqand");
         break;
      case "jizzax":
         getData("jizzax");
         break;
         case "navoiy":
         getData("navoiy");
         break;
      case "toshkent":
         getData("toshkent");
         break; 

      default:
         getData('toshkent');
   }

});

// ============== REQUEST API =======================////

async function getData(select) {
   console.log(select);
   const response = await fetch(
      `https://islomapi.uz/api/present/day?region=${select}`
   );
   const result = await response.json();

   localStorage.setItem("data", JSON.stringify(result));

   renderData();
}

// ============== RENDER DATA =================///

function renderData() {
   const data = JSON.parse(localStorage.getItem("data"));

   console.log(data);

   const {
      region,
      date,
      times: {
         asr,
         peshin,
         shom_iftor,
         tong_saharlik,
         quyosh,
         hufton
      },
   } = data;

   $("#city").innerHTML = region;
   $(".date").innerHTML = date;

   $a(".card-time")[0].innerHTML = tong_saharlik;
   $a(".card-time")[1].innerHTML = quyosh;
   $a(".card-time")[2].innerHTML = peshin;
   $a(".card-time")[3].innerHTML = asr;
   $a(".card-time")[4].innerHTML = shom_iftor;
   $a(".card-time")[5].innerHTML = hufton;
}

renderData();

// ================= CLOCK ===============///

function clock() {
   setInterval(() => {
      const date = new Date();
      $(
         "#hour"
      ).innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
   }, 1000);
}

clock();
//=====