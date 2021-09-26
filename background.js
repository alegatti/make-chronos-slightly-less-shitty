"use strict"

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // TODO: Load extension only for this website
    if (!tab.url.startsWith('https://cloud6.dagomedia.com/')) {
        console.warn(`Wrong website (${tab.url})`);
        return;
    }

    // Inject script only on page load
    if (changeInfo.status !== 'complete') return;

    injectScript(tab, 'shared');
    if (tab.url.indexOf('/main/pannello/main') !== -1) {
        injectScript(tab, 'homepage');
    }
});

function injectScript(tab, page) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [`inject/${page}.js`]
    });
}
