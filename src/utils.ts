export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export function recursiveRetrieve(
  chain: string[],
  messages: Record<string, any>,
  params?: Record<string, any>,
): string {
  const key = chain[0]

  if (key.includes('[')) {
    // Get array item
    const [objKey, rest] = key.split('[')
    const num = parseInt(rest.replace(']', ''))

    if (num < 0)
      throw new Error(`Invalid array index "${num}" for message "${chain.join('.')}"`)

    const message = messages[objKey][num]

    if (
      !messages[objKey]
        && messages[objKey].length > 0
        && message
        && message !== ''
    )
      throw new Error(`Message "${chain.join('.')}" not found`)

    if (chain.length === 1)
      return typeof message === 'string' ? message : ''

    return recursiveRetrieve(chain.slice(1), message, params)
  }

  const message = messages[key]

  if (!message && message !== '')
    throw new Error(`Message "${chain.join('.')}" not found`)

  if (chain.length === 1) {
    let str: string = typeof message === 'string' ? message : ''

    if (params)
      str = parseAndReplaceString(str, params)

    return str
  }

  return recursiveRetrieve(chain.slice(1), message, params)
}

function parseAndReplaceString(
  str: string,
  params: Record<string, any>,
): string {
  const TEMPLATE_RE = /{(\w*)}/g
  let arr: RegExpExecArray | null
  let _str = str

  // eslint-disable-next-line no-cond-assign
  while ((arr = TEMPLATE_RE.exec(str)) !== null) {
    if (!Object.prototype.hasOwnProperty.call(params, arr[1]))
      throw new Error(`Param "${arr[1]}" not found`)

    _str = _str.replace(arr[0], params[arr[1]])
  }

  return _str
}
