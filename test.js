import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { h } from './index.js'

test('two args - content second arg', () => {
  const h1 = h('h1', 'Hello world')
  const h1Result = '<h1>Hello world</h1>'
  assert.is(h1, h1Result)
  assert.is(h('div', h1), `<div>${h1Result}</div>`)
})

test('two args - attrs second arg', () => {
  assert.is(h('div', { class: 'foo' }), '<div class="foo"></div>')
})

test('three args, no attrs', () => {
  assert.is(h('h1', null, 'Hello world'), '<h1>Hello world</h1>')
})

test('three args, attrs', () => {
  assert.is(h('h1', { class: 'foo' }, 'Hello world'), '<h1 class="foo">Hello world</h1>')
  assert.is(h('h1', { class: 'foo bar', id: 'baz' }, 'Hello world'), '<h1 class="foo bar" id="baz">Hello world</h1>')
  assert.is(h('h1', { ['data-foo']: 'llama', id: 'baz' }, 'Hello world'), '<h1 data-foo="llama" id="baz">Hello world</h1>')
})

test('children as array', () => {
  // 2nd arg
  assert.is(h('div', [h('h1', 'Hi'), h('h2', 'Mom')]), '<div><h1>Hi</h1><h2>Mom</h2></div>')
  // 3rd arg
  assert.is(h('div', { class: 'foo' }, [h('h1', 'Hi'), h('h2', 'Mom')]), '<div class="foo"><h1>Hi</h1><h2>Mom</h2></div>')
  // nested arrays
  assert.is(h('div', [
    h('h1', 'Hi'),
    [
      h('h2', 'Mom'),
      h('h3', '!')
    ],
    [[[h('p', 'whoa, super deep')]]]
  ]), '<div><h1>Hi</h1><h2>Mom</h2><h3>!</h3><p>whoa, super deep</p></div>')
  // booleans are filtered
  assert.is(h('div', [
    true && h('h1', 'Hi'),
    false && h('h2', 'Wombat'),
    null && h('h3', 'Llama'),
    h('h2', 'Mom')
  ]), '<div><h1>Hi</h1><h2>Mom</h2></div>')
})

test('children can be escaped - only available in the 3-arg form', () => {
  assert.is(h('h1', null, '<3', { escape: true }), '<h1>&lt;3</h1>')
})

test.run()
