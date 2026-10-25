const form = document.getElementById("userForm");
const formStatus = document.getElementById("form-status");

const TABLE_SIZE = 6;
const targetCellNumber = 34;

const fieldRules = {
    fullName: {
        pattern: /^[А-ЯІЇЄҐ][а-яіїєґ'’-]+\s+[А-ЯІЇЄҐ]\.\s?[А-ЯІЇЄҐ]\.$/,
        message: "Введіть прізвище та ініціали, наприклад: Чорук Ю. Р.",
    },
    idCard: {
        pattern: /^[А-ЯІЇЄҐа-яіїєґA-Za-z]{2}\s№\d{6}$/,
        message: "Формат: дві літери №123456.",
    },
    faculty: {
        pattern: /^[А-ЯІЇЄҐа-яіїєґ]{2,}(?:[-\s][А-ЯІЇЄҐа-яіїєґ]+)*$/,
        message: "Назва факультету має містити лише літери, пробіли або дефіс.",
    },
    birthDate: {
        pattern: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
        message: "Формат дати: ДД.ММ.РРРР.",
    },
    address: {
        pattern: /^м\.\s+[А-ЯІЇЄҐа-яіїєґ'’-]+(?:[\s-][А-ЯІЇЄҐа-яіїєґ'’-]+)*$/,
        message: "Формат адреси: м. Назва міста.",
    },
};

function setFieldError(input, message) {
    const row = input.closest(".form-row");
    const errorMessage = row.querySelector(".error-message");

    row.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
    errorMessage.textContent = message;
}

function clearFieldError(input) {
    const row = input.closest(".form-row");
    const errorMessage = row.querySelector(".error-message");

    row.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
    errorMessage.textContent = "";
}

function isValidCalendarDate(value) {
    const [day, month, year] = value.split(".").map(Number);
    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        date <= new Date()
    );
}

function validateField(input) {
    const rule = fieldRules[input.name];
    const value = input.value.trim();

    clearFieldError(input);

    if (!value) {
        setFieldError(input, rule.message);
        return false;
    }

    if (!rule.pattern.test(value)) {
        setFieldError(input, rule.message);
        return false;
    }

    if (input.name === "birthDate" && !isValidCalendarDate(value)) {
        setFieldError(input, "Введіть дійсну дату.");
        return false;
    }

    return true;
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function showFormResult(values) {
    const resultWindow = window.open("", "_blank", "width=600,height=500");

    if (!resultWindow) {
        const message =
            "Не вдалося відкрити окреме вікно. Дозвольте спливаючі вікна для цього сайту.";
        console.error(message);
        formStatus.textContent = message;
        return;
    }

    formStatus.textContent = "";
    const rows = Object.entries(values)
        .map(
            ([label, value]) =>
                `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`,
        )
        .join("");

    resultWindow.document.write(`
        <!DOCTYPE html>
        <html lang="uk">
            <head>
                <meta charset="UTF-8">
                <title>Перевірені дані</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 30px; }
                    h1 { color: #244a73; }
                </style>
            </head>
            <body>
                <h1>Введена інформація</h1>
                ${rows}
            </body>
        </html>
    `);
    resultWindow.document.close();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const inputs = Array.from(form.querySelectorAll("input[type='text']"));
    const validationResults = inputs.map(validateField);
    const isValid = validationResults.every(Boolean);

    if (!isValid) {
        return;
    }

    const values = {
        ПІБ: form.elements.fullName.value.trim(),
        "ID-картка": form.elements.idCard.value.trim(),
        Факультет: form.elements.faculty.value.trim(),
        "Дата народження": form.elements.birthDate.value.trim(),
        Адреса: form.elements.address.value.trim(),
    };

    showFormResult(values);
});

const tableBody = document.querySelector("#eventTable tbody");
const cellColor = document.getElementById("cellColor");

for (let row = 0; row < TABLE_SIZE; row++) {
    const tableRow = document.createElement("tr");

    for (let column = 0; column < TABLE_SIZE; column++) {
        const cell = document.createElement("td");
        const number = row * 6 + column + 1;

        cell.textContent = number;

        if (number === targetCellNumber) {
            cell.classList.add("target-cell");
            cell.title = "Цільова клітинка";
            cell.addEventListener("mouseenter", function () {
                cell.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 75%, 75%)`;
            });
            cell.addEventListener("click", function () {
                cell.style.backgroundColor = cellColor.value;
            });
            cell.addEventListener("dblclick", function () {
                const cells = tableBody.querySelectorAll("td");

                cells.forEach((diagonalCell, index) => {
                    const rowIndex = Math.floor(index / TABLE_SIZE);
                    const columnIndex = index % TABLE_SIZE;

                    if (rowIndex + columnIndex === 5) {
                        diagonalCell.style.backgroundColor = cellColor.value;
                    }
                });
            });
        }

        tableRow.appendChild(cell);
    }

    tableBody.appendChild(tableRow);
}
