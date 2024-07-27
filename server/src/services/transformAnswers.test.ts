import transformAnswers from '@server/services/transformAnswers'

describe('transformAnswers', () => {
  it('should transform answers correctly', () => {
    const input = {
      correctAnswer: 'correct answer',
      incorrectAnswers: ['incorrect answer 1', 'incorrect answer 2', 'incorrect answer 3'],
    }

    const answers = transformAnswers(input)

    expect(answers).toHaveLength(4)

    expect(answers[0]).toEqual({
      id: expect.any(String),
      answerText: 'incorrect answer 1',
      isCorrect: false,
    })
    expect(answers[1]).toEqual({
      id: expect.any(String),
      answerText: 'incorrect answer 2',
      isCorrect: false,
    })
    expect(answers[2]).toEqual({
      id: expect.any(String),
      answerText: 'incorrect answer 3',
      isCorrect: false,
    })
    expect(answers[3]).toEqual({
      id: expect.any(String),
      answerText: 'correct answer',
      isCorrect: true,
    })
  })
})
