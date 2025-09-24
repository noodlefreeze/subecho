type Part = string | boolean | null | undefined
export function bcls(parts: Part[]): string {
  return parts.filter(Boolean).join(' ')
}

export function waitForElement(selector: string, observerOptions = { childList: true }, timeout = 10 * 1000): Promise<Element> {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector)
      if (el) {
        observer.disconnect()
        resolve(el)
      }
    })
    observer.observe(document.body, observerOptions)

    setTimeout(() => {
      observer.disconnect()
      reject(new Error(`Element ${selector} was not found within 10 seconds`))
    }, timeout)
  })
}
