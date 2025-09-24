import { createShadowRootUi, defineContentScript } from '#imports'
import { waitForElement } from '@/utils/common'
import { mountElSelector } from '@/utils/const'
import '~/assets/tailwind.css'

export default defineContentScript({
  matches: ['https://www.youtube.com/watch?v=*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    try {
      const [,] = await Promise.all([waitForElement(mountElSelector)])
    }
    catch (e) {
      console.error((e as Error).message)
      return
    }

    const ui = await createShadowRootUi(ctx, {
      name: 'subecho-ui',
      position: 'inline',
      anchor: mountElSelector,
      append: 'first',
      async onMount(uiContainer) {
        const appEl = document.createElement('div')
        uiContainer.append(appEl)

        const createRoot = (await import('react-dom/client')).createRoot
        const root = createRoot(appEl)
        const App = (await import('./app')).App
        root.render(<App ctx={ctx} />)

        return { root, appEl }
      },
      async onRemove(mounted) {
        const els = await mounted
        els?.root.unmount()
        els?.appEl.remove()
      },
    })
    ui.mount()
  },
})
