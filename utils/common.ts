type Part = string | boolean | null | undefined
export function bcls(parts: Part[]): string {
  return parts.filter(Boolean).join(' ')
}

export function waitForElement<T extends Element>(selector: string, observerOptions = { childList: true }, timeout = 10 * 1000): Promise<T> {
  return new Promise((resolve, reject) => {
    let timeoutId: number | undefined
    const observer = new MutationObserver(() => {
      clearTimeout(timeoutId)

      const el = document.querySelector<T>(selector)
      if (el) {
        observer.disconnect()
        resolve(el)
      }
    })
    observer.observe(document.body, observerOptions)

    timeoutId = window.setTimeout(() => {
      observer.disconnect()
      reject(new Error(`Element ${selector} was not found within 10 seconds`))
    }, timeout)
  })
}
