/* ===========================================================
   MOCK DATA — prototype only. Nothing here touches a real
   backend or AI model; it stands in for the Data Layer and
   Knowledge Processing Layer described in the research paper.
   =========================================================== */

const PLATFORM = {
  name: "Ebuka-Learn AI",
  tagline: "Collaborative problem solving, guided by two AI agents"
};

const CURRENT_STUDENT = { name: "Stephen", initials: "ST", role: "Student" };
const CURRENT_LECTURER = { name: "Dr. Amara Nwosu", initials: "AN", role: "Lecturer" };

const PROBLEM = {
  title: "Design and Program an Autonomous Line-Following Robot with Obstacle Avoidance",
  statement: "Design and program a robot that can follow a marked line autonomously, detect and avoid obstacles in its path, and recover if it loses the line. Identify the sensors and actuators required, design the control logic (including how the robot switches between behaviours), and justify your debugging and testing approach.",
  domain: "Robotics Programming",
  dueIn: "4 days"
};

const GROUP = {
  name: "Group Alpha",
  members: [
    { name: "Stephen", initials: "ST", activity: "Wiring the motor driver board", participation: 82, status: "Active" },
    { name: "Ada", initials: "AD", activity: "Drafting the state-machine diagram", participation: 74, status: "Active" },
    { name: "Chinedu", initials: "CH", activity: "Idle for 20 min", participation: 41, status: "Idle" },
    { name: "David", initials: "DA", activity: "Testing IR sensor calibration", participation: 88, status: "Active" }
  ],
  progress: 68,
  participation: "Good",
  stage: "Discussion"
};

const STAGES = ["Understand Problem", "Research", "Discussion", "Develop Solution", "Review", "Submit"];
const CURRENT_STAGE_INDEX = 2; // "Discussion"

const DISCUSSION = [
  { who: "Ada", self: false, text: "I think we need a state machine — at least FOLLOW_LINE and AVOID_OBSTACLE states." },
  { who: "David", self: false, text: "Agreed. We should also debounce the IR sensor readings — I saw a few false line-loss triggers during testing." },
  { who: "Stephen", self: true, text: "What happens if both IR sensors read white at the same time? Do we need a LOST_LINE state too?" },
  { who: "Ada", self: false, text: "Good catch — a short rotate-and-search routine could work for that." }
];

const ASSISTANT_STATE = {
  participation: 78,
  discussionActivity: "High",
  unansweredQuestions: 2,
  currentStage: "Discussion",
  interventions: [
    { level: "warn", text: "Three group members have not contributed to the discussion in the last 15 minutes." },
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

const EVALUATION = {
  overall: 82,
  criteria: [
    { name: "Correctness", weight: 30, score: 85, note: "State transitions are technically sound; the debounce logic correctly filters sensor noise." },
    { name: "Reasonability", weight: 20, score: 80, note: "Design choices are justified, though the rationale for the reverse-and-turn sequence could be stated more explicitly." },
    { name: "Completeness", weight: 20, score: 78, note: "Core behaviours are covered; consider handling the case where an obstacle appears while already recovering from LOST_LINE." },
    { name: "Originality", weight: 20, score: 82, note: "Reasonable, non-templated structure with a sensible debounce and recovery routine." },
    { name: "Layout", weight: 10, score: 88, note: "Clear, consistently formatted state descriptions." }
  ]
};

const RESOURCES = [
  { gap: "Algorithm design & pseudocode", title: "Translating Robotics Problems into Pseudocode", type: "Article", difficulty: "Beginner" },
  { gap: "Sensor & actuator programming", title: "Reading Sensors and Driving Actuators Together", type: "Video", difficulty: "Beginner" },
  { gap: "State-based behaviour", title: "Designing State Machines for Robots", type: "Interactive Guide", difficulty: "Intermediate" },
  { gap: "Debugging", title: "A Systematic Approach to Robot Debugging", type: "Article", difficulty: "Intermediate" },
  { gap: "Optimisation", title: "Comparing Algorithms for Efficiency and Robustness", type: "Article", difficulty: "Advanced" }
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
