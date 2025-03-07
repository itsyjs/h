import { handleArgs } from './util.js'

/** @type {import('./types/index.d.ts').h} */
export function h(tag) {
  const { attrs, children, isVoid } = handleArgs(arguments)
  let html = `<${tag}${attrs}${isVoid ? '/' : ''}>`
  if (!isVoid) html += `${children}</${tag}>`
  return html
}
