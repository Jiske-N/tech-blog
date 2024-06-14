const handleLoginForm = async (submission) => {
    submission.preventDefault();

    //   collect login data
    const name = document.querySelector("#name").value.trim();
    const password = document.querySelector("#password").value.trim();

    // if login data exists send it to the api
    if (name && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: { "Content-Type": "application/json" },
        });

        // if api was successful relocate to homepage
        if (response.ok) {
            document.location.replace("/");
        } else {
            const jsonData = await response.json();
            alert(response.statusText + ": " + jsonData.message);
        }
    }
};

// check password meets requirements
function checkPassword(submission) {
    submission.preventDefault();

    const input = document.getElementById("password");
    if (input.value.length < 8) {
        input.setCustomValidity("Password Must be at Least 8 Characters.");
    } else {
        // input is valid -- reset the error message
        input.setCustomValidity("");
    }
}

// add event listeners to password inputs to allow for checkNewPassword
document.querySelector("#password").addEventListener("input", checkPassword);

document
    .querySelector("#login-form")
    .addEventListener("submit", handleLoginForm);
