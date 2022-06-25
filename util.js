import { htmlEscape } from 'escape-goat'
import stringifyAttrs from 'stringify-attributes'

export const voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr']

const isObject = v => v !== null && typeof v === 'object'

export const handleArgs = ([tag, attrsOrChildren, maybeChildren, opts]) => {
  const isVoid = voidTags.includes(tag)
  let attrs, children
  if (isVoid) attrs = attrsOrChildren
  else if (!maybeChildren) {
    if (isObject(attrsOrChildren) && !Array.isArray(attrsOrChildren)) attrs = attrsOrChildren
    else children = attrsOrChildren
  } else {
    attrs = attrsOrChildren
    children = maybeChildren
  }
  attrs ||= ''
  children ||= ''
  if (Array.isArray(children)) children = children.flat(Infinity).join('')
  if (opts?.escape) children = htmlEscape(children)
  if (attrs) {
    if (!isObject(attrs)) throw 'h() received non-object attributes - attrs must be an object'
    attrs = stringifyAttrs(attrs)
  }
  return { attrs, children, isVoid }
}
