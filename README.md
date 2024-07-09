# date-curry

[![CI](https://github.com/mbarlocker/date-curry/actions/workflows/ci.yml/badge.svg)](https://github.com/mbarlocker/date-curry/actions/workflows/ci.yml)
[![NPM version](http://img.shields.io/npm/v/@mbarlocker/date-curry.svg)](https://www.npmjs.com/package/@mbarlocker/date-curry)
[![License](http://img.shields.io/badge/license-mit-blue.svg?style=flat-square)](https://raw.githubusercontent.com/mbarlocker/date-curry/main/LICENSE)

Simplified date parsing and formatting from strings. This project wraps the `parse` and `format` functions of [date-fns](https://github.com/date-fns/date-fns).

## Installation

```sh
yarn add @mbarlocker/date-curry
```

## Examples

```js
import { curryDateFormat } from '@mbarlocker/date-curry'

const formats = curryDateFormat('P p')

const now = new Date().toISOString() // it'd be easier to use a date here, but imagine you got this date string from an API
console.log('Current time in current locale is', formats.format(now))
console.log('Current time in date format is', formats.parse(now))
```

## License
Copyright © 2023-present Matthew Barlocker.

@mbarlocker/date-curry is licensed under the MIT License. See [LICENSE](LICENSE) for the full license text.
