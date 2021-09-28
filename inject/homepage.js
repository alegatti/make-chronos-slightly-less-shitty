'use strict';

chronos.setTitle('Homepage');

// Select the first "lavorazione" if there is only one
document.querySelectorAll('.slot-times select').forEach(select => {
    if (select?.children?.length === 2) {
        select.children[1].selected = true;
    }
});


// Load timesheet
(async () => {
    const loadDOM = async (url) => {
        const response = await fetch(url);
        const html = document.createElement('html');
        html.innerHTML = await response.text();
        return html;
    };

    // This is only useful because it has the user id and the date as query params
    const slotCalendarLink = document.querySelector('#company_title .dropdown-menu li:nth-child(2) a')?.href;
    if (!slotCalendarLink) {
        console.warning(`Invalid "slot calendar" link`);
        return;
    }
    const slotCalendarURL = new URL(slotCalendarLink)
    const user = slotCalendarURL.searchParams.get('idr');
    const date = slotCalendarURL.searchParams.get('data_start');
    const companyName = window.location.pathname.split('/')?.[1];

    // Get timesheet table
    const timesheetPage = await loadDOM(`/${companyName}/main/attivita/lista_attivita?day=${date}&risorsa=${user}`);
    const timesheetTable = timesheetPage.querySelector('.new-companylist');

    // Display table
    const leftSide = document.querySelector('.contenuto > table tr:first-child td:first-child');
    leftSide.classList.add('custom-timesheet');
    leftSide.append(timesheetTable);

    // Fix "cancella button"
    const anchors = document.querySelectorAll('.custom-timesheet tr:not(:first-child) tr:last-child .dropdown-menu a');
    for (const a of anchors) {
        // Ignore all options that are not "cancella"
        if (a.text.toLocaleLowerCase().indexOf('cancella') === -1) continue;

        // The next few lines are an ugly hack
        const originalOnClick = a.getAttribute('onclick');
        a.onclick = function () {
            const regex = /\((?<codice>\d+)?,(?<rid>\d+),(?<cid>\d+)\)/;
            const { codice, rid, cid } = regex.exec(originalOnClick).groups;
            const confirmMessage = 'Vuoi davvero cancellare?';
            if (!window.confirm(confirmMessage)) return;
            const url = `/${companyName}/main/attivita/action_delete_attivita?aID=${codice}&rID=${rid}&cID=${cid}`;
            fetch(url)
                .catch((err) => {
                    console.error(err);
                    alert('Errore');
                })
                .then(() => location.reload())
        };
    }
})();
