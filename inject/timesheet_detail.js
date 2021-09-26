'use strict';

const urlParams = new URLSearchParams(window.location.search);
const day = urlParams.get('day');
chronos.setTitle(`Timesheet ${day}`);
