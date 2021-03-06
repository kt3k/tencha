'use strict'

const assert = require('power-assert')

const kocha = require('../')
const describe = kocha.describe
const it = kocha.it
const timeout = kocha.timeout

const add = (a, b) => a + b
const mul = (a, b) => a * b

timeout(100)

describe('add', () => {
  it('12 + 13 = 25 (async, not resolved)', done => {
    const sum = add(12, 13)
    assert(sum === 25)
  })
})
describe('mul', () => {
  it('12 * 13 = 156 (promise, pending)', () => {
    const product = mul(12, 13)
    assert(product === 156)
    return new Promise(() => {})
  })
})
