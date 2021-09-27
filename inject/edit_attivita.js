'use strict';

chronos.setTitle('Modifica ore');

// Automatically set "orario fine"
const startInput = document.querySelector('#ora_inizio');
const endInput = document.querySelector('#ora_fine');
startInput.addEventListener('focusout', (event) => {
    setTimeout(() => {
        endInput.value = startInput.value;
    }, 250);
});