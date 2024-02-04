'use server'

import { revalidatePath } from 'next/cache'
import { coursesRepository } from './courses.repository'

export const createCourseAction = async (
  course: CreateCourseListElement,
  revalidatePagePath: string,
) => {
  await coursesRepository.createCourseElement(course)
  revalidatePath(revalidatePagePath)
}
