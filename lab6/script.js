const downloadButton = document.getElementById("download");
const userBox = document.getElementById("user-box");
const resultText = document.getElementById("result-text");

let userhtml = "";

downloadButton.addEventListener("click", async () => {
    try {
        for (let i = 0; i < 5; i++) {
            const response = await fetch("https://randomuser.me/api");
            const data = await response.json();
            const { picture, name, location, email } = data.results[0];
            userhtml += `
                <div class="user">
                    <img src="${picture.large}">
                    <p>Postcode: ${location.postcode}</p>
                    <p>City: ${location.city}</p>
                    <p>Name: ${name.first + " " + name.last}</p>
                    <p>E-mail: ${email}</p>
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
