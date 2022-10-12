const moodle_client = require("moodle-client");
const MoodleClient = require("./MoodleClient.js");
const moment = require("moment");
const casual = require("casual");
const dotenv = require("dotenv");
const mysql2 = require("mysql2/promise");
const SchoolConfig = require("@course-key/school-config");
// const getMiladyStudentsForCourse = require("./MiladyClient");
const requestPaginator = require("./MiladyClient");
const readCSV = require("./fileParser");

dotenv.config();

async function moodleDatabase() {
  const QUERY =
    "SELECT * FROM `mdl_logstore_standard_log` WHERE `courseid` = ? AND `userid` = ? AND timecreated > unix_timestamp(curdate()-7)";
  const connection = await mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "moodle",
    password: "HelloSQL",
  });

  console.log("DB Connection: ", connection);

  const [rows] = await connection.execute(QUERY, [8, 4]);

  // console.log("DB Cols: ", fields);
  console.log("DB Rows: ", rows);

  connection.destroy();
}

function* yieldTest(int) {
  yield "its one";
  yield "its not one";
  yield "its not two";
  return "its two";
}

function testmethod(array, id) {
  const user = array.filter((user) => user.id == id);
  return user ? user : null;
}

function isEqual(a, b) {
  for (const key of Object.keys(a)) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

function nameTestA(lol) {
  console.log("THIS is the method named nameTestA", lol);
}

function nameTestB(lol) {
  console.log("THIS is the method named nameTestB", lol);
}

const methods = {
  // getStudents: getMiladyStudentsForCourse,
  testA: nameTestA,
  testB: nameTestB,
};

function convertDate(value) {
  return moment(value * 1000).toDate();
  // const temp = moment(value * 1000).format("YYYY-MM-DD hh:mm:ss");
  // return temp;
}

function _getUser(users, id) {
  const user = users.find((user) => user.id == id);
  console.log("User found for this submission: ", user);
  return user ? user : null;
}

async function asyncWork(lol) {
  console.log("In ASYNC method: ", lol);
}

async function method() {
  try {
    // methods["testB"].call(this, "haha");
    // const test = await new MoodleClient.class(
    //   "9ff00aeb62a06955b3a6b736abe43587",
    //   "http://moodle.thecoursekey.com"
    // );
    // const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    // const ONLINE = {
    //   plugin: "onlinetext",
    //   subtype: "assignsubmission",
    //   name: "enabled",
    //   value: "1",
    // };
    // const FILE = {
    //   plugin: "file",
    //   subtype: "assignsubmission",
    //   name: "enabled",
    //   value: "1",
    // };
    // console.log("test return: ", testmethod(array, 6));
    // console.log("array after the test method", array);
    // console.log(array.length && array[0]);
    // const user = await test.getUserbyId(3);
    // console.log("User: ", user);
    // const course = await test.getCourse(2);
    // console.log("Course: ", course);
    // const courses = await test.getCourses();
    // console.log("Courses: ", courses);
    // const assignments = await test.getCourseAssignments(2);
    // for (const assignment of assignments) {
    //   assignment.duedate = convertDate(assignment.duedate);
    //   const type = assignment.configs.some(
    //     (config) => isEqual(config, ONLINE) || isEqual(config, FILE)
    //   );
    //   if (type) {
    //     console.log("KNOWN");
    //   } else {
    //     console.log("UNKNOWN");
    //   }
    // // }
    // console.log("Assignments: ", assignments);
    // console.log("getTime test: ", assignments[0].duedate.getTime());
    // const moduleInstance = await test.getCourseModuleInstance("quiz", 3);
    // console.log("Course Module", moduleInstance);
    // const module = await test.getCourseModule(16);
    // console.log("Module", module);
    // const submissions = await test.getAssignmentSubmissions(1);
    // console.log("Assignment Submissions: ", submissions);
    // console.log(!(submissions.submissions && submissions.submissions.length));
    // const grades = await test.getAssignmentGrades(1);
    // console.log("Assignment Grades: ", grades);
    // const quizzes = await test.getQuizzes(4);
    // console.log("Quizzes: ", quizzes);
    // const enrollments = await test.getCourseEnrollments(4);
    // console.log("Course Enrollments: ", enrollments);
    // console.log(_getUser(enrollments, 5));
    // const quizAttempts = await test.getQuizAttempts(3, 4);
    // console.log("Quiz Attempts: ", quizAttempts);
    // const gradeReports = await test.getGradeReports(4);
    // console.log("Grade Reports: ", gradeReports[0]);
    // let forums = await test.getCourseForums(4);
    // forums = forums.filter((forum) => forum.type == "single");
    // console.log("Course Forums: ", forums);
    // const data = forums.find((temp) => temp.id == 7);
    // console.log("answer:", data ? data.type : "UNKNOWN");
    // const forumDiscussion = await test.getForumDiscussion(8);
    // console.log("Course Forum Discussions: ", forumDiscussion);
    // const forumDiscussions = await test.getForumDiscussions(10);
    // console.log("Course Forum Discussions: ", forumDiscussions);
    // const DiscussionPosts = await test.getDiscussionPosts(10);
    // console.log("Course Forum Discussion Posts: ", DiscussionPosts);
    // yield test
    // const yielder = yieldTest(1);
    // console.log(yielder.next().value);
    // console.log(yielder.next());
    // console.log(yielder.next());
    // for (const data of yieldTest(1)) {
    //   console.log(data);
    // }
    // This will be the test for new type of client where constructor is not async
    const client = new MoodleClient.class(
      "9ff00aeb62a06955b3a6b736abe43587",
      "http://moodle.thecoursekey.com"
    );
    // const client = new MoodleClient.class(
    //   "b0530361d556631776fe5c904825daf4",
    //   "http://localhost/moodle"
    // );
    await client.initializeClient();
    // API test for new approach

    // let forums = await client.getCourseForums(14);
    // forums = forums.filter((forum) => forum.type == "single");
    // console.log("Course Forums: ", forums);

    const course = await client.getCourse(12);
    console.log("Course: ", course);

    // const Lessons = await client.getCourseContent(9);
    // console.log("CourseLessons: ", Lessons[2]);

    // const courseData = await client.getCourseData("idnumber", "SIS-ID");
    // console.log("CourseData: ", courseData);

    // const user = await client.getUserbyId(6);
    // console.log("User: ", user);
    // const user = await client.getUserbyExternalID(157682);
    // console.log("User: ", user);
    // const chats = await client.getChats(8);
    // console.log("Chats: ", chats);
    // const chatSessions = await client.getChatSessions(1);
    // console.log("Chat_Sessions: ", chatSessions);
    // console.log("Chat_Sessions1: ", chatSessions[0].sessionusers);
    // const chatMessages = await client.getChatSessionMessages(
    //   1,
    //   chatSessions[0].sessionstart,
    //   chatSessions[0].sessionend
    // );
    // console.log("Chat_Messages: ", chatMessages);
    // const convo = await client.getConversations(4);
    // console.log("Convos: ", convo[0]);
    // const gradeReports = await client.getGradeReports(12);
    // const gradeReports1 = await client.getGradeReports(4);
    // const gradeReports2 = await client.getGradeReports(3);
    // console.log("Grade Reports: ", gradeReports[0]);
    // console.log("Grades: ", gradeReports[0]);
    // console.log("Grades: ", gradeReports[1]);
    // for (const grade of gradeReports[0].gradeitems) {
    // if (grade.itemtype == "course" || !grade.graderaw) continue;
    // if (grade.itemmodule !== "quiz") console.log(grade);
    // else console.log(grade);
    // console.log(grade);
    // console.log(
    //   grade.gradedatesubmitted
    //     ? grade.gradedatesubmitted
    //     : grade.gradedategraded
    // );
    //}
    // for (const lol of gradeReports1[0].gradeitems) {
    //   console.log(lol);
    // }
    // for (const lol of gradeReports2[0].gradeitems) {
    //   console.log(lol);
    // }
    // const enrollments = await client.getCourseEnrollments(12);
    // console.log("Course Enrollments: ", enrollments);
    // const Cmodule = await client.getCourseModule(50);
    // console.log("Course module: ", Cmodule);
    // const quizzes = await client.getQuizzes(7);
    // console.log("Quizzes: ", quizzes);
    // const quizAttempts = await client.getQuizAttempts(5, 4);
    // console.log("Quiz Attempts: ", quizAttempts);
    // const quizAttempts1 = await client.getQuizAttempts(5, 5);
    // console.log("Quiz Attempts1: ", quizAttempts1);
    // const quizAttempts2 = await client.getQuizAttempts(3, 4);
    // console.log("Quiz Attempts2: ", quizAttempts2);
    const assignments = await client.getCourseAssignments(12);
    console.log("assignments: ", assignments);
    // const submissions = await client.getAssignmentSubmissions(16);
    // console.log("Assignment Submissions: ", submissions);

    const submissionStatus = await client.getAssignmentSubmissionStatus(17, 7);
    console.log("Submissions: ", submissionStatus);
    console.log("Previous Submissions: ", submissionStatus.previousattempts);
    // const user = await client.getUserbyId(5);
    // console.log("User: ", user ? user : null);
    // const lol = 0;
    // console.log(lol ? "yes" : "no");
    // console.log(casual.integer());
    // console.log(casual.integer());
    // let dummy = 0;
    // if (!dummy) {
    //   console.log("yes");
    // }
    //School Config Test
    // const authKey2 = "574e1fbc02a731f8b81bb8441d7952d3";
    // const authKey1 = "3db0efa542e6763a5f1882c9edcb2cc1";
    // await SchoolConfig.connectMongo();
    // const configValue = await SchoolConfig.SchoolConfig.findByAuthKey(authKey2);
    // console.log("CONFIG: ", configValue);
    // console.log("CONFIG: ", configValue.integrations.blackboard);
    // await SchoolConfig.disconnectMongo();
    // // Milady Paginator Test
    // const integrationInfo = {
    //   apiKey: "990f3d020fd0c4b79760a7b7f9a4e8ecf63b774dbd26d57198cb",
    //   apiURL: "https://www.miladycima.com",
    //   sysID: 1062,
    // };
    // const data = await getMiladyStudentsForCourse(
    //   {
    //     apiKey: integrationInfo.apiKey,
    //     baseURL: integrationInfo.apiURL,
    //   },
    //   {
    //     classID: "662616",
    //     page: "7",
    //     organizationID: "124581",
    //   }
    // );
    // console.log("Milady Students: ", data);
    // const data = await requestPaginator(
    //   "getStudentsForCourse",
    //   {
    //     apiKey: integrationInfo.apiKey,
    //     baseURL: integrationInfo.apiURL,
    //   },
    //   { classID: "662616", organizationID: "124581" },
    //   true
    // );
    // console.log("RESPONSE: ", data);
    //file parsing
    // const data = await readCSV();
    // console.log("data: ", data);
    // const lister = [1, 2, 3, 4, 5];
    // lister.map(async (param) => {
    //   await asyncWork(param);
    // });
    // console.log(lister);
  } catch (error) {
    console.log("Exception in Main Handler Method!", error);
  }
}

method();
// moodleDatabase();

// let Object = {
//   ProgramCode1: [{}, {}],
//   ProgramCode2: [],
// };

// for (const temp of courses){
//   if (Object.hasOwnProperty(ParseName(temp))){
//   Object.ParseName(temp).push(temp);
// } else {
//   Object.ParseName(temp) = [temp];
// }
// }

// for (const iteration of Object.keys){
//   chunks(iteration);
// }
