document.addEventListener('DOMContentLoaded', function () {

    // --- NAVBAR / BURGER ---
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const burgerMenu = document.querySelector('.burger_menu');

    if (toggleBtn) {
        toggleBtn.onclick = function() {
            burgerMenu.classList.toggle('open');
            const isOpen = burgerMenu.classList.contains('open');
            toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        }
    }

    window.dark_theme = function() {
        document.body.classList.toggle("dark-mode");
    }

    // --- SEARCH / FILTER (Uzdevums 2) ---
    const searchInput = document.getElementById('search');
    const cardNodes = Array.from(document.querySelectorAll('.single-card'));

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const q = this.value.trim().toLowerCase();
            cardNodes.forEach(card => {
                const h2 = card.querySelector('h2');
                const p = card.querySelector('p');
                const text = ((h2 ? h2.textContent : '') + ' ' + (p ? p.textContent : '')).toLowerCase();
                const match = q === '' || text.indexOf(q) !== -1;
                card.classList.toggle('hidden', !match);
            });
        });
    }

    // --- FORM VALIDATION (Uzdevums 1) ---
    const form = document.getElementById('contact');
    if (form) {
        function showErrorField(el, msg) {
            el.classList.add('error');
            const label = document.querySelector(`label[for="${el.id}"]`);
            if (label) {
                label.classList.add('error');
            }
            let msgEl = el.nextElementSibling;
            if (!msgEl || !msgEl.classList || !msgEl.classList.contains('error-msg')) {
                msgEl = document.createElement('span');
                msgEl.className = 'error-msg';
                el.parentNode.insertBefore(msgEl, el.nextSibling);
            }
            msgEl.textContent = msg;
        }

        function clearErrorField(el) {
            el.classList.remove('error');
            const label = document.querySelector(`label[for="${el.id}"]`);
            if (label) label.classList.remove('error');
            let msgEl = el.nextElementSibling;
            if (msgEl && msgEl.classList && msgEl.classList.contains('error-msg')) {
                msgEl.remove();
            }
        }

        // email regex
        function validEmail(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            const fname = document.getElementById('fname');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');

            // clear previous errors
            [fname, email, subject].forEach(el => clearErrorField(el));

            // validate first name
            if (!fname.value.trim()) {
                showErrorField(fname, 'Please enter your name.');
                valid = false;
            }

            // validate email
            if (!email.value.trim()) {
                showErrorField(email, 'Please enter your email.');
                valid = false;
            } else if (!validEmail(email.value.trim())) {
                showErrorField(email, 'Please enter a valid email address.');
                valid = false;
            }

            // validate subject/message
            if (!subject.value.trim()) {
                showErrorField(subject, 'Please enter a message.');
                valid = false;
            }

            if (!valid) {
                // focus first invalid field
                const firstInvalid = form.querySelector('.error');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // if valid: show success message and reset form
            // remove previous success if any
            let existing = form.querySelector('.form-success');
            if (existing) existing.remove();

            const success = document.createElement('div');
            success.className = 'form-success';
            success.textContent = 'Form has been successfully submitted. Thank you!';
            form.appendChild(success);

            // clear form fields
            form.reset();

            // remove any lingering error states
            [fname, email, subject].forEach(el => clearErrorField(el));

            // hide success after a short delay
            setTimeout(() => {
                if (success && success.parentNode) success.remove();
            }, 5000);
        });

        // clear error state on input
        ['input','textarea'].forEach(evt => {
            form.addEventListener(evt, function (e) {
                const el = e.target;
                if (!el.matches('input,textarea')) return;
                if (el.id === 'email') {
                    // remove error once looks valid
                    if (el.value.trim() && validEmail(el.value.trim())) {
                        clearErrorField(el);
                    }
                } else {
                    if (el.value.trim()) clearErrorField(el);
                }
            }, true);
        });
    }
});