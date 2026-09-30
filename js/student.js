/* ===========================================================
   STUDENT.JS — interaction-log student portal (prototype)
   =========================================================== */

/* ---------- helpers ---------- */
function h(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;   // textContent: user input is never parsed as HTML
  return e;
}
function nowStamp() {
  const d = new Date(), p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function resolveReply(r) {
  if (r === "summary") return summaryText();
  if (r === "feedback") return feedbackText();
  return r;
}

/* ---------- log entry renderer ---------- */
function renderEntry(entry, opts = {}) {
  const wrap = h("article", "log-entry");

  const meta = h("div", "log-meta");
  meta.append(h("span", "turn", `Turn ${entry.turn}`), h("span", "ts", entry.ts));
  if (opts.showAgentTag) meta.append(h("span", `agent-tag ${entry.agent}`, entry.agent === "expert" ? "Expert Agent" : "Assistant Agent"));
  const save = h("button", "save", "Bookmark");
  save.addEventListener("click", () => { save.classList.toggle("on"); save.textContent = save.classList.contains("on") ? "Bookmarked" : "Bookmark"; });
  meta.append(save);
  wrap.append(meta);

  // student side
  const st = LOG_STUDENTS[entry.user] || { initials: "?", color: "#777" };
  const ex1 = h("div", "exchange");
  const who1 = h("div", "who");
  const av1 = h("div", "avatar", st.initials); av1.style.background = st.color;
  who1.append(av1, h("div", "arrow", "↓"), h("div", "role", "student"));
  ex1.append(who1, h("div", "bubble", entry.student));
  wrap.append(ex1);

  // agent side
  const ex2 = h("div", "exchange agent");
  const who2 = h("div", "who");
  who2.append(h("div", "avatar bot", entry.agent === "expert" ? "E" : "A"), h("div", "arrow", "↓"),
              h("div", "role", entry.agent === "expert" ? "expert agent" : "assistant agent"));
  ex2.append(who2, h("div", `bubble ${entry.agent}`, resolveReply(entry.reply)));
  wrap.append(ex2);

  const co = h("div", "callout");
  co.append(h("span", "", entry.note));
  wrap.append(co);
  return wrap;
}

function renderLog(container, entries, opts) {
  container.replaceChildren(...entries.map(e => renderEntry(e, opts)));
}
function scrollToBottom() { window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); }

/* ---------- tab switching ---------- */
const tabs = document.querySelectorAll(".tab");
function showTab(name) {
  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === `panel-${name}`));
  if (name === "multi") renderMulti();
  window.scrollTo({ top: 0 });
}
tabs.forEach(t => t.addEventListener("click", () => showTab(t.dataset.tab)));

/* ---------- Intelligent Tutoring (Expert Agent) ---------- */
const tutoringEl = document.getElementById("log-tutoring");

function expertReply(q) {
  const s = q.toLowerCase();
  const hit = EXPERT_QA.find(e => e.keywords.some(k => s.includes(k)));
  return hit ? hit.reply : EXPERT_DEFAULT_REPLY;
}
function askExpert(text) {
  text = text.trim();
  if (!text) return;
  const entry = {
    turn: TUTORING_LOG.length + 1, ts: nowStamp(), agent: "expert", user: CURRENT_USER,
    student: text, reply: expertReply(text), note: "The expert agent answered the question."
  };
  TUTORING_LOG.push(entry);
  tutoringEl.append(renderEntry(entry));
  scrollToBottom();
}
document.getElementById("send-tutoring").addEventListener("click", () => {
  const i = document.getElementById("input-tutoring");
  askExpert(i.value); i.value = "";
});
document.getElementById("input-tutoring").addEventListener("keydown", e => { if (e.key === "Enter") document.getElementById("send-tutoring").click(); });
EXPERT_QUICK.forEach(q => {
  const b = h("button", "chip", q);
  b.addEventListener("click", () => askExpert(q));
  document.getElementById("quick-tutoring").append(b);
});

/* ---------- Latest Progress (Assistant Agent) ---------- */
const progressEl = document.getElementById("log-progress");
let nudgeIdx = 0;

