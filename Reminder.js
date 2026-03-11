document.getElementById("dateInput").valueAsDate = new Date();
function load() {
     const nok = localStorage.getItem("list-nok");
     const ok = localStorage.getItem("list-ok");
     const count = localStorage.getItem("count");
     if (nok) document.getElementById("list-nok").innerHTML = nok;
     if (ok) document.getElementById("list-ok").innerHTML = ok;
     if (count) {
          document.getElementById("count").innerText = count;
          if (parseInt(count) > 0) document.getElementById("acc-wrapper").classList.remove("hidden");
     }
     const theme = localStorage.getItem("theme");
     if (theme === "dark") {
          document.body.classList.add("display");
          document.getElementById("sun").classList.remove("hidden");
          document.getElementById("moon").classList.add("hidden");
          document.querySelector('link[rel="manifest"]').href = "manifest-dark.json";
     }
}
load();
function add() {
     const remind = document.getElementById("textInput");
     const dateInputRaw = document.getElementById("dateInput").value;
     const dateInputValue = dateInputRaw.split("-").reverse().join("/");
     const max = 20;

     if (remind.value === "") {
          alert("Please enter a remind");
          return;
     }
     if (dateInputValue === "") {
          alert("Please enter a date");
          return;
     }

     let slicedText = remind.value.length > max ? remind.value.slice(0, max) + "..." : remind.value;

     const modelContent = document.querySelector("#model-container").innerHTML;
     const finalHTML = modelContent.replace("##input##", slicedText).replace("##date##", dateInputValue);
     const newLi = document.createElement("li");
     newLi.innerHTML = finalHTML;

     if (remind.value.length > max) {
          const titleElement = newLi.querySelector("#model-remind");
          if (titleElement) titleElement.title = remind.value;
     }
     document.getElementById("list-nok").appendChild(newLi);

     remind.value = "";
     document.getElementById("dateInput").valueAsDate = new Date();
     save();
}
function valid(node) {
     const contentToMove = node.closest("li");
     document.getElementById("list-ok").appendChild(contentToMove);
     node.remove();

     let countElement = document.getElementById("count");
     let count = parseInt(countElement.innerText) || 0;
     countElement.innerText = count + 1;

     const accomplished = document.getElementById("acc-wrapper");
     accomplished.classList.remove("hidden");
     save();
}
function delet() {
     const name = event.target.closest("li").querySelector(".model-remind").innerText;
     if (!document.getElementById("multiDel").checked && !confirm(`Are you sure you want to delete "${name}" ?`)) return;
     event.target.closest("li").remove();
     save();
}
function resetCount() {
     if (document.querySelector("#list-ok li")) {
          alert("Please delete all the completed reminders before resetting the count.");
          return;
     }
     if (!confirm("Are you sure you want to reset the count?")) return;
     document.getElementById("count").innerText = "0";
     document.getElementById("acc-wrapper").classList.add("hidden");
     save();
}
function displaymode() {
     document.body.classList.toggle("display");
     const sun = document.getElementById("sun");
     const moon = document.getElementById("moon");
     sun.classList.toggle("hidden");
     moon.classList.toggle("hidden");
     localStorage.setItem("theme", document.body.classList.contains("display") ? "dark" : "light");
     save();
     document.querySelector('link[rel="manifest"]').href = document.body.classList.contains("display") ? "manifest-dark.json" : "manifest.json";
}
function save() {
     const nok = document.getElementById("list-nok").innerHTML;
     const ok = document.getElementById("list-ok").innerHTML;
     const count = document.getElementById("count").innerText;
     localStorage.setItem("list-nok", nok);
     localStorage.setItem("list-ok", ok);
     localStorage.setItem("count", count);
}
if ("serviceWorker" in navigator) {
     navigator.serviceWorker.register("/MaTodo/service-worker.js");
}
