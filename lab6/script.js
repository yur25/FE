const downloadButton = document.getElementById("download");
const userBox = document.getElementById("user-box");
const resultText = document.getElementById("result-text");

let userhtml = "";

downloadButton.addEventListener("click", async () => {
    try {
        for (let i = 0; i < 5; i++) {
            const response = await fetch("https://randomuser.me/api");
            const data = await response.json();
            const { picture, name, location, phone } = data.results[0];
            console.log(picture.large);
            console.log(name.first + " " + name.last);
            console.log(location.city);
            console.log(location.postcode);
            console.log(phone);
            userhtml += `
                <div class="user">
                    <img src="${picture.large}">
                    <p>Name: ${name.first + " " + name.last}</p>
                    <p>City: ${location.city}</p>
                    <p>Postcode: ${location.postcode}</p>
                    <p>Phone: ${phone}</p>
                </div>
            `;
        }

        userBox.innerHTML = userhtml;
        resultText.textContent = "success!";
    } catch (err) {
        console.log(err);
        resultText.textContent = "an error occured :(";
    }
});
