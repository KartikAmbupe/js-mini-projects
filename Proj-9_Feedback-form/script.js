const scriptURL = 'https://script.google.com/macros/s/AKfycbz185pYxaQdlI8VNtOahNeLQPvXL_2DniQGzi7BIt-SK9YzmF04KPoI6KirfwA8bOE7/exec'
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

form.addEventListener('submit', e => {
  e.preventDefault()

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const feedback = document.getElementById('feedback').value.trim();

    //Validation
    if (!name || !email || !feedback) {
        msg.innerHTML = "Please fill all the fields!";
        msg.style.color = "red";
        setTimeout(function(){
            msg.innerHTML = ""
        }, 3000);
        return;
    }

  // Show loading message immediately
    msg.innerHTML = "Submitting...";
    msg.style.color = "#ffa500";
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            //Success Message
            msg.innerHTML = "Thanks for your valuable time and feedback!"
            msg.style.color = "green";
            form.reset();
            setTimeout(function(){
                msg.innerHTML = ""
            }, 3000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            msg.innerHTML = "Oops! Something went wrong! Please try again later."
            msg.style.color = "red";
            setTimeout(function(){
                msg.innerHTML = ""
            }, 3000);
        })
})

function redirectToGitHub() {
    window.location.href = 'https://github.com/KartikAmbupe';
}

function redirectToX() {
    window.location.href = 'https://x.com/Kartik_R_A';
}

function redirectToInstagram() {
    window.location.href = 'https://www.instagram.com/kartik.ambupe/';
}

