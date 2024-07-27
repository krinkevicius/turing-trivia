import axios from 'axios'
import { API_URL } from '@server/consts'
import type { APIParams, APIQuestion, Question } from '@server/types'
import formatQuestions from '@server/services/formatQuestions'

export default async function getQuestions(requestParams: APIParams): Promise<Question[]> {
  // rkq: add error handling
  const { data }: { data: APIQuestion[] } = await axios.get(API_URL, {
    params: requestParams,
  })

  return formatQuestions(data)
}
