// Scroll-spy: highlight nav link for the section in view; scroll ONLY the nav strip horizontally.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var map = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href');
    if (id && id.charAt(0) === '#') map[id.slice(1)] = a;
  });
  var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('active'); });
        var act = map[e.target.id];
        if (act) {
          act.classList.add('active');
          var strip = act.parentElement;
          if (strip && strip.scrollWidth > strip.clientWidth) {
            strip.scrollTo({ left: act.offsetLeft - strip.clientWidth / 2 + act.clientWidth / 2, behavior: 'smooth' });
          }
        }
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(function (s) { obs.observe(s); });
})();

// Copy the reusable prompt to clipboard
(function () {
  var btn = document.getElementById('copyPrompt');
  var pre = document.getElementById('promptText');
  if (!btn || !pre) return;
  btn.addEventListener('click', function () {
    var text = pre.innerText;
    function done() { var o = btn.textContent; btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = o; }, 1600); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    } else { fallback(text); done(); }
  });
  function fallback(text) {
    var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta);
    ta.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta);
  }
})();
