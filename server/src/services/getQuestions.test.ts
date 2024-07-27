import { API_URL } from '@server/consts'
import getQuestions from '@server/services'
import axios from 'axios'

describe('getQuestions', () => {
  it('should call API with given params', async () => {
    const requestParams = {
      categories: 'test-category-1,test-category-2',
      limit: 1,
    }

    const getSpy = vi.spyOn(axios, 'get')
    getSpy.mockResolvedValue({ data: [] })

    await getQuestions(requestParams)

    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledWith(API_URL, { params: requestParams })
  })
})
