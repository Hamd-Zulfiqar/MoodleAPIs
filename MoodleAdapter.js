// import MoodleClient from './APIs/MoodleClient';
import LMSAdapter from "../LMSAdapter";
import AssignmentTypes from "../AssignmentTypes";

/**
 * An activity made by a user.
 * @typedef {import('../LMSAdapter').Activity} Activity
 */
/**
 * An LMS assignment.
 * @typedef {import('../LMSAdapter').Assignment} Assignment
 */
/**
 * A submission for an LMS assignment.
 * @typedef {import('../LMSAdapter').Submission} Submission
 */
/**
 * An LMS user.
 * @typedef {import('../../ck/CourseService').User} User
 */
/**
 * An LMS course. Should be on CourseKey also.
 * @typedef {import('../../ck/CourseService').Course<any>} Course
 */

/**
 * LMSAdapter subclass used to fetch data in a readable format from the Moodle LMS.
 */
export default class MoodleAdapter extends LMSAdapter {
  /**
   * Create a MoodleService instance.
   * @param {object} options MoodleAdapter options.
   * @param {string} options.domain The Moodle domain to make requests to.
   * @param {string} options.apiToken Moodle' API key for authorization.
   * @param {import('@ck/cloud-logger/src').Logger} [options.logger] Logging function.
   */
  constructor(options) {
    super();
    // this.moodle = new MoodleClient(options.apiToken, options.domain);
    this.logger = options.logger;
  }

  /**
   * Get all conversion assignments from a set of courses.
   * @param {Course} course Array of courses.
   * @return {Promise<Assignment[]>} List of assignments.
   */
  async getAssignments(course) {
    // 'course' should be available on both Moodle and Coursekey side
    // get the 'course' from Moodle using this.moodle data member
    const moodleCourse = await this.moodle.getCourses([course.externalID]);

    if (!moodleCourse) {
      console.log("Course not available on Moodle: ", course);
      return null;
    }
    const assignments = [];

    // using the course id, get all regular assignments for the course from Moodle
    const courseAssignments = await this.moodle.getCourseAssignments(
      moodleCourse.id
    );
    if (courseAssignments.courses[0].assignments.length == 0) {
      console.log("No Assignments for this Course on Moodle!");
    } else {
      for await (const assignment of courseAssignments.courses[0].assignments) {
        // get Course Module for this assignment
        const moduleInstance = await this.moodle.getCourseModule(
          "assign",
          assignment.id
        );

        // check the external type (Online || FileSubmission || Both)
        const externalType = this._getAssignmentType(assignment);

        // Push it into the list
        assignments.push({
          isAsync, // need confirmation
          title: assignment.name,
          externalID: String(assignment.id),
          externalType,
          externalCreatedAt: moduleInstance.added, // conversion will be needed
          // awardedTime: missing value
          isPublished: moduleInstance.visible == 1 ? true : false,
          dueAt: assignment.duedate, // conversion will be needed
          courseID: course.courseID,
        });
      }
    }
  }

  /**
   * Get the AssignmentType of an assignment.
   * @param {Object} assignment The Moodle assignment object.
   * @return {AssignmentTypes} The corresponding assignment type.
   * @private
   */
  _getAssignmentType(assignment) {
    if (assignment.configs.length == 0) {
      this.logger.warn("No submission types found", { assignment });
      return AssignmentTypes.UNKNOWN;
    }

    const online = {
      plugin: "onlinetext",
      subtype: "assignsubmission",
      name: "enabled",
      value: "1",
    };
    const file = {
      plugin: "file",
      subtype: "assignsubmission",
      name: "enabled",
      value: "1",
    };

    if (
      assignment.configs.includes(online) &&
      assignment.configs.includes(file)
    ) {
      return AssignmentTypes.BOTH;
    } else if (assignment.configs.includes(online)) {
      return AssignmentTypes.ONLINE;
    } else {
      return AssignmentTypes.FILE_SUBMISSION;
    }
  }
}
