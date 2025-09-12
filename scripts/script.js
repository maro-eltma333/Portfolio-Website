document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("7GuOykc8AW_odU61U");

    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            Swal.fire({
                icon: "warning",
                title: "Missing Information!",
                text: "Please fill out all fields before submitting.",
                confirmButtonText: "OK"
            });
            return;
        }

        if (!email.includes("@")) {
            Swal.fire({
                icon: "error",
                title: "Invalid Email!",
                text: "Email must contain '@' symbol.",
                confirmButtonText: "OK"
            });
            return;
        }

        const adminPromise = emailjs.send("service_x27mjzk", "template_klnpr2m", {
            name,
            email,
            message,
            to_email: "mindsetcoding0@gmail.com",
            reply_to: email
        });

        const userPromise = emailjs.send("service_x27mjzk", "template_wcm27bl", {
            name,
            email,
            message,
            to_email: email,
            reply_to: email
        });

        Promise.all([adminPromise, userPromise])
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Email Sent Successfully! ✅",
                    text: "Your message has been sent. We will get back to you soon.",
                    confirmButtonText: "Great!",
                    timer: 5000
                });

                form.reset();
            })
            .catch((error) => {
                let message = "There was an issue sending your message. Please try again later.";
                if (error && (error.status === 404 || error.text === "Account not found" || (typeof error.text === "string" && error.text.includes("Account not found")))) {
                    message = "Email service misconfigured (Account not found). Check Public Key, Service ID, and Template IDs belong to the same EmailJS account, and that To = {{to_email}} in templates.";
                }
                Swal.fire({
                    icon: "error",
                    title: "Email Sending Failed ❌",
                    text: message,
                    confirmButtonText: "OK"
                });
                console.error("Email sending failed!", error);
            });
    });
});

// Fallback for legacy inline onsubmit="sendEmail(event)"
window.sendEmail = function (e) {
    if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
    }
    const form = document.getElementById("contact-form");
    if (form) {
        form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
    return false;
};
