'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createCourseAction } from '../actions'

const createCourseFormSchema = z.object({
  name: z.string(),
  description: z.string(),
})
type FormFields = z.infer<typeof createCourseFormSchema>

export function CreateCourseForm({
  className,
  revalidatePagePath,
}: {
  className?: string
  revalidatePagePath: string
}) {
  const [isCreateTransition, startCreateTransition] = useTransition()

  const form = useForm<FormFields>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })
  const onSubmit = (data: FormFields) => {
    startCreateTransition(async () => {
      createCourseAction(data, revalidatePagePath)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, 'space-y-4')}
      >
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название </FormLabel>
              <FormControl>
                <Input
                  placeholder="название..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="описание..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-8"
          type="submit"
          disabled={isCreateTransition}
        >
          Добавить
        </Button>
      </form>
    </Form>
  )
}