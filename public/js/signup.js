const handleSignupForm = async (submission) => {
    submission.preventDefault();

    //   collect new user data
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    // confirm data all exists
    if (name && email && password) {
        // send data to the api
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        // relocate to home page
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
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
    .querySelector("#signup-form")
    .addEventListener("submit", handleSignupForm);
