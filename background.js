"use strict"

const SCRIPTS_TO_INJECT = {
    '/main/pannello/main': ['homepage'],
    '/main/commesse/edit_commessa': ['edit_commessa'],
    '/main/commesse/lista_commesse': ['lista_commesse'],
    '/main/attivita/lista_attivita': ['timesheet_detail'],
    '/main/attivita/edit_attivita': ['edit_attivita'],
    '/reports/report_controllo_tempi/main': ['timesheet_overview'],
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // TODO: Load extension only for this website
    if (!tab.url.startsWith('https://cloud6.dagomedia.com/')) {
        console.warn(`Wrong website (${tab.url})`);
        return;
    }

    // Inject script only on page load
    if (changeInfo.status !== 'complete') return;

    injectScript(tab, 'shared');
    for (const path in SCRIPTS_TO_INJECT) {
        if (tab.url.indexOf(path) === -1) continue;
        for (const script of SCRIPTS_TO_INJECT[path]) {
            injectScript(tab, script);
        }
    }
});

function injectScript(tab, page) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [`inject/${page}.js`]
    });
}
