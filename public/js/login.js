const handleLoginForm = async (submission) => {
    submission.preventDefault();

    //   collect login data
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    // if login data exists send it to the api
    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        // if api was successful relocate to homepage
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector("#login-form")
    .addEventListener("submit", handleLoginForm);
