import { dbClient } from '@/shared/lib/db'
import { cache } from 'react'

class CoursesRepository {
  getCoursesList = cache(
    (): Promise<CourseListElement[]> => dbClient.course.findMany(),
  )
  createCourseElement = (
    data: CreateCourseListElement,
  ): Promise<CourseListElement> => dbClient.course.create({ data })

  deleteCourseElement = (data: DeleteCourseListElement) =>
    dbClient.course.delete({ where: { id: data.id } })
}

export const coursesRepository = new CoursesRepository()
