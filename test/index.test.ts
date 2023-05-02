import { describe, expect, it } from 'vitest'
import { getLocalizedMessage } from '../src/utils'

describe('Recursive retrieve messages', () => {
  const messages = {
    en: {
      intro: 'Hello World',
      named: '{msg} World',
      list: '{0} World',
      arrayWithValues: [
        'Array Item 1',
        'Array Item 2',
      ],
    },
  }

  it('should support general formatting', () => {
    const result = getLocalizedMessage(['en', 'intro'], messages)
    expect(result).toBe('Hello World')
  })

  it('should support named formatting', () => {
    const result = getLocalizedMessage(['en', 'named'], messages, { msg: 'My' })
    expect(result).toBe('My World')
  })

  it('should support list formatting with an array', () => {
    const result = getLocalizedMessage(['en', 'list'], messages, ['My'])
    expect(result).toBe('My World')
  })

  it('should support list formatting with array-like objects', () => {
    const result = getLocalizedMessage(['en', 'list'], messages, { 0: 'My' })
    expect(result).toBe('My World')
  })

  it('should support retrieving array items', () => {
    const result = getLocalizedMessage(['en', 'arrayWithValues[0]'], messages)
    expect(result).toBe('Array Item 1')
  })

  it('should support retrieving nested array items', () => {
    const nestedMessages = {
      en: {
        nestedArray: [
          { key: 'Nested Item 1' },
          { key: 'Nested Item 2' },
        ],
      },
    }
    const result = getLocalizedMessage(['en', 'nestedArray[1]', 'key'], nestedMessages)
    expect(result).toBe('Nested Item 2')
  })

  it('should throw an error when message is not found', () => {
    expect(() => getLocalizedMessage(['en', 'nonexistent'], messages)).toThrowError(
      'Message "nonexistent" not found',
    )
  })

  it('should throw an error when parameter is not found', () => {
    expect(() => getLocalizedMessage(['en', 'named'], messages, { notFound: 'value' })).toThrowError(
      'Parameter "msg" not found',
    )
  })

  it('should support deeply nested keys', () => {
    const nestedMessages = {
      en: {
        level1: {
          level2: {
            level3: 'Deeply Nested',
          },
        },
      },
    }
    const result = getLocalizedMessage(['en', 'level1', 'level2', 'level3'], nestedMessages)
    expect(result).toBe('Deeply Nested')
  })

  it('should support a mix of named and list formatting', () => {
    const mixedMessages = {
      en: {
        mixed: '{0} {1}, {name}',
      },
    }
    const result = getLocalizedMessage(['en', 'mixed'], mixedMessages, { 0: 'Hi', 1: 'there', name: 'John' })
    expect(result).toBe('Hi there, John')
  })

  it('should throw an error for an invalid array index', () => {
    expect(() => getLocalizedMessage(['en', 'arrayWithValues[-1]'], messages)).toThrowError(
      'Invalid array index "-1" for message "arrayWithValues[-1]"',
    )
  })

  it('should throw an error for a missing array key', () => {
    expect(() => getLocalizedMessage(['en', 'missingArray[0]'], messages)).toThrowError(
      'Message "missingArray[0]" not found',
    )
  })
})
