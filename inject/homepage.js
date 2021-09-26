'use strict';

console.log('Running "Make Chronos slightly less shitty"');

// Select the first "lavorazione" if there is only one
document.querySelectorAll('.slot-times select').forEach(select => {
    if (select?.children?.length === 2) {
        select.children[1].selected = true;
    }
});
