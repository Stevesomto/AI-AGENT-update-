/* ===========================================================
   LOG-DATA.JS — mock data for the student interaction-log UI.
   Prototype only: every "agent reply" below is predefined.
   Domain: Robotics Programming (autonomous line-following
   robot with obstacle avoidance).
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
    student: "How do sensors, actuators, and the controller work together in our robot?",
    reply: "Robotics begins with the fundamentals of robotic systems — the relationship among controllers, sensors, actuators, power systems, software instructions, and environmental inputs. A robot receives information from its environment, processes that information through programmed logic, and produces appropriate physical responses. Before writing any code, make sure you can explain that loop for your own robot: what it senses, how it decides, and what it does.",
    note: "The expert agent answered the question."
  },
  {
    turn: 2, ts: "2025-04-07 20:14", agent: "expert", user: "Ada",
    student: "How should I turn our line-following problem into pseudocode before coding it?",
    reply: "The basic programming concepts relevant to robotics are variables, data types, operators, input and output commands, conditional statements, loops, functions, and sequencing. Practise translating robotics problems into step-by-step procedures, flowcharts, pseudocode, and then executable programs. The emphasis throughout is on algorithm design, logical reasoning, and predicting the robot's behaviour before you run the code — not just writing something and seeing what happens.",
    note: "The expert agent answered the question."
  },
  {
    turn: 3, ts: "2025-04-10 11:02", agent: "expert", user: "David",
    student: "How do I connect our IR sensor readings to the motors so the robot follows the line?",
    reply: "Sensor and actuator programming means programming common sensors — distance, light, touch, line, or motion sensors — and connecting those sensor readings to actuator responses such as motor movement, direction changes, stopping, signalling, or object manipulation. A good activity demonstrates how multiple hardware components interact within one complete robotic system, not just a single sensor–actuator pair in isolation.",
    note: "The expert agent answered the question."
  }
];

/* Keyword-matched replies for newly asked questions. */
const EXPERT_QA = [
  { keywords: ["sensor", "actuator", "controller", "fundamentals"], reply: "Robotics begins with the fundamentals of robotic systems — the relationship among controllers, sensors, actuators, power systems, software instructions, and environmental inputs. A robot receives information from its environment, processes that information through programmed logic, and produces appropriate physical responses. Before writing any code, make sure you can explain that loop for your own robot: what it senses, how it decides, and what it does." },
  { keywords: ["pseudocode", "flowchart", "algorithm design", "variable", "loop", "conditional", "sequencing", "data type"], reply: "The basic programming concepts relevant to robotics are variables, data types, operators, input and output commands, conditional statements, loops, functions, and sequencing. Practise translating robotics problems into step-by-step procedures, flowcharts, pseudocode, and then executable programs. The emphasis throughout is on algorithm design, logical reasoning, and predicting the robot's behaviour before you run the code — not just writing something and seeing what happens." },
  { keywords: ["distance sensor", "line sensor", "motion sensor", "touch sensor", "motor", "sensor reading", "sensor and actuator"], reply: "Sensor and actuator programming means programming common sensors — distance, light, touch, line, or motion sensors — and connecting those sensor readings to actuator responses such as motor movement, direction changes, stopping, signalling, or object manipulation. A good activity demonstrates how multiple hardware components interact within one complete robotic system, not just a single sensor–actuator pair in isolation." },
  { keywords: ["debug", "syntax error", "logical error", "runtime error", "hardware error", "test", "communication error"], reply: "Debugging and testing is a major part of robotics work. You'll need to identify syntax, logical, runtime, sensor, actuator, communication, and hardware-integration errors. The systematic process is: formulate a debugging hypothesis, trace program execution, compare expected and observed behaviour, isolate the possible cause of failure, modify the code, and retest the solution — repeating until the behaviour matches what you expected." },
  { keywords: ["event-driven", "state-based", "feedback", "modular", "coordinated", "simultaneous"], reply: "More advanced robotics instruction introduces event-driven programming, simultaneous or coordinated actions, feedback mechanisms, state-based behaviour, modular programming, and the integration of multiple sensors and actuators. It's also worth examining how environmental changes influence robotic performance, and how a programmed response can be adapted accordingly rather than staying fixed." },
  { keywords: ["optimi", "efficient", "robust", "compare algorithm", "independent", "reliability"], reply: "The final stage is optimisation and independent robotics problem solving: comparing alternative algorithms, and evaluating correctness, efficiency, reliability, and robustness before refining your program. This is practised through increasingly open-ended robotics tasks that require you to formulate the problem, design an algorithm, implement the program, integrate hardware and software, diagnose failures, and justify your solution." },
  { keywords: ["learning outcome", "by the end", "what will i be able to", "what should i be able to"], reply: "By the end of the robotics programming instruction, you should be able to design and implement functional robotic programs, interpret sensor information, control actuators, debug software and system-level problems, evaluate alternative solutions, and adapt previously learned programming strategies to unfamiliar robotics challenges." }
];
const EXPERT_DEFAULT_REPLY = "That is a good question to bring to your group as well. Start from what the robot needs to sense, how it should decide, and what it should do — that usually points to the right sensor, actuator, or logic to focus on next.";
const EXPERT_QUICK = [
  "How do sensors, actuators, and the controller work together?",
  "How do I turn a robotics problem into pseudocode?",
  "How do I connect a sensor reading to a motor response?",
  "What types of errors can occur in a robot program?",
  "How do I compare two algorithms for the same task?",
  "By the end of this, what should I be able to do?"
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
  topics: "Sensors and actuators, translating problems into pseudocode, state-based behaviour (FOLLOW_LINE, AVOID_OBSTACLE, LOST_LINE), debugging sensor noise, comparing algorithms for reliability",
  conversations: { Stephen: 24, Ada: 31, Chinedu: 9, David: 36 },
  keywords: [["Sensors", 18], ["State machine", 14], ["Debugging", 12], ["Actuators", 9], ["Calibration", 6]]
};

