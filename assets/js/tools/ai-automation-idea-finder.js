/* PoloPrompt — AI Automation Idea Finder.
   Data lives in assets/js/automation-ideas-data.js (AUTOMATION_IDEAS / AUTOMATION_FALLBACKS).
   If API_BASE is set below, results are fetched from the backend database instead —
   falling back to the bundled static data automatically if the API is unreachable,
   so the tool always works even without a backend deployed. */
(function () {
  "use strict";

  var API_BASE = "https://poloprompt-server.onrender.com";

  function getIdeasLocal(industry, goal) {
    var key = industry + "|" + goal;
    if (AUTOMATION_IDEAS[key]) return AUTOMATION_IDEAS[key];
    return AUTOMATION_FALLBACKS[industry] || [];
  }

  function fetchIdeas(industry, goal) {
    if (!API_BASE) return Promise.resolve(getIdeasLocal(industry, goal));
    var url = API_BASE + "/api/automation-ideas?industry=" + encodeURIComponent(industry) + "&goal=" + encodeURIComponent(goal);
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .catch(function () {
        return getIdeasLocal(industry, goal);
      });
  }

  function renderTable(list) {
    var rows = list.map(function (it) {
      return "<tr><td>" + it.name + "</td><td>" + it.steps + "</td><td><code>" + it.prompt + "</code></td></tr>";
    }).join("");
    return "<table class=\"result-table\"><thead><tr><th>Automation Idea</th><th>Trigger → Action Steps</th><th>Implementation Prompt</th></tr></thead><tbody>" + rows + "</tbody></table>";
  }

  function renderPlainText(industry, goal, list) {
    var lines = ["Automation ideas for " + industry + " — " + goal + ":", ""];
    list.forEach(function (it, i) {
      lines.push((i + 1) + ". " + it.name);
      lines.push("   Steps: " + it.steps);
      lines.push("   Prompt: " + it.prompt);
      lines.push("");
    });
    return lines.join("\n");
  }

  function init() {
    var form = document.getElementById("automation-form");
    var tableWrap = document.getElementById("automation-table-wrap");
    var plainOutput = document.getElementById("automation-plain-output");
    var copyWrap = document.getElementById("automation-copy-wrap");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var industry = document.getElementById("industry-select").value;
      var goal = document.getElementById("goal-select").value;

      fetchIdeas(industry, goal).then(function (list) {
        tableWrap.innerHTML = renderTable(list);
        tableWrap.hidden = false;
        plainOutput.textContent = renderPlainText(industry, goal, list);
        copyWrap.hidden = false;
        tableWrap.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
