export function getLocalizedMessage(
  chain: string[],
  messages: Record<string, any>,
  params?: Record<string, any> | any[],
): string {
  const key = chain[0]

  if (key.includes('[')) {
    const [objKey, rest] = key.split('[')
    const num = parseInt(rest.replace(']', ''))

    if (num < 0)
      throw new Error(`Invalid array index "${num}" for message "${chain.join('.')}"`)

    if (!messages[objKey] || !Array.isArray(messages[objKey]) || messages[objKey].length === 0)
      throw new Error(`Message "${chain.join('.')}" not found`)

    const message = messages[objKey][num]

    if (chain.length === 1)
      return typeof message === 'string' ? message : ''

    return getLocalizedMessage(chain.slice(1), message, params)
  }

  const message = messages[key]

  if (!message && message !== '')
    throw new Error(`Message "${chain.join('.')}" not found`)

  if (chain.length === 1) {
    let str: string = typeof message === 'string' ? message : ''

    if (params) {
      str = str.replace(/{(\w*)}/g, (_, paramName) => {
        if (!(paramName in params))
          throw new Error(`Parameter "${paramName}" not found`)

        if (Array.isArray(params)) {
          if (isNaN(Number(paramName)))
            throw new Error(`Parameter "${paramName}" not found`)

          return params[paramName]
        }

        return params[paramName]
      })
    }

    return str
  }

  return getLocalizedMessage(chain.slice(1), message, params)
}
