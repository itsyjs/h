import { handleArgs } from './util.js'

export function h(tag, attrsOrChildren, maybeChildren, opts) {
  const { attrs, children, isVoid } = handleArgs(arguments)
  let html = `<${tag}${attrs}${isVoid ? '/' : ''}>`
  if (!isVoid) html += `${children}</${tag}>`
  return html
}
