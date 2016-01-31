'use stricts';

let hepburn = require('hepburn');

let convert = () => {
  let {pathname} = window.location;
  let iframeQS, tracksQS;

  if (pathname.indexOf('album') > -1) {
    iframeQS = "iframe[id^='browse-app-spotify:app:album']";
    tracksQS = '#album-tracks div.tl-highlight';
  } else {
    iframeQS = "iframe[id^='browse-app-spotify:app:artist']";
    tracksQS = '#overview div.tl-highlight';
  }

  if (!document.querySelector(iframeQS)) return;
  let iframe = document
    .querySelector(iframeQS)
    .contentWindow
    .document;

  let tracks = iframe
    .querySelectorAll(tracksQS);

  for (let i = 0; i<tracks.length; i++) {
    let name = tracks[i].textContent.trim();
    if (hepburn.containsHiragana(name)) continue;
    let hiragana = hepburn.toHiragana(hepburn.cleanRomaji(name));
    // console.log(name, hiragana, /^[^a-zA-Z]+$/.test(hiragana));
    if (/^[^a-zA-Z]+$/.test(hiragana)) {
      tracks[i].innerHTML = hiragana;
    }
  }
};

setTimeout(()=>{
  convert();
  setInterval(function(){ convert(); }, 1000);
}, 5000);


