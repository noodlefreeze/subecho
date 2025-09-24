import type { ContentScriptContext, WxtWindowEventMap } from '#imports'
import { useEffect, useState } from 'react'

interface AppProps {
  ctx: ContentScriptContext
}
export function App(props: AppProps) {
  const { ctx } = props
  const [videoId, setVideoId] = useState(new URLSearchParams(location.search).get('v')!)

  useEffect(() => {
    function onLocationChange(_event: unknown) {
      const event = _event as WxtWindowEventMap['wxt:locationchange']
      setVideoId(new URLSearchParams(event.newUrl.search).get('v')!)
    }
    ctx.addEventListener(window, 'wxt:locationchange', onLocationChange)
    return () => {
      window.removeEventListener('wxt:locationchange', onLocationChange)
    }
  }, [])

  return (
    <section>
      <p className="text-emerald-500">{videoId}</p>
    </section>
  )
}
