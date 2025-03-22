document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("l6xDz65q1yqLLm2xC"); 

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

       
        emailjs.send("service_6qoioxi", "template_rruws4s", { name, email, message })
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Email Sent Successfully! ✅",
                    text: "Your message has been sent. We will get back to you soon.",
                    confirmButtonText: "Great!",
                    timer: 5000
                });

                form.reset();.3
            
                console.log("Email sent successfully!", response);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Email Sending Failed ❌",
                    text: "There was an issue sending your message. Please try again later.",
                    confirmButtonText: "OK"
                });
                console.error("Email sending failed!", error);
            });
    });
});
