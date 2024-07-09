import * as dates from 'date-fns'

export function checkNaN(d: Date) {
  if (isNaN(d.getTime())) { return undefined }
  return d
}

const isoDateRegex = /^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?Z$/
const simpleDateRegex = /^\d+-\d+-\d+$/
const simpleDateTimeRegex = /^\d+-\d+-\d+ \d+:\d+(:\d+)?$/

export function curryDateFormat(dateFormat: string, genReferenceDate?: () => Date) {
  const format = (date: Date | number | string) => {
    if (typeof date === 'string') {
      if (date.match(simpleDateRegex)) {
        date = dates.parse(date, 'yyyy-MM-dd', dates.startOfDay(new Date()))
      }
      else if (date.match(simpleDateTimeRegex)) {
        date = dates.parse(date, 'yyyy-MM-dd HH:mm:ss', new Date())
      }
      else if (date.match(isoDateRegex)) {
        date = dates.parseISO(date)
      }
      else {
        throw new Error('Invalid Date Format')
      }
    }

    return dates.format(date, dateFormat)
  }

  const parse = (date: Date | string, referenceDate?: Date, options?: Parameters<typeof dates.parse>[3]) => {
    if (typeof date === 'string') {
      const reference = referenceDate ?? genReferenceDate?.() ?? new Date()
      return dates.parse(date, dateFormat, reference, options)
    }

    return date
  }

  const parseNaN = (date: Date | string, referenceDate?: Date, options?: Parameters<typeof dates.parse>[3]) => {
    return checkNaN(parse(date, referenceDate, options))
  }

  return {
    format,
    parse,
    parseNaN,
  }
}

export const {
  format: formatIsoDateOnly,
  parse: parseIsoDateOnly,
  parseNaN: parseNaNIsoDateOnly,
} = curryDateFormat('yyyy-MM-dd', () => dates.startOfDay(new Date()))

export const formatIsoDate = (d: Date | number) => dates.formatISO(d)
export const parseIsoDate = (d: string) => dates.parseISO(d)
export const parseNaNIsoDate = (d: string) => checkNaN(parseIsoDate(d))

export default {
  curry: curryDateFormat,
  date: {
    format: formatIsoDateOnly,
    parse: parseIsoDateOnly,
  },
  datetime: {
    format: formatIsoDate,
    parse: parseIsoDate,
  },
}
