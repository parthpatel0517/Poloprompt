(function () {
  "use strict";

  var typeLabels = {
    trigger: "TRIGGER",
    filter: "FILTER/CONDITION",
    action: "ACTION"
  };

  var steps = [
    { app: "Typeform", type: "trigger" },
    { app: "Google Sheets", type: "action" }
  ];

  var listEl, output, outputWrap, appInput, typeSelect;

  function render() {
    listEl.innerHTML = "";
    steps.forEach(function (step, index) {
      var row = document.createElement("div");
      row.className = "checkbox-item";
      row.style.marginBottom = "8px";

      var circle = document.createElement("span");
      circle.className = "badge";
      circle.textContent = String(index + 1);

      var appName = document.createElement("strong");
      appName.textContent = step.app;
      appName.style.flex = "1";

      var typeBadge = document.createElement("span");
      typeBadge.className = "badge";
      typeBadge.textContent = typeLabels[step.type];

      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "btn btn-copy";
      removeBtn.textContent = "×";
      removeBtn.setAttribute("aria-label", "Remove step " + (index + 1));
      removeBtn.addEventListener("click", function () {
        steps.splice(index, 1);
        render();
      });

      row.appendChild(circle);
      row.appendChild(appName);
      row.appendChild(typeBadge);
      row.appendChild(removeBtn);
      listEl.appendChild(row);
    });
  }

  function buildPlanText() {
    return steps.map(function (step, index) {
      return (index + 1) + ". " + typeLabels[step.type] + " — " + step.app;
    }).join("\n");
  }

  function init() {
    listEl = document.getElementById("workflow-steps-list");
    output = document.getElementById("workflow-output");
    outputWrap = document.getElementById("workflow-output-wrap");
    appInput = document.getElementById("step-app-name");
    typeSelect = document.getElementById("step-type");
    var addForm = document.getElementById("add-step-form");
    var generateBtn = document.getElementById("generate-plan-btn");

    if (!listEl) return;

    addForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var app = appInput.value.trim();
      if (!app) {
        appInput.focus();
        return;
      }
      steps.push({ app: app, type: typeSelect.value });
      appInput.value = "";
      appInput.focus();
      render();
    });

    generateBtn.addEventListener("click", function () {
      if (!steps.length) return;
      output.textContent = buildPlanText();
      outputWrap.hidden = false;
      outputWrap.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
