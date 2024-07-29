import transformCategory from '@server/services/transformCategory'

describe('transformCategory', () => {
  it('should return value from CATEGORIES if passed string matches', () => {
    expect(transformCategory('arts_and_literature')).toBe('Arts & Literature')
  })

  it('should return value from Categories if passed string matches partialy', () => {
    expect(transformCategory('film_and_tv')).toBe('Entertainment')
  })

  it('should return Random if passed string does not match any key', () => {
    expect(transformCategory('not_in_categories')).toBe('Random')
  })
})
