function add() {
    const remind = document.getElementById("textInput");
    const dateInputRaw = document.getElementById("dateInput").value;
    const dateInputValue = dateInputRaw.split('-').reverse().join('/');
    const max = 20;

    if (remind.value === "") { alert("Please enter a remind"); return; };
    if (dateInputValue === "") { alert("Please enter a date"); return; };

    let slicedText = (remind.value.length > max) ? remind.value.slice(0, max) + "..." : remind.value;

    const modelContent = document.querySelector('#model-container').innerHTML;
    const finalHTML = modelContent.replace("##input##", slicedText).replace('##date##', dateInputValue);
    const newLi = document.createElement("li");
    newLi.innerHTML = finalHTML;

    if (remind.value.length > max) {
        const titleElement = newLi.querySelector("#model-remind");
        if (titleElement) titleElement.title = remind.value;
    }
    document.getElementById("list-nok").appendChild(newLi);

    remind.value = "";
    document.getElementById('dateInput').valueAsDate = new Date();
}
function valid(node) {
    const contentToMove = node.closest('li')
    document.getElementById("list-ok").appendChild(contentToMove);
    node.remove();

    let countElement = document.getElementById("count");
    let count = parseInt(countElement.innerText) || 0;
    countElement.innerText = count + 1;
}
function delet() {
    event.target.closest("li").remove();
}
function displaymode() {
    document.body.classList.toggle("display")
    const sun = document.getElementById("sun")
    const moon = document.getElementById("moon")
    sun.classList.toggle("hidden")
    moon.classList.toggle("hidden")
}
document.getElementById('dateInput').valueAsDate = new Date();