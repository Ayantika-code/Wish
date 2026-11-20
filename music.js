/* Background song: starts when the lock is opened */
(function () {
  var song = new Audio('assets/song.mp3');
  song.loop = true;
  song.volume = 0.8;
  song.preload = 'auto';
  var started = false;

  function tryPlay() {
    if (started) return;
    var p = song.play();
    if (p && p.then) {
      p.then(function () { started = true; }).catch(function () {});
    } else {
      started = true;
    }
  }

  function unlocked() {
    var pages = document.querySelectorAll('.page.active');
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].id !== 'lock') return true;
    }
    return false;
  }

  function check() { if (unlocked()) tryPlay(); }

  /* page change হলেই (lock খুললেই) গান শুরু */
  new MutationObserver(check).observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
    subtree: true
  });

  /* যদি ব্রাউজার আটকে দেয়, পরের যেকোনো ট্যাপে আবার চেষ্টা */
  document.addEventListener('pointerdown', check);
})();
