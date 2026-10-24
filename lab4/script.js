// Завдання 1
const fifthElement = document.getElementById("fifth");
const sixthElement = document.querySelector("#sixth");

const lightColors = ["yellow", "lime", "orange", "pink", "skyblue"];
const darkColors = ["brown", "black", "indigo", "navy", "olive"];

function changeBackgroundAndColor(element) {
    let counter = 0;

    return function () {
        if (counter % 2 === 1) {
            element.style.backgroundColor =
                lightColors[Math.floor(Math.random() * lightColors.length)];
            element.style.color = "black";
        } else {
            element.style.backgroundColor =
                darkColors[Math.floor(Math.random() * darkColors.length)];
            element.style.color = "white";
        }

        counter++;
    };
}

const fifthClickListener = changeBackgroundAndColor(fifthElement);
const sixthClickListener = changeBackgroundAndColor(sixthElement);

fifthElement.addEventListener("click", fifthClickListener);
sixthElement.addEventListener("click", sixthClickListener);

// Завдання 2
const sourceImage = document.getElementById("cityImage");
const addedImages = document.getElementById("addedImages");

const addButton = document.getElementById("addImage");
const increaseButton = document.getElementById("increaseImage");
const decreaseButton = document.getElementById("decreaseImage");
const deleteButton = document.getElementById("deleteImage");

function getLastImage() {
    const images = document.querySelectorAll(".lab-image");
    return images[images.length - 1] || null;
}

addButton.addEventListener("click", function () {
    const image = document.createElement("img");

    image.src = sourceImage.src;
    image.alt = sourceImage.alt;
    image.classList.add("lab-image");

    addedImages.appendChild(image);
});

increaseButton.addEventListener("click", function () {
    const image = getLastImage();

    if (image) {
        const width = image.getBoundingClientRect().width;
        image.style.width = width + 50 + "px";
    }
});

decreaseButton.addEventListener("click", function () {
    const image = getLastImage();

    if (image) {
        const width = image.getBoundingClientRect().width;

        if (width > 100) {
            image.style.width = Math.max(100, width - 50) + "px";
        }
    }
});

deleteButton.addEventListener("click", function () {
    const image = getLastImage();

    if (image) {
        if (image === sourceImage && image.parentElement.tagName === "A") {
            image.parentElement.remove();
        } else {
            image.remove();
        }
    }
});
