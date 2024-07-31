import { assert, describe, expect, it } from 'vitest'
import { curryDateFormat } from './index.js'
import * as dates from 'date-fns'

describe('date-curry', () => {
  it('curries year', () => {
    const formats = curryDateFormat('yyyy')

    assert.isTrue(dates.isEqual(formats.parse('2021'), new Date(2021, 0, 1)))
    assert.isFalse(dates.isEqual(formats.parse('2020'), new Date(2021, 0, 1)))
    assert.equal(formats.format(new Date(2020, 4, 13, 5, 0, 0, 0)), '2020')
  })

  it('curries dates', () => {
    const formats = curryDateFormat('MM/dd/yyyy')

    assert.isTrue(dates.isEqual(formats.parse('09/11/2001'), new Date(2001, 8, 11)))
    assert.isTrue(dates.isEqual(formats.parseNaN('09/11/2001'), new Date(2001, 8, 11)))
    assert.equal(formats.format(1720553692000), '07/09/2024')
  })

  it('fails to parse', () => {
    const formats = curryDateFormat('MM/dd/yyyy')

    console.log(formats.parse('not a date').getTime())
    assert.isTrue(isNaN(formats.parse('not a date').getTime()))
    assert.isTrue(isNaN(formats.parse('9 Jul 2020').getTime()))
    assert.isTrue(formats.parseNaN('28374 Jul 2002002020') === undefined)

    expect(() => formats.format('not a date')).toThrowError('Invalid Date')
  })

  it('parses Dates', () => {
    const formats = curryDateFormat('yyyy-MM-dd HH')

    const date = new Date(2015, 4, 21)
    assert.isTrue(dates.isEqual(formats.parse(date), date))
  })

  it('formats strings', () => {
    const formats = curryDateFormat('yyyy-MM-dd HH:mm:ss')

    assert.equal(formats.format('2000-01-01'), '2000-01-01 00:00:00')
    assert.equal(formats.format('2000-01-01 13:01:02'), '2000-01-01 13:01:02')
    assert.equal(formats.format('2000-01-01T13:01:02Z'), '2000-01-01 13:01:02')
  })
})
