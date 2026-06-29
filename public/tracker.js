/**
 * KHULA CRM Website Tracker v1.0
 * Paste this file's <script> tag into your website's <head>.
 * Do not modify. Get your org ID from KHULA → Website → Setup.
 */
(function (w, d) {
  var q = [];
  var ready = false;
  var orgId = null;
  var endpoint = "https://app.khulacrm.co.za/api/track";

  function send(event, props) {
    if (!orgId) return;
    var payload = {
      orgId: orgId,
      event: event,
      properties: props || {},
      page: w.location.href,
      referrer: d.referrer || "",
      ua: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, JSON.stringify(payload));
    } else {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(function () {});
    }
  }

  function ktrack(cmd, arg, props) {
    if (cmd === "init") {
      orgId = arg;
      ready = true;
      // Flush queued calls
      for (var i = 0; i < q.length; i++) {
        ktrack.apply(null, q[i]);
      }
      q = [];
    } else if (!ready) {
      q.push([cmd, arg, props]);
    } else if (cmd === "track") {
      send(arg, props);
    } else if (cmd === "pageview") {
      send("pageview", { title: d.title });
    }
  }

  // Auto track SPA navigation
  var lastHref = w.location.href;
  var observer = new MutationObserver(function () {
    if (w.location.href !== lastHref) {
      lastHref = w.location.href;
      send("pageview", { title: d.title });
    }
  });
  observer.observe(d, { subtree: true, childList: true });

  w.ktrack = ktrack;
})(window, document);
