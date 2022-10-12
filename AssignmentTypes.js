/**
 * The external type of an assignment is a field we use to identify
 * the what type of assignment assigned in the LMS.
 * @author Juan Manuel Garcia Junco Moreno
 * @copyright CourseKey Inc. All rights reserved
 */

/**
 * Different types of assignments for Canvas.
 * @readonly
 * @enum {string}
 */
const AssignmentTypes = {
  QUIZ: "Quiz",
  UNKNOWN: "Unknown",
  ON_PAPER: "OnPaper",
  ONLINE: "Online",
  EXTERNAL_TOOL: "ExternalTool",
  DISCUSSION_TOPIC: "DiscussionTopic",
  FILE_SUBMISSION: "FileSubmission",
  BOTH: "Online|FileSubmission",
};

export default AssignmentTypes;
