const moodleClient = require("moodle-client");
const requestGenerator = require("./RequestGenerator");

/**
 * Create a Moodle client instance for REST APIs.
 */
class MoodleClient {
  /**
   * Create a Moodle client.
   * @param {string} token Token for the Moodle User which is granted the use of Rest Protocol
   * @param {string} baseURL Base URL for the Moodle web app of the school
   */
  constructor(token, baseURL) {
    // return (async () => {
    //   try {
    //     this.client = await this.initializeClient(token, baseURL);
    //     console.log("Moodle Client initialized: ", this.client);
    //     return this;
    //   } catch (error) {
    //     console.log("Failed to initialize Moodle Client instance: ", error);
    //   }
    // })();
    if (token && baseURL) {
      this.token = token;
      this.baseURL = baseURL;
      this.client = "Needs to be initialized!";
      console.log("Instance created but not yet initialized!");
    } else throw Error("Params missing!");
  }

  /**
   * Initializes moodle-client instance.
   * @param {string} token Token for the Moodle User which is granted the use of Rest Protocol.
   * @param {string} baseURL Base URL for the Moodle web app of the school
   * @return {moodleClient} A moodle-client object to fetch a particular resource.
   */
  async initializeClient() {
    try {
      const client = await moodleClient.init({
        wwwroot: this.baseURL, // The Base URL for that school's moodle
        token: this.token,
      });
      // return client;
      this.client = client;
      console.log("Moodle Client initialized: ", this.client);
    } catch (error) {
      console.log("Failed to initialize Moodle Client: ", error);
    }
  }

  /**
   * Retrieves a Course using Moodle Client
   * @param {number} id ID of the course to be retrieved
   * @return {object} An array of all Courses from Moodle.
   */
  async getCourse(id) {
    try {
      const data = {
        options: {
          ids: [id],
        },
      };
      const course = await requestGenerator(
        "core_course_get_courses",
        data,
        this.client
      );

      return course.length && course[0];
    } catch (error) {
      console.log("Cannot get Courses: ", error);
    }
  }

  /**
   * Retrieves the Courses using Moodle Client
   * @return {Array} An array of all Courses from Moodle.
   */
  async getCourses(ids) {
    try {
      var courses;
      courses = await requestGenerator(
        "core_course_get_courses",
        {
          options: {
            ids,
          },
        },
        this.client
      );
      return courses;
    } catch (error) {
      console.log("Cannot get Courses: ", error);
    }
  }

  /**
   * Retrieves the Course's Assignments using Moodle Client
   * @param {number} courseId The id of the course for which the assignments will be retrieved.
   * @return {object} An object with an array for all assignments of a Course.
   */
  async getCourseAssignments(courseId) {
    try {
      const data = {
        courseids: [courseId],
        includenotenrolledcourses: 1,
      };
      const assignments = await requestGenerator(
        "mod_assign_get_assignments",
        data,
        this.client
      );
      return assignments.courses.length && assignments.courses[0].assignments;
    } catch (error) {
      console.log("Cannot get Course Assignments: ", error);
    }
  }

  /**
   * Retrieves the Course's Module using Moodle Client
   * @param {string} module The name of module which will be retrieved i.e "assign" for assignment.
   * @param {number} id The id of module which will be retrieved.
   * @return {object} An object for the Course module item.
   */
  async getCourseModuleInstance(module, id) {
    try {
      const data = {
        module,
        instance: id,
      };
      const moduleInstance = await requestGenerator(
        "core_course_get_course_module_by_instance",
        data,
        this.client
      );
      return moduleInstance.cm;
    } catch (error) {
      console.log("Cannot get Course Module: ", error);
    }
  }

  async getCourseModule(id) {
    try {
      const data = {
        cmid: id,
      };
      const moduleInstance = await requestGenerator(
        "core_course_get_course_module",
        data,
        this.client
      );
      return moduleInstance.cm;
    } catch (error) {
      console.log("Cannot get Course Module: ", error);
    }
  }

  /**
   * Retrieves the Assignment's Submissions using Moodle Client
   * @param {number} assignmentId The id of the assignment for which the submissions will be retrieved.
   * @return {object} An object with the array for the Assignment submissions.
   */
  async getAssignmentSubmissions(assignmentId) {
    try {
      const data = {
        assignmentids: [assignmentId],
      };
      const submissions = await requestGenerator(
        "mod_assign_get_submissions",
        data,
        this.client
      );

      return submissions.assignments.length && submissions.assignments[0];
      // return (
      //   submissions.assignments[0] && submissions.assignments[0].submissions
      // );
    } catch (error) {
      console.log("Cannot get Assignment Submissions: ", error);
    }
  }

  /**
   * Retrieves the all Assignment's Submissions using Moodle Client
   * @param {number} assignmentId The id of the assignment for which the submissions will be retrieved.
   * @return {object} An object with the array for the Assignment submissions.
   */
  async getAssignmentSubmissionStatus(assignmentId, userId) {
    try {
      const data = {
        assignid: assignmentId,
        userid: userId,
      };
      const submissions = await requestGenerator(
        "mod_assign_get_submission_status",
        data,
        this.client
      );

      return submissions;
      // return (
      //   submissions.assignments[0] && submissions.assignments[0].submissions
      // );
    } catch (error) {
      console.log("Cannot get Assignment Submissions: ", error);
    }
  }

  /**
   * Retrieves the Assignment's Grades using Moodle Client.
   * @param {number} assignmentId The id of the assignment for which the grades will be retrieved.
   * @return {object} An object with the array for the Assignment grades.
   */
  async getAssignmentGrades(assignmentId) {
    try {
      const data = {
        assignmentids: [assignmentId],
      };
      const grades = await requestGenerator(
        "mod_assign_get_grades",
        data,
        this.client
      );

      return grades.assignments.length && grades.assignments[0];
    } catch (error) {
      console.log("Cannot get Assignment Grades: ", error);
    }
  }

  /**
   * Retrieves the Quizzes for a course using Moodle Client
   * @param {number} courseId The id of the course for which the quizzes will be retrieved.
   * @return {object} An object with the array for the course quizzes.
   */
  async getQuizzes(courseId) {
    try {
      const data = {
        courseids: [courseId],
      };
      const quizzes = await requestGenerator(
        "mod_quiz_get_quizzes_by_courses",
        data,
        this.client
      );

      return quizzes.quizzes;
    } catch (error) {
      console.log("Cannot get Course Quizzes: ", error);
    }
  }

  /**
   * Retrieves the Enrollments for a course using Moodle Client
   * @param {number} courseId The id of the course for which the enrollments will be retrieved.
   * @return {Array} An array for the course enrollments.
   */
  async getCourseEnrollments(courseId) {
    try {
      const data = {
        courseid: courseId,
      };
      const enrollments = await requestGenerator(
        "core_enrol_get_enrolled_users",
        data,
        this.client
      );

      return enrollments;
    } catch (error) {
      console.log("Cannot get Course Enrollments: ", error);
    }
  }

  /**
   * Retrieves the Attempts for a quiz using Moodle Client
   * @param {number} quizId The id of the quiz for which the attempts will be retrieved.
   * @param {number} userId The id of the user.
   * @return {object} An object with an array for the quiz attempts.
   */
  async getQuizAttempts(quizId, userId) {
    try {
      const data = {
        quizid: quizId,
        userid: userId,
      };
      const quizAttempts = await requestGenerator(
        "mod_quiz_get_user_attempts",
        data,
        this.client
      );

      return quizAttempts.attempts;
    } catch (error) {
      console.log("Cannot get Quiz Attempts: ", error);
    }
  }

  /**
   * Retrieves the Forums for a course using Moodle Client
   * @param {number} courseId The id of the course for which the forums will be retrieved.
   * @return {Array} An array for the forums.
   */
  async getCourseForums(courseId) {
    try {
      const data = {
        courseids: [courseId],
      };
      const forums = await requestGenerator(
        "mod_forum_get_forums_by_courses",
        data,
        this.client
      );

      return forums;
    } catch (error) {
      console.log("Cannot get Course Forums: ", error);
    }
  }

  /**
   * Retrieves the Discussions for a forum using Moodle Client
   * @param {number} forumId The id of the forums for which the discussions will be retrieved.
   * @return {object} An object with array for the discussions.
   */
  async getForumDiscussions(forumId) {
    try {
      const data = {
        forumid: forumId,
      };
      const forumDiscussions = await requestGenerator(
        "mod_forum_get_forum_discussions",
        data,
        this.client
      );

      return forumDiscussions.discussions;
    } catch (error) {
      console.log("Cannot get Forum Discussions: ", error);
    }
  }

  async getForumDiscussion(forumId) {
    try {
      const data = {
        forumid: forumId,
      };
      const forumDiscussions = await requestGenerator(
        "mod_forum_get_forum_discussions",
        data,
        this.client
      );

      return (
        forumDiscussions.discussions.length && forumDiscussions.discussions[0]
      );
    } catch (error) {
      console.log("Cannot get Forum Discussions: ", error);
    }
  }

  /**
   * Retrieves the Posts for a discussion using Moodle Client
   * @param {number} discussionId The id of the discussion for which the posts will be retrieved.
   * @return {object} An object with array for the posts.
   */
  async getDiscussionPosts(discussionId) {
    try {
      const data = {
        discussionid: discussionId,
      };
      const discussionPosts = await requestGenerator(
        "mod_forum_get_discussion_posts",
        data,
        this.client
      );

      return discussionPosts.posts;
    } catch (error) {
      console.log("Cannot get Forum Discussion Posts: ", error);
    }
  }

  async getUserbyId(userId) {
    try {
      const data = {
        field: "id",
        values: [userId],
      };
      const user = await requestGenerator(
        "core_user_get_users_by_field",
        data,
        this.client
      );

      return user.length && user[0];
    } catch (error) {
      console.log("Cannot get User: ", error);
    }
  }

  async getUserbyExternalID(userId) {
    try {
      const data = {
        field: "idnumber",
        values: [userId],
      };
      const user = await requestGenerator(
        "core_user_get_users_by_field",
        data,
        this.client
      );

      return user.length && user[0];
    } catch (error) {
      console.log("Cannot get User: ", error);
    }
  }

  /**
   * Retrieves the Grade Report of all the users for a single course
   * @param {number} courseId the course id of which the grade report will be fetched
   * @return {Array} the array containing grade report of all the users of this course
   */
  async getGradeReports(courseId) {
    try {
      const data = {
        courseid: courseId,
      };
      const gradeReports = await requestGenerator(
        "gradereport_user_get_grade_items",
        data,
        this.client
      );

      // return gradeReports.usergrades.length && gradeReports.usergrades;
      return gradeReports.usergrades ? gradeReports.usergrades : [];
    } catch (error) {}
  }

  async getGradeTable(courseId) {
    try {
      const data = {
        courseid: courseId,
      };
      const gradeReports = await requestGenerator(
        "gradereport_user_get_grades_table",
        data,
        this.client
      );

      // return gradeReports.usergrades.length && gradeReports.usergrades;
      return gradeReports.tables;
    } catch (error) {}
  }

  async getConversations(userId) {
    try {
      const data = {
        userid: userId,
      };
      const conversations = await requestGenerator(
        "core_message_get_conversations",
        data,
        this.client
      );

      // return gradeReports.usergrades.length && gradeReports.usergrades;
      return conversations.conversations;
    } catch (error) {}
  }

  async getChats(courseId) {
    try {
      const data = {
        courseids: [courseId],
      };
      const chats = await requestGenerator(
        "mod_chat_get_chats_by_courses",
        data,
        this.client
      );

      // return gradeReports.usergrades.length && gradeReports.usergrades;
      return chats.chats;
    } catch (error) {}
  }

  async getChatSessions(chatId) {
    try {
      const data = {
        chatid: chatId,
      };
      const chats = await requestGenerator(
        "mod_chat_get_sessions",
        data,
        this.client
      );

      // return gradeReports.usergrades.length && gradeReports.usergrades;
      return chats.sessions;
    } catch (error) {}
  }

  async getChatSessionMessages(chatId, start, end) {
    try {
      const data = {
        chatid: chatId,
        sessionstart: start,
        sessionend: end,
      };
      const chats = await requestGenerator(
        "mod_chat_get_session_messages",
        data,
        this.client
      );

      // return gradeReports.usergrades.length && gradeReports.usergrades;
      return chats;
    } catch (error) {}
  }

  async getCourseData(field, value) {
    try {
      const data = {
        field: field,
        value: value,
      };
      const course = await requestGenerator(
        "core_course_get_courses_by_field",
        data,
        this.client
      );

      //return course.courses.length && course.courses[0];
      return course;
    } catch (error) {
      console.log("Cannot get Courses: ", error);
    }
  }

  async getCourseContent(id) {
    try {
      const data = {
        courseid: id,
      };
      const course = await requestGenerator(
        "core_course_get_contents",
        data,
        this.client
      );

      return course;
    } catch (error) {
      console.log("Cannot get Courses: ", error);
    }
  }
}

exports.class = MoodleClient;
