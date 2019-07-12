(function () {
    // invocation

    Scrolling();
    ChoosePrice();




    //////function for moving left after scroll

    function Scrolling() {
        let screens = document.querySelectorAll(".screen");
        let currentscreen = 0;
        const wrappedFast = debounce(changeScreen, 500);

        document.addEventListener("mousewheel", wrappedFast);

        function changeScreen(e) {
            currentscreen === 2 ? (currentscreen = 0) : (currentscreen += 1);
            console.log(currentscreen);
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

            // alert("kdfhghg");
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

    function Tabs() {
        var works = document.querySelector(".works");
        var tab = works.querySelectorAll('[data-item]');
        var cont = works.querySelector('.works__content');
        var tabLength = tab.length;
        var tabcontent = cont.querySelectorAll('.works__tabcontent');
        tab.forEach(() => {
            tab[i].addEventListener("click", show);
        });

        function show() {
            tabcontent.forEach(function (item, i, arr) {
                tabcontent[i].classList.remove("show");
            });
            var c = 'data-item =' + '"' + this.dataset.item + '"';
            cont.querySelector("[" + c + "]").classList.add("show");
        };
    }


    //////// validation form 

    function jsForm() {
        let form = document.querySelector('.js-form');
        if (!form) return console.log('Форма не найдена');
        form.setAttribute('novalidate', 'true');
        let inputs = form.querySelectorAll('.form__input');
        let isValid = true;
        let errorClass = 'form__error';
        let errors = {
            default: errorClass,
            required: errorClass + '--required',
            pattern: errorClass + '--pattern'
        }

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
            inputs.forEach(element => {
                element.classList.remove(errors.default, errors.required, errors.pattern);
            });
        }

        function validateInputs() {
            inputs.forEach(element => {
                isValid = checkOnRequired(element) && isValid; // true or false
            });

        };

        function checkOnRequired(input) {
            if (input.hasAttribute('required')) {
                if (input.value.trim() === '') {
                    input.classList.add(errors.required);

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
            let femail = form.querySelector(".js-email");

            if (validateEmail(femail.value)) {
                console.log("ok");
                isValid = true;
            } else {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Please enter correct email!'
                });
                //alert("Please enter correct email");
                isValid = false;
                femail.classList.add(errors.pattern);

            }

            function validateEmail(email) {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
            // AJAX


            // Success messages
            if (isValid) {
                //sendForm();

                swal(
                    'Good job!',
                    'You log in!',
                    'success'
                )
                form.querySelector('.form__btn').disabled = true;
            } else {
                form.reset();

            }
        }
    }


    /////Gsap

    function Tween() {
        let tl = new TimelineMax();
        tl
            .from('#left', 2, {
                x: '-300%',
                ease: Bounce.easeOut
            }, delay = 1)
            .from('#right', 2, {
                x: '300%',
                ease: Bounce.easeOut
            }, "-=2")
            .from('.wellcome__btn', .5, {
                borderRadius: "30px"
            })
            .from('.logo__h1', 1, {
                y: '-100',
                opacity: 0
            }, "-=0.5")
            .staggerFrom(".nav__list", .5, {
                y: '-50',
                opacity: 0
            }, 0.1, "-=0.25")
    }

    function scrollMagic() {
        // init controller
        var controller = new ScrollMagic.Controller();

        var tween = TweenMax.from('#about', 1, {
            y: 500,
            opacity: 0
        });
        var tween1 = TweenMax.from('#contacts', 1, {
            y: 500,
            opacity: 0
        });
        // create a scene

        var scene = new ScrollMagic.Scene({
                triggerElement: "#servises",
                offset: 400
            })
            .setTween(tween)
            .addTo(controller);
        var scene2 = new ScrollMagic.Scene({
                triggerElement: "#clients",
                offset: 300
            })
            .setTween(tween1)
            .addTo(controller);
    }
})();