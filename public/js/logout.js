const logout = async () => {
    // send logout request to api
    const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    // relocate to homepage if api was successful
    if (response.ok) {
        document.location.replace("/");
    } else {
        alert(response.statusText);
    }
};

// look for logout button
const logoutButton = document.querySelector("#logout");

// if logout button exists add an event listener
if (logoutButton) {
    document.querySelector("#logout").addEventListener("click", logout);
}
