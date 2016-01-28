'use stricts';

let hepburn = require('hepburn');

let init = () => {
  let {pathname} = window.location;
  let iframeQS, tracksQS;

  if (pathname.indexOf('album') > -1) {
    iframeQS = "iframe[id^='browse-app-spotify:app:album']";
    tracksQS = '#album-tracks div.tl-highlight';
  } else {
    iframeQS = "iframe[id^='browse-app-spotify:app:artist']";
    tracksQS = '#toplist-row div.tl-highlight';
  }

  let iframe = document
    .querySelector(iframeQS)
    .contentWindow
    .document;

  let tracks = iframe
    .querySelectorAll(tracksQS);

  for (let i = 0; i<tracks.length; i++) {
    let name = tracks[i].textContent.trim();
    let hiragana = hepburn.toHiragana(name);
    console.log(name, hiragana, /^[^a-zA-Z]+$/.test(hiragana));
    if (/^[^a-zA-Z]+$/.test(hiragana)) {
      tracks[i].innerHTML = hiragana;
    }
  }
};

setTimeout(()=>init(), 10000);

// handle scroll
document.addEventListener('scroll', ()=> init());