/* ===========================================================
   MOCK DATA — prototype only. Nothing here touches a real
<<<<<<< HEAD
   backend or AI model; it stands in for the Data Layer and
=======
   database or AI model; it stands in for the Data Layer and
>>>>>>> 473ccba51f23d5e365cec93b0189dcb6c27d4878
   Knowledge Processing Layer described in the research paper.
   =========================================================== */

const PLATFORM = {
<<<<<<< HEAD
  name: "Ebuka-Learn AI",
=======
  name: "CoLearn AI",
>>>>>>> 473ccba51f23d5e365cec93b0189dcb6c27d4878
  tagline: "Collaborative problem solving, guided by two AI agents"
};

const CURRENT_STUDENT = { name: "Stephen", initials: "ST", role: "Student" };
const CURRENT_LECTURER = { name: "Dr. Amara Nwosu", initials: "AN", role: "Lecturer" };

const PROBLEM = {
<<<<<<< HEAD
  title: "Design and Program an Autonomous Line-Following Robot with Obstacle Avoidance",
  statement: "Design and program a robot that can follow a marked line autonomously, detect and avoid obstacles in its path, and recover if it loses the line. Identify the sensors and actuators required, design the control logic (including how the robot switches between behaviours), and justify your debugging and testing approach.",
  domain: "Robotics Programming",
=======
  title: "Design a Database System for University Course Registration",
  statement: "Design a database system for managing university course registration. Identify the required entities, relationships, tables and constraints, and justify your design decisions.",
  domain: "Database Systems",
>>>>>>> 473ccba51f23d5e365cec93b0189dcb6c27d4878
  dueIn: "4 days"
};

const GROUP = {
  name: "Group Alpha",
  members: [
<<<<<<< HEAD
    { name: "Stephen", initials: "ST", activity: "Wiring the motor driver board", participation: 82, status: "Active" },
    { name: "Ada", initials: "AD", activity: "Drafting the state-machine diagram", participation: 74, status: "Active" },
    { name: "Chinedu", initials: "CH", activity: "Idle for 20 min", participation: 41, status: "Idle" },
    { name: "David", initials: "DA", activity: "Testing IR sensor calibration", participation: 88, status: "Active" }
=======
    { name: "Stephen", initials: "ST", activity: "Drafting ER diagram", participation: 82, status: "Active" },
    { name: "Ada", initials: "AD", activity: "Reviewing normalization notes", participation: 74, status: "Active" },
    { name: "Chinedu", initials: "CH", activity: "Idle for 20 min", participation: 41, status: "Idle" },
    { name: "David", initials: "DA", activity: "Posted last message 2 min ago", participation: 88, status: "Active" }
>>>>>>> 473ccba51f23d5e365cec93b0189dcb6c27d4878
  ],
  progress: 68,
  participation: "Good",
  stage: "Discussion"
};

const STAGES = ["Understand Problem", "Research", "Discussion", "Develop Solution", "Review", "Submit"];
const CURRENT_STAGE_INDEX = 2; // "Discussion"

const DISCUSSION = [
<<<<<<< HEAD
  { who: "Ada", self: false, text: "I think we need a state machine — at least FOLLOW_LINE and AVOID_OBSTACLE states." },
  { who: "David", self: false, text: "Agreed. We should also debounce the IR sensor readings — I saw a few false line-loss triggers during testing." },
  { who: "Stephen", self: true, text: "What happens if both IR sensors read white at the same time? Do we need a LOST_LINE state too?" },
  { who: "Ada", self: false, text: "Good catch — a short rotate-and-search routine could work for that." }
=======
  { who: "Ada", self: false, text: "I think we need separate tables for Student, Course, and Enrollment at minimum." },
  { who: "David", self: false, text: "Agreed. Enrollment should be a join table so we can capture the many-to-many relationship." },
  { who: "Stephen", self: true, text: "What about prerequisites? Does that need its own table too?" },
  { who: "Ada", self: false, text: "Good catch — a self-referencing table on Course could work for that." }
>>>>>>> 473ccba51f23d5e365cec93b0189dcb6c27d4878
];

const ASSISTANT_STATE = {
  participation: 78,
  discussionActivity: "High",
  unansweredQuestions: 2,
  currentStage: "Discussion",
  interventions: [
    { level: "warn", text: "Three group members have not contributed to the discussion in the last 15 minutes." },
<<<<<<< HEAD
    { level: "neutral", text: "Your group has discussed sensor readings but has not yet addressed how actuators should respond to them." },
    { level: "good", text: "Consider reviewing the requirements once more before proceeding to implementation." }
  ]
};

const SUBMITTED_SOLUTION = `System: Line-Following Robot with Obstacle Avoidance

Sensors: 2x IR line sensors (left, right), 1x ultrasonic distance sensor (front)
Actuators: 2x DC motors (left, right) via motor driver, 1x buzzer for alerts

States:
- FOLLOW_LINE: read IR sensors; adjust left/right motor speed to stay centred on the line
- AVOID_OBSTACLE: triggered when ultrasonic distance < 10cm; stop, reverse briefly, turn, then resume FOLLOW_LINE
- LOST_LINE: triggered when both IR sensors read white; rotate in place until the line is reacquired

Debugging notes: added a 50ms debounce to IR sensor readings after observing false LOST_LINE triggers caused by sensor noise at the line's edges.`;
=======
    { level: "neutral", text: "Your group has discussed database entities but has not yet addressed relationships between them." },
    { level: "good", text: "Consider reviewing the requirements once more before moving on to implementation." }
  ]
};

// Keyword-matched Expert Agent responses — a stand-in for real
// LLM inference in this prototype.
const EXPERT_QA = [
  {
    keywords: ["primary key", "foreign key"],
    answer: "A primary key uniquely identifies each record in a table, while a foreign key creates a relationship between tables by referencing a key in another table.",
    example: "In your registration system, Student.student_id would be a primary key, and Enrollment.student_id would be a foreign key referencing it.",
    resources: ["Introduction to Relational Keys", "Entity Relationship Modelling"]
  },
  {
    keywords: ["normaliz", "normal form", "1nf", "2nf", "3nf"],
    answer: "Normalization organizes tables to reduce redundancy and avoid update anomalies, typically by progressing through normal forms (1NF, 2NF, 3NF).",
    example: "Splitting a single 'Enrollment' table that repeats course details into 'Course' and 'Enrollment' tables is a step toward 2NF.",
    resources: ["Introduction to Database Normalization", "First Normal Form (1NF)", "Second Normal Form (2NF)"]
  },
  {
    keywords: ["many-to-many", "join table", "relationship"],
    answer: "A many-to-many relationship, such as students enrolling in many courses and courses having many students, is modelled with a join (junction) table.",
    example: "An Enrollment table with student_id and course_id as a composite key resolves the Student–Course many-to-many relationship.",
    resources: ["Entity Relationship Modelling", "Designing Junction Tables"]
  },
  {
    keywords: ["constraint"],
    answer: "Constraints enforce data integrity — common types include NOT NULL, UNIQUE, CHECK, and FOREIGN KEY constraints.",
    example: "A CHECK constraint could ensure a student cannot enroll in more than 6 courses per semester.",
    resources: ["Database Constraints Explained"]
  }
];

const EXPERT_DEFAULT = {
  answer: "That's a good question to bring to the group discussion as well. Based on the problem statement, focus first on identifying your core entities before worrying about edge cases.",
  example: "For this problem, Student, Course, and Enrollment are a reasonable starting set of entities.",
  resources: ["Entity Relationship Modelling", "Introduction to Database Normalization"]
};

const SUGGESTED_QUESTIONS = [
  "What is the difference between a primary key and a foreign key?",
  "How do I handle a many-to-many relationship?",
  "What is database normalization?",
  "What constraints should I add to the Enrollment table?"
];

const SUBMITTED_SOLUTION = `Entities: Student, Course, Enrollment, Prerequisite, Department

- Student(student_id PK, name, email, department_id FK)
- Course(course_id PK, title, credit_units, department_id FK)
- Enrollment(student_id FK, course_id FK, semester, grade) — composite PK
- Prerequisite(course_id FK, prerequisite_course_id FK) — self-referencing on Course
- Department(department_id PK, name)

Constraints: UNIQUE(student_id, course_id, semester) on Enrollment; CHECK(credit_units > 0) on Course;
FOREIGN KEY constraints enforced on all relationship columns.`;
>>>>>>> 473ccba51f23d5e365cec93b0189dcb6c27d4878

const EVALUATION = {
  overall: 82,
  criteria: [
<<<<<<< HEAD
    { name: "Correctness", weight: 30, score: 85, note: "State transitions are technically sound; the debounce logic correctly filters sensor noise." },
    { name: "Reasonability", weight: 20, score: 80, note: "Design choices are justified, though the rationale for the reverse-and-turn sequence could be stated more explicitly." },
    { name: "Completeness", weight: 20, score: 78, note: "Core behaviours are covered; consider handling the case where an obstacle appears while already recovering from LOST_LINE." },
    { name: "Originality", weight: 20, score: 82, note: "Reasonable, non-templated structure with a sensible debounce and recovery routine." },
    { name: "Layout", weight: 10, score: 88, note: "Clear, consistently formatted state descriptions." }
=======
    { name: "Correctness", weight: 30, score: 85, note: "Entities and relationships are technically sound; the Enrollment composite key is used correctly." },
    { name: "Reasonability", weight: 20, score: 80, note: "Design choices are justified, though the rationale for the Prerequisite table could be stated more explicitly." },
    { name: "Completeness", weight: 20, score: 78, note: "Core requirements are covered; consider addressing course capacity limits and waitlisting." },
    { name: "Originality", weight: 20, score: 82, note: "Reasonable, non-templated structure with a sensible self-referencing Prerequisite table." },
    { name: "Layout", weight: 10, score: 88, note: "Clear, consistently formatted schema notation." }
>>>>>>> 473ccba51f23d5e365cec93b0189dcb6c27d4878
  ]
};

const RESOURCES = [
<<<<<<< HEAD
  { gap: "Algorithm design & pseudocode", title: "Translating Robotics Problems into Pseudocode", type: "Article", difficulty: "Beginner" },
  { gap: "Sensor & actuator programming", title: "Reading Sensors and Driving Actuators Together", type: "Video", difficulty: "Beginner" },
  { gap: "State-based behaviour", title: "Designing State Machines for Robots", type: "Interactive Guide", difficulty: "Intermediate" },
  { gap: "Debugging", title: "A Systematic Approach to Robot Debugging", type: "Article", difficulty: "Intermediate" },
  { gap: "Optimisation", title: "Comparing Algorithms for Efficiency and Robustness", type: "Article", difficulty: "Advanced" }
=======
  { gap: "Database normalization", title: "Introduction to Database Normalization", type: "Article", difficulty: "Beginner" },
  { gap: "Database normalization", title: "First Normal Form (1NF)", type: "Video", difficulty: "Beginner" },
  { gap: "Database normalization", title: "Second Normal Form (2NF)", type: "Video", difficulty: "Intermediate" },
  { gap: "Entity relationships", title: "Entity Relationship Modelling", type: "Interactive Guide", difficulty: "Intermediate" },
  { gap: "Data integrity", title: "Database Constraints Explained", type: "Article", difficulty: "Beginner" }
>>>>>>> 473ccba51f23d5e365cec93b0189dcb6c27d4878
];

const GROUPS_OVERVIEW = [
  { name: "Group Alpha", students: 5, progress: 82, participation: "High", status: "Active" },
  { name: "Group Beta", students: 5, progress: 64, participation: "Medium", status: "Needs Attention" },
  { name: "Group Gamma", students: 4, progress: 91, participation: "High", status: "Near Completion" },
  { name: "Group Delta", students: 5, progress: 47, participation: "Low", status: "Needs Attention" }
];

const LECTURER_STATS = {
  totalStudents: 19,
  groups: 4,
  activeProblems: 3,
  avgProgress: 71,
  participationRate: 76,
  questionsRaised: 14,
  knowledgeGaps: 5
};
