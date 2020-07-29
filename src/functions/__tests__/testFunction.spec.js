import { testFunction } from '../testFunctions'

describe('test function', () => {
  it('sum', () => {
    expect(testFunction(3, 4)).toEqual(7)
  })
})
