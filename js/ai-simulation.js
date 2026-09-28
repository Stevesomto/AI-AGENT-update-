/* ===========================================================
   AI-SIMULATION.JS
   Stands in for the Intelligent Service Layer in the proposed
   architecture. Every function here returns predefined data —
   there is no live model or API call in this prototype.
   =========================================================== */

function expertAgentRespond(question) {
  const q = question.toLowerCase();
  const match = EXPERT_QA.find(entry => entry.keywords.some(k => q.includes(k)));
  return match || EXPERT_DEFAULT;
}

function assistantAgentInterventionFeed() {
  return ASSISTANT_STATE.interventions;
}

function evaluateSubmission() {
  // In a real system this would call the Expert Agent's evaluation
  // model against the submitted solution. Here it simply returns
  // the predefined EVALUATION object after a short simulated delay.
  return EVALUATION;
}

function formatPct(n) {
  return `${n}%`;
}

function participationPillClass(level) {
  const l = (level || "").toLowerCase();
  if (l === "high" || l === "good" || l === "active") return "pill-good";
  if (l === "medium" || l === "idle" || l === "needs attention") return "pill-warn";
  if (l === "low") return "pill-bad";
  return "pill-neutral";
}
