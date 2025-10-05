import type { ContentScriptContext, WxtWindowEventMap } from '#imports'
import { useEffect, useState } from 'react'
import { audioTrackEvents } from '@/utils/custom-event/audio-track'

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

  useEffect(() => {
    async function foo() {
      const audioTrack = await audioTrackEvents.requestAudioTrack()
      console.log('Audio Track received in isolate world: ', audioTrack)
    }

    foo()
  }, [videoId])

  return (
    <section>
      <p className="text-emerald-500">{videoId}</p>
    </section>
  )
}
