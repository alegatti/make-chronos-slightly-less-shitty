'use strict';

console.log('Running "Make Chronos slightly less shitty"');

if (!window.chronos) window.chronos = {};

window.chronos.setTitle = function (str) {
    document.title = `🕒💩 - ${str}`;
}