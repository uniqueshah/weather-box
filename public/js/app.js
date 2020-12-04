
//secret_key for forecast.js which is used in url is 72463e4e91fcee711de15e124f777699



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector("#message-1");
const messageTWo = document.querySelector("#message-2");
weatherForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading...";
    messageTWo.textContent = "";
    fetch("/weather?address="+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTWo.textContent = data.forecast;
            }
        })
    })
})