function summaryText() {
  const total = Object.values(GROUP_STATS.conversations).reduce((a, b) => a + b, 0);
  const per = Object.entries(GROUP_STATS.conversations).map(([n, c]) => `${n}: ${c}`).join("\n");
  const kw = GROUP_STATS.keywords.map(([k, c]) => `"${k}": ${c}`).join("\n");
  return `The current group has engaged in collaborative problem-solving centred on the following topics: "${GROUP_STATS.topics}."\n\nNumber of conversations: ${total}\nNumber of conversations with each student:\n${per}\n\nKeywords and their frequencies:\n${kw}\n\nObservation: actuator responses have been discussed less than sensor readings. Chinedu has contributed the least so far.`;
}
function feedbackText() {
  return "Stephen: You asked well-targeted questions about the LOST_LINE case and moved the group forward. Keep sharing your reasoning openly.\n\nAda: You were very active and put forward many insights, especially on the state machine. Your enthusiasm is a driving force for the group. Keep it up!\n\nChinedu: Although you have not spoken much recently, your earlier point about debounce timing was valuable. We hope you will share more of your ideas.\n\nDavid: You spoke the most and gave in-depth analyses of sensor calibration and motor control. Please also leave room for quieter teammates.";
}
const ASSISTANT_NUDGES = [
  "Three group members have not contributed to the discussion recently. Consider inviting them to share their view.",
  "Your group has discussed sensor readings but has not yet addressed how actuators should respond to them.",
  "Consider reviewing the requirements once more before proceeding to implementation.",
  "There are 2 unanswered questions in the discussion. Would someone like to respond?"
];
const ASSISTANT_QUICK = ["Summary", "Feedback", "Any suggestions for my group?"];

/* ---- Test Questions ---- */
const TEST = {
  questions: [
    { q: "Which statement best describes the relationship between a robot's controller and its sensors?", opts: ["The controller ignores sensor input once the program starts", "The controller processes sensor input to decide what action to take", "Sensors control the actuators directly, with no controller involved", "Sensors only work after the actuators have moved"], answer: 1, chosen: 1 },
    { q: "Which technique helps you predict a robot's behaviour before running the code?", opts: ["Debugging after the robot fails", "Writing pseudocode or a flowchart first", "Skipping algorithm design to save time", "Guessing the outcome and testing later"], answer: 1, chosen: 0 },
    { q: "Which of the following best describes actuator programming?", opts: ["Reading a value from the environment", "Storing a value in a variable", "Turning a decision into movement, a signal, or an action", "Comparing two sensor readings"], answer: 2, chosen: 2 },
    { q: "Which category of error occurs when hardware components fail to work together correctly?", opts: ["Syntax error", "Logical error", "Hardware-integration error", "Runtime error"], answer: 2, chosen: 3 },
    { q: "What does optimisation in robotics programming mainly involve?", opts: ["Comparing alternative algorithms for efficiency, reliability, and robustness", "Adding as many sensors as possible", "Removing all conditional statements", "Writing the program without testing it"], answer: 0, chosen: 0 }
  ],
  suggestions: "Based on your test results, you still need to further improve your understanding of algorithm design (translating problems into pseudocode) and diagnosing hardware-integration errors. Please continue to actively participate in collaborative problem-solving, delve more deeply into the relevant knowledge, and strengthen your understanding.",
  resources: "Weakness identification: Algorithm design and pseudocode; hardware-integration debugging\nInterdisciplinary connection: Electronics and control systems (how sensor and actuator behaviour maps to program logic)\nLearning progress diagnosis: Progress is largely aligned with the instructional goal\nStage-specific suggestions: Review translating problems into flowcharts/pseudocode and the systematic debugging process before the Review stage"
};

/* ---- Group Evaluation ---- */
const CRITERIA = [
  { name: "Correctness", w: 30 }, { name: "Reasonability", w: 20 }, { name: "Completeness", w: 20 },
  { name: "Originality", w: 20 }, { name: "Layout", w: 10 }
];
const GROUP_EVAL = [
  { group: "Group Alpha", me: true,  scores: [85, 80, 78, 82, 88], note: "Correct state transitions and a well-justified sensor debounce. Consider handling the case where both IR sensors lose the line at the same time as an obstacle appears." },
  { group: "Group Beta",  me: false, scores: [66, 62, 60, 65, 70], note: "Sensor readings are handled adequately, but actuator responses are rarely justified and several state transitions are only implied." },
  { group: "Group Gamma", me: false, scores: [93, 90, 90, 89, 92], note: "Comprehensive and well organized, with an explicit state diagram and clear rationale for each transition." },
  { group: "Group Delta", me: false, scores: [48, 45, 44, 50, 55], note: "Key state transitions are missing and sensor thresholds are undefined; revisit the requirements before continuing." }
];