function assistantReply(text) {
  const s = text.toLowerCase();
  if (s.includes("summary")) return { reply: "summary", note: "The assistant agent provided personalized feedback about collaborative problem-solving processes." };
  if (s.includes("feedback")) return { reply: "feedback", note: "The assistant agent provided learners with personalized emotional feedback." };
  const n = ASSISTANT_NUDGES[nudgeIdx++ % ASSISTANT_NUDGES.length];
  return { reply: n, note: "The assistant provided support to guide learners in solving problems collaboratively." };
}
function askAssistant(text) {
  text = text.trim();
  if (!text) return;
  const r = assistantReply(text);
  const entry = { turn: PROGRESS_LOG.length + 1, ts: nowStamp(), agent: "assistant", user: CURRENT_USER, student: text, reply: r.reply, note: r.note };
  PROGRESS_LOG.push(entry);
  progressEl.append(renderEntry(entry));
  scrollToBottom();
}
document.getElementById("send-progress").addEventListener("click", () => {
  const i = document.getElementById("input-progress");
  askAssistant(i.value); i.value = "";
});
document.getElementById("input-progress").addEventListener("keydown", e => { if (e.key === "Enter") document.getElementById("send-progress").click(); });
ASSISTANT_QUICK.forEach(q => {
  const b = h("button", "chip", q);
  b.addEventListener("click", () => askAssistant(q));
  document.getElementById("quick-progress").append(b);
});

/* ---------- Multi-Agent Education (combined, chronological) ---------- */
function renderMulti() {
  const merged = [...TUTORING_LOG, ...PROGRESS_LOG].sort((a, b) => a.ts.localeCompare(b.ts));
  const numbered = merged.map((e, i) => ({ ...e, turn: i + 1 }));
  renderLog(document.getElementById("log-multi"), numbered, { showAgentTag: true });
}

/* ---------- Test Questions ---------- */
function renderTest() {
  const sheet = document.getElementById("test-sheet");
  sheet.replaceChildren(h("h3", "", "Test questions"));
  const wrong = [];
  let correct = 0;
  TEST.questions.forEach((q, i) => {
    const box = h("div", "q");
    box.append(h("p", "", `Question ${i + 1}: ${q.q}`));
    q.opts.forEach((o, j) => {
      const lab = h("label");
      const r = h("input"); r.type = "radio"; r.name = `q${i}`; r.checked = j === q.chosen; r.disabled = true;
      lab.append(r, document.createTextNode(o));
      if (j === q.chosen && q.chosen === q.answer) { lab.classList.add("right"); lab.append(h("span", "mark", "✓ correct")); }
      if (j === q.chosen && q.chosen !== q.answer) { lab.classList.add("wrong"); lab.append(h("span", "mark", "✗ incorrect")); }
      box.append(lab);
    });
    if (q.chosen === q.answer) correct++; else wrong.push(i + 1);
    sheet.append(box);
  });

  const score = Math.round((correct / TEST.questions.length) * 100);
  const fb = document.getElementById("test-feedback");
  fb.replaceChildren(
    h("h4", "", "Personalized feedback:"),
    h("p", "", `You answered ${correct} of ${TEST.questions.length} questions correctly.\nYour score is ${score} points.\nQuestion numbers you answered incorrectly: ${wrong.join(", ") || "none"}`),
    h("h4", "", "Personalized suggestions:"),
    h("p", "", TEST.suggestions),
    h("h4", "", "Personalized resource recommendations:"),
    h("p", "", TEST.resources)
  );
}

/* ---------- Group Evaluation ---------- */
function renderGroupEval() {
  const rows = GROUP_EVAL.map(g => ({
    ...g, overall: Math.round(g.scores.reduce((sum, s, i) => sum + s * CRITERIA[i].w, 0) / 100)
  }));
  const table = document.getElementById("eval-table");
  const head = h("tr");
  ["Group", ...CRITERIA.map(c => `${c.name} (${c.w}%)`), "Overall"].forEach(t => head.append(h("th", "", t)));
  const thead = h("thead"); thead.append(head);
  const tbody = h("tbody");
  rows.forEach(r => {
    const tr = h("tr", r.me ? "me" : "");
    tr.append(h("td", "", r.me ? `${r.group} (your group)` : r.group));
    r.scores.forEach(s => tr.append(h("td", "", `${s}%`)));
    const td = h("td", "overall", `${r.overall}%`);
    const bw = h("div", "bar-wrap"); const bi = h("i"); bi.style.width = `${r.overall}%`; bw.append(bi); td.append(bw);
    tr.append(td);
    tbody.append(tr);
  });
  table.replaceChildren(thead, tbody);

  document.getElementById("eval-notes").replaceChildren(...rows.map(r => {
    const d = h("div", "eval-note");
    const b = h("b", "", `${r.group} — ${r.overall}%: `);
    d.append(b, document.createTextNode(r.note));
    return d;
  }));
}

/* ---------- clock + init ---------- */
function tick() { document.getElementById("clock").textContent = nowStamp(); }
tick(); setInterval(tick, 30000);

renderLog(tutoringEl, TUTORING_LOG);
renderLog(progressEl, PROGRESS_LOG);
renderTest();
renderGroupEval();
