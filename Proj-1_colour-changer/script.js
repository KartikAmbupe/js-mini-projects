document.addEventListener("DOMContentLoaded", function() {
    const div = document.querySelector('.canvas');

    const newSpan = document.createElement('span');
    newSpan.className = 'button';
    newSpan.id = 'red';
    div.appendChild(newSpan);

    const h2 = div.querySelector('h2');
    div.insertBefore(newSpan, h2);

    const buttons = document.querySelectorAll('.button');
    const body = document.querySelector('body');

    buttons.forEach(function(button) {
        button.style.cursor = "pointer";
        button.addEventListener('click', function(e) {
            switch (e.target.id) {
                case 'grey':
                    body.style.backgroundColor = e.target.id;
                    break;
                case 'white':
                    body.style.backgroundColor = e.target.id;
                    break;
                case 'blue':
                    body.style.backgroundColor = e.target.id;
                    break;
                case 'yellow':
                    body.style.backgroundColor = e.target.id;
                    break;
                case 'red':
                    body.style.backgroundColor = e.target.id;
                    break;
                default:
                    break;
            }
        });
    });
});




