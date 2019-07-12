(function () {
    // invocation

    Scrolling();
    ChoosePrice();
    sendPhone();


    //////function for moving left after scroll

    function Scrolling() {
        let screens = document.querySelectorAll(".screen");
        let currentscreen = 0;
        const wrappedFast = debounce(changeScreen, 500);

        document.addEventListener("mousewheel", wrappedFast);

        function changeScreen(e) {
            currentscreen === 2 ? (currentscreen = 0) : (currentscreen += 1);

            screens.forEach((block, index) => {
                if (index === currentscreen) {
                    block.classList.add("show");
                } else if (index === currentscreen - 1) {
                    block.classList.remove("show");
                    block.classList.add("prevslide");
                } else if (index === 2 && currentscreen === 0) {
                    block.classList.add("prevslide");
                } else block.classList.remove("show", "prevslide");
            });
        };

        document.addEventListener("touchmove", handleWeel);

        function handleWeel() {
            var event1 = document.createEvent("Event");
            event1.initEvent("mousewheel", false, true);
            document.dispatchEvent(event1);
        }


        function debounce(f, delay) {
            let timer = null;
            return function (...args) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    f.call(this, ...args);
                }, delay)
            }
        }
    }

    /////// choosing the price of site type

    function ChoosePrice() {
        let sites = document.querySelectorAll(".site");
        let price = document.querySelector(".price");

        sites.forEach((site) => {
            site.addEventListener("click", (event) => {
                if (!event.target.dataset) return;
                price.innerHTML = event.target.dataset.value;
            });
        });
    }

    //////// send form with validation input 

    function sendPhone() {
        let form = document.querySelector('.js-form');
        form.setAttribute('novalidate', 'true');
        let input = form.querySelector('.js-input');
        let isValid = true;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            isValid = true;
            setToDefaultStyles();
            // validate inputs
            validateInputs();
            // try to submit
            submitForm();
        });

        function setToDefaultStyles() {
            input.classList.remove("error");
        }

        function validateInputs() {
            isValid = checkOnRequired(input) && isValid;
        };

        function checkOnRequired(input) {
            if (input.hasAttribute('required')) {
                if (input.value.trim() === '') {
                    input.classList.add("error");
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }

        function submitForm() {
            if (!isValid) return console.log('NOT VALID');

            if (validate(input.value)) {
                alert("Введите номер телефона для заявки");
                input.classList.add("sent");
                isValid = true;
            } else {
                alert("Введите корректный номер телефона");
                isValid = false;
                input.classList.add("error");
            }

            function validate(value) {
                let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                return re.test(value);
            }
            // AJAX

            // Success messages
            if (isValid) {
                //sendForm();
                alert("Спасибо!");
            } else {
                form.reset();
            }
        }
    }
})();