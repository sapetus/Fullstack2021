export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartDescription {
  description: string;
}

export interface CourseNormalPart extends CoursePartBase, CoursePartDescription {
  type: 'normal';
}

export interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

export interface CourseSpecialPart extends CoursePartBase, CoursePartDescription {
  type: 'special'
  requirements: Array<string>;
}

export interface CourseSubmissionPart extends CoursePartBase, CoursePartDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;