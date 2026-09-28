/* ===========================================================
   LOG-DATA.JS — mock data for the student interaction-log UI.
   Prototype only: every "agent reply" below is predefined.
   =========================================================== */

const LOG_STUDENTS = {
  Stephen: { initials: "ST", color: "#7A4B36" },
  Ada:     { initials: "AD", color: "#C9A91B" },
  Chinedu: { initials: "CH", color: "#3B6E8F" },
  David:   { initials: "DA", color: "#6A5A9B" }
};

const CURRENT_USER = "Stephen";

/* ---- Intelligent Tutoring: Expert Agent log ---- */
const TUTORING_LOG = [
  {
    turn: 1, ts: "2025-04-07 20:10", agent: "expert", user: "Stephen",
    student: "What is the difference between a primary key and a foreign key?",
    reply: "A primary key uniquely identifies each record in a table, while a foreign key creates a relationship between tables by referencing a key in another table.\n\nIn your registration system, Student.student_id would be a primary key, and Enrollment.student_id would be a foreign key referencing it.",
    note: "The expert agent answered the question."
  },
  {
    turn: 2, ts: "2025-04-07 20:14", agent: "expert", user: "Ada",
    student: "How should a database for course registration be designed?",
    reply: "Designing a course registration database is a multi-step process that combines requirements analysis, conceptual modelling and careful constraint design. The main steps are as follows:\n1. Requirements Analysis\nClarify Objectives: Determine what must be recorded (students, courses, semesters, grades) and who will use the data.\nIdentify Rules: e.g. prerequisites, credit limits, course capacity.\n2. Entity Identification\nCore entities: Student, Course, Department, Enrollment. Supporting entity: Prerequisite (self-referencing on Course).\n3. Relationship Mapping\nStudent–Course is many-to-many, resolved with an Enrollment join table holding student_id and course_id.\n4. Normalization\nRemove repeating groups (1NF), partial dependencies (2NF) and transitive dependencies (3NF).\n5. Constraints\nPrimary keys, foreign keys, UNIQUE(student_id, course_id, semester), CHECK(credit_units > 0).",
    note: "The expert agent answered the question."
  }
];

/* Keyword-matched replies for newly asked questions */
const EXPERT_QA = [
  { keywords: ["primary key", "foreign key"], reply: "A primary key uniquely identifies each record in a table, while a foreign key creates a relationship between tables by referencing a key in another table." },
  { keywords: ["normaliz", "normal form", "1nf", "2nf", "3nf"], reply: "Normalization organizes tables to reduce redundancy and avoid update anomalies, moving step by step through the normal forms.\n1NF: atomic values, no repeating groups.\n2NF: no partial dependency on part of a composite key.\n3NF: no transitive dependency between non-key columns.\nExample: moving course title out of Enrollment and into Course is a step toward 2NF." },
  { keywords: ["many-to-many", "join table", "junction", "relationship"], reply: "A many-to-many relationship, such as students enrolling in many courses and courses having many students, is modelled with a join (junction) table.\nExample: Enrollment(student_id, course_id, semester) with a composite key resolves the Student–Course relationship." },
  { keywords: ["constraint", "unique", "check"], reply: "Constraints enforce data integrity. Common types are NOT NULL, UNIQUE, CHECK and FOREIGN KEY.\nExample: UNIQUE(student_id, course_id, semester) prevents a student enrolling twice in the same course in the same semester." },
  { keywords: ["resource", "read", "learn"], reply: "Recommended next: Introduction to Database Normalization, First Normal Form (1NF), Second Normal Form (2NF) and Entity Relationship Modelling. These target the gaps identified in your last test." }
];
const EXPERT_DEFAULT_REPLY = "That is a good question to bring to your group as well. Based on the problem statement, focus first on identifying your core entities (Student, Course, Enrollment) before working on edge cases.";
const EXPERT_QUICK = [
  "What is database normalization?",
  "How do I handle a many-to-many relationship?",
  "What constraints should Enrollment have?",
  "Recommend resources"
];

/* ---- Latest Progress: Assistant Agent log ---- */
const PROGRESS_LOG = [
  {
    turn: 1, ts: "2025-04-05 09:28", agent: "assistant", user: "Stephen",
    student: "hello!",
    reply: "Dear teammates, our collaborative learning session is now live! Let's dive into problem-solving together. To work at full speed, we'll be dividing the group into the following roles: Team Leader, Information Collector, and Solution Integrator. Discuss with your group members to quickly decide who plays which role. We can't wait to see your contributions!",
    note: "The assistant provided support to guide learners in solving problems collaboratively."
  },
  {
    turn: 2, ts: "2025-04-09 14:47", agent: "assistant", user: "Stephen",
    student: "Summary",
    reply: "summary",   // rendered by summaryText()
    note: "The assistant agent provided personalized feedback about collaborative problem-solving processes."
  },
  {
    turn: 3, ts: "2025-04-09 19:19", agent: "assistant", user: "Ada",
    student: "Feedback",
    reply: "feedback",  // rendered by feedbackText()
    note: "The assistant agent provided learners with personalized emotional feedback."
  }
];

