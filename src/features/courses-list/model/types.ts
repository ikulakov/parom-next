type CourseListElement = {
  id: string
  name: string
  description: string
}

type CreateCourseListElement = Omit<CourseListElement, 'id'>
type DeleteCourseListElement = Pick<CourseListElement, 'id'>
