'use strict';

// const cliente = document.querySelector('.tabellaFiltri tr td:nth-child(2)')?.innerText;
const commessa = document.querySelector('.tabellaFiltri tr:nth-child(3) td:nth-child(2)').innerText

chronos.setTitle(commessa);

// Automatically open timesheet options
const timesheetOptions = document.querySelectorAll('.tabellaInterna');
if (timesheetOptions.length < 3) {
    for (const table of timesheetOptions) {
        table.parentElement.style.display = 'block';
    }
}

// Open date picker if there is only one timesheet option
if (timesheetOptions.length === 1) {
    const hoursInput = timesheetOptions[0].querySelector('input[name^=ora_inizio]')
    hoursInput?.focus();
}
