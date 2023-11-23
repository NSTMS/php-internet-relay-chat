import {Scrollbar} from 'smooth-scrollbar';

// Select the element you want to apply the custom scrollbar to
const container = document.querySelector('#chat');

// Initialize the custom scrollbar
const scrollbar = Scrollbar.init(container);

// Customize the scrollbar appearance
scrollbar.track.xAxis.element.classList.add('custom-scrollbar-track');
scrollbar.thumb.xAxis.element.classList.add('custom-scrollbar-thumb');

