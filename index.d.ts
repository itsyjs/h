interface Opts {
  /**
   * HTML-escapes child string content
   */
  escape?: boolean
}

/**
 * Renders an HTML string
 */
export function h(tag: string, attrsOrChildren: object | string | string[], maybeChildren?: string | string[], opts?: object): string
