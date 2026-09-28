/* ===========================================================
   LECTURER.JS — Lecturer portal view logic (prototype only)
   =========================================================== */

const VIEW_TITLES = {
  dashboard: "Lecturer Dashboard",
  problems: "Problems",
  groups: "Student Groups",
  "group-detail": "Group Detail",
  activity: "Student Activity",
  insights: "AI Insights",
  evaluations: "Evaluations",
  resources: "Resources"
};

function showView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(`view-${name}`).classList.add("active");
  document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.view === name));
  document.getElementById("topbar-title").textContent = VIEW_TITLES[name] || name;
}

document.querySelectorAll(".nav-item[data-view]").forEach(btn => {
  btn.addEventListener("click", () => showView(btn.dataset.view));
});
document.querySelectorAll("[data-goto]").forEach(btn => {
  btn.addEventListener("click", () => showView(btn.dataset.goto));
});

function statusPillClass(status) {
  const s = status.toLowerCase();
  if (s === "active" || s === "near completion") return "pill-good";
  if (s === "needs attention") return "pill-warn";
  return "pill-neutral";
}

function groupsTableRows() {
  return GROUPS_OVERVIEW.map(g => `
    <tr data-group="${g.name}">
      <td>${g.name}</td>
      <td>${g.students}</td>
      <td>${g.progress}%</td>
      <td><span class="pill ${participationPillClass(g.participation)}">${g.participation}</span></td>
      <td><span class="pill ${statusPillClass(g.status)}">${g.status}</span></td>
    </tr>`).join("");
}

function wireGroupRowClicks() {
  document.querySelectorAll("tr[data-group]").forEach(row => {
    row.addEventListener("click", () => openGroupDetail(row.dataset.group));
  });
}

/* ---------------- Dashboard ---------------- */
function renderDashboard() {
  document.getElementById("lec-total-students").textContent = LECTURER_STATS.totalStudents;
  document.getElementById("lec-groups").textContent = LECTURER_STATS.groups;
  document.getElementById("lec-active-problems").textContent = LECTURER_STATS.activeProblems;
  document.getElementById("lec-avg-progress").textContent = formatPct(LECTURER_STATS.avgProgress);
  document.getElementById("lec-participation").textContent = formatPct(LECTURER_STATS.participationRate);
  document.getElementById("lec-questions").textContent = LECTURER_STATS.questionsRaised;
  document.getElementById("lec-gaps").textContent = LECTURER_STATS.knowledgeGaps;
  document.getElementById("lec-groups-table").innerHTML = groupsTableRows();
  wireGroupRowClicks();
}

/* ---------------- Problems ---------------- */
function renderProblems() {
  document.getElementById("prob-title").textContent = PROBLEM.title;
  document.getElementById("prob-domain").textContent = PROBLEM.domain;
  document.getElementById("prob-due").textContent = PROBLEM.dueIn;
}

/* ---------------- Groups list ---------------- */
function renderGroupsList() {
  document.getElementById("groups-table-full").innerHTML = groupsTableRows();
  wireGroupRowClicks();
}

/* ---------------- Group detail ---------------- */
function openGroupDetail(groupName) {
  const overview = GROUPS_OVERVIEW.find(g => g.name === groupName) || GROUPS_OVERVIEW[0];
  document.getElementById("gd-name").textContent = overview.name;
  document.getElementById("gd-progress-fill").style.width = `${overview.progress}%`;
  document.getElementById("gd-progress-pct").textContent = formatPct(overview.progress);
  document.getElementById("gd-stage").textContent = GROUP.stage;
  document.getElementById("gd-participation").textContent = overview.participation;
  document.getElementById("gd-activity").textContent = ASSISTANT_STATE.discussionActivity;
  document.getElementById("gd-unanswered").textContent = ASSISTANT_STATE.unansweredQuestions;

  // Group Alpha carries the full mock detail; other groups reuse it
  // for this prototype so every row is inspectable.
  document.getElementById("gd-members").innerHTML = GROUP.members.map(m => `
    <div class="member-row">
      <div class="avatar">${m.initials}</div>
      <div class="name">${m.name}</div>
      <span class="pill ${participationPillClass(m.status)}">${m.status}</span>
    </div>`).join("");

  document.getElementById("gd-discussion").innerHTML = DISCUSSION.slice(0, 3).map(m => `
    <div class="msg" style="margin-bottom:8px;"><div class="who">${m.who}</div>${m.text}</div>`).join("");

  document.getElementById("gd-observations").innerHTML = assistantAgentInterventionFeed().map(i => `
    <div class="observation"><span class="pill pill-amber tag">Assistant</span><span>${i.text}</span></div>`).join("");

  document.getElementById("gd-solution").textContent = SUBMITTED_SOLUTION;
  document.getElementById("gd-score").textContent = formatPct(EVALUATION.overall);
  document.getElementById("gd-rubric").innerHTML = EVALUATION.criteria.map(c => `
    <div class="rubric-row">
      <div class="crit">${c.name} <span class="weight">(${c.weight}%)</span></div>
      <div class="progress-track"><div class="progress-fill teal" style="width:${c.score}%;"></div></div>
      <div class="score">${c.score}%</div>
      <div class="rubric-note">${c.note}</div>
    </div>`).join("");

  showView("group-detail");
}

/* ---------------- Student activity ---------------- */
function renderActivity() {
  document.getElementById("activity-members").innerHTML = GROUP.members.map(m => `
    <div class="member-row">
      <div class="avatar">${m.initials}</div>
      <div class="name">${m.name}</div>
      <div style="color:var(--text-mute);">${m.activity}</div>
      <span class="pill ${participationPillClass(m.status)}">${m.participation}%</span>
    </div>`).join("");
}

/* ---------------- AI Insights ---------------- */
function renderInsights() {
  document.getElementById("insights-gaps").innerHTML = [...new Set(RESOURCES.map(r => r.gap))].map(gap => `
    <div class="observation"><span class="pill pill-teal tag">Gap</span><span>${gap} — flagged across multiple groups' discussions.</span></div>`).join("");
  document.getElementById("insights-observations").innerHTML = assistantAgentInterventionFeed().map(i => `
    <div class="observation"><span class="pill pill-amber tag">Assistant</span><span>${i.text}</span></div>`).join("");
}

/* ---------------- Evaluations ---------------- */
function renderEvaluations() {
  document.getElementById("evaluations-table").innerHTML = GROUPS_OVERVIEW.map(g => `
    <tr data-group="${g.name}">
      <td>${g.name}</td>
      <td>${g.name === "Group Alpha" ? formatPct(EVALUATION.overall) : "Pending"}</td>
      <td><span class="pill ${g.name === "Group Alpha" ? "pill-good" : "pill-neutral"}">${g.name === "Group Alpha" ? "Evaluated" : "Awaiting submission"}</span></td>
    </tr>`).join("");
  wireGroupRowClicks();
}

/* ---------------- Resources ---------------- */
function renderResources() {
  document.getElementById("lec-resources-grid").innerHTML = RESOURCES.map(r => `
    <div class="resource-card">
      <span class="pill pill-neutral" style="align-self:flex-start;">${r.gap}</span>
      <h3 style="font-size:15px;margin:4px 0;">${r.title}</h3>
      <div class="resource-meta"><span>${r.type}</span><span>·</span><span>${r.difficulty}</span></div>
    </div>`).join("");
}

/* ---------------- Init ---------------- */
renderDashboard();
renderProblems();
renderGroupsList();
renderActivity();
renderInsights();
renderEvaluations();
renderResources();