const GROUP_STATS = {
  topics: "Entities and attributes, primary and foreign keys, many-to-many relationships, join tables, normalization (1NF, 2NF), constraints",
  conversations: { Stephen: 24, Ada: 31, Chinedu: 9, David: 36 },
  keywords: [["Entities", 18], ["Relationships", 14], ["Foreign key", 12], ["Normalization", 9], ["Constraints", 6]]
};

function summaryText() {
  const total = Object.values(GROUP_STATS.conversations).reduce((a, b) => a + b, 0);
  const per = Object.entries(GROUP_STATS.conversations).map(([n, c]) => `${n}: ${c}`).join("\n");
  const kw = GROUP_STATS.keywords.map(([k, c]) => `"${k}": ${c}`).join("\n");
  return `The current group has engaged in collaborative problem-solving centred on the following topics: "${GROUP_STATS.topics}."\n\nNumber of conversations: ${total}\nNumber of conversations with each student:\n${per}\n\nKeywords and their frequencies:\n${kw}\n\nObservation: relationships between entities have been discussed less than entities themselves. Chinedu has contributed the least so far.`;
}
function feedbackText() {
  return "Stephen: You asked well-targeted questions about prerequisites and moved the group forward. Keep sharing your reasoning openly.\n\nAda: You were very active and put forward many insights, especially on normalization. Your enthusiasm is a driving force for the group. Keep it up!\n\nChinedu: Although you have not spoken much recently, your earlier point about constraints was valuable. We hope you will share more of your ideas.\n\nDavid: You spoke the most and gave in-depth analyses of relationships and join tables. Please also leave room for quieter teammates.";
}
const ASSISTANT_NUDGES = [
  "Three group members have not contributed to the discussion recently. Consider inviting them to share their view.",
  "Your group has discussed database entities but has not yet addressed relationships between them.",
  "Consider reviewing the requirements once more before proceeding to implementation.",
  "There are 2 unanswered questions in the discussion. Would someone like to respond?"
];
const ASSISTANT_QUICK = ["Summary", "Feedback", "Any suggestions for my group?"];

/* ---- Test Questions ---- */
const TEST = {
  questions: [
    { q: "Which statement best describes a foreign key?", opts: ["A column that uniquely identifies every row", "A column that references a key in another table", "A column that stores only numeric values", "A column that is never allowed to be NULL"], answer: 1, chosen: 1 },
    { q: "Which normal form removes partial dependencies on a composite key?", opts: ["First normal form (1NF)", "Second normal form (2NF)", "Third normal form (3NF)", "Boyce-Codd normal form"], answer: 1, chosen: 0 },
    { q: "How is a many-to-many relationship implemented in a relational database?", opts: ["A larger primary key", "A duplicate column in each table", "A join (junction) table", "A view"], answer: 2, chosen: 2 },
    { q: "Which constraint prevents duplicate values across a combination of columns?", opts: ["CHECK", "UNIQUE", "DEFAULT", "NOT NULL"], answer: 1, chosen: 0 },
    { q: "What does a CHECK constraint do?", opts: ["Speeds up queries", "Encrypts a column", "Restricts values to a condition", "Deletes orphan rows"], answer: 2, chosen: 2 }
  ],
  suggestions: "Based on your test results, you still need to further improve your understanding of normalization stages and uniqueness constraints. Please continue to actively participate in collaborative problem-solving, delve more deeply into the relevant knowledge, and strengthen your understanding.",
  resources: "Weakness identification: Second normal form (2NF); UNIQUE constraints\nInterdisciplinary connection: Software engineering (schema design and data integrity in application development)\nLearning progress diagnosis: Progress is largely aligned with the instructional goal\nStage-specific suggestions: Review Introduction to Database Normalization, Second Normal Form (2NF) and Database Constraints Explained before the Review stage"
};

/* ---- Group Evaluation ---- */
const CRITERIA = [
  { name: "Correctness", w: 30 }, { name: "Reasonability", w: 20 }, { name: "Completeness", w: 20 },
  { name: "Originality", w: 20 }, { name: "Layout", w: 10 }
];
const GROUP_EVAL = [
  { group: "Group Alpha", me: true,  scores: [85, 80, 78, 82, 88], note: "Strong technical correctness and a sensible self-referencing Prerequisite table. Consider addressing course capacity limits and waitlisting." },
  { group: "Group Beta",  me: false, scores: [66, 62, 60, 65, 70], note: "Adequate structure, but design decisions are rarely justified and several relationships are only implied." },
  { group: "Group Gamma", me: false, scores: [93, 90, 90, 89, 92], note: "Comprehensive and well organized, with explicit constraints and clear rationale for each table." },
  { group: "Group Delta", me: false, scores: [48, 45, 44, 50, 55], note: "Key relationships are missing and entities are incompletely defined; revisit the requirements before continuing." }
];
