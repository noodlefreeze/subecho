import type { AudioTrack } from '@/types/audio-track'

const sendEventType = 'sendAudioTrack'
const onEventType = 'onAudioTrack'

function exposeAudioTrackProvider(callback: () => AudioTrack) {
  window.addEventListener(onEventType, () => {
    const event = new CustomEvent(sendEventType, { detail: { audioTrack: callback() } })
    window.dispatchEvent(event)
  })
}

/**
 * Requests the current AudioTrack object from the main page
 * 1. Register a one-time event listener on the window to wait for the main page
 *    to respond with the audioTrack via the `sendEventType` event
 * 2. Set a timeout(10s)
 * 3. Dispatch the `onEventType` custom event to notify the main page that the AudioTrack is requested
 */
function requestAudioTrack() {
  return new Promise<AudioTrack>((resolve, reject) => {
    function handler(evt: CustomEventInit<{ audioTrack: AudioTrack }>) {
      if (evt.detail) {
        resolve(evt.detail.audioTrack)
      }
      else {
        reject(new Error('No audio track detail found in event'))
      }
    }
    window.addEventListener(sendEventType, handler, { once: true })

    setTimeout(() => {
      window.removeEventListener(sendEventType, handler)
      reject(new Error('Timeout waiting for audio track'))
    }, 10 * 1000)

    const event = new CustomEvent(onEventType)
    window.dispatchEvent(event)
  })
}

export const audioTrackEvents = {
  exposeAudioTrackProvider,
  requestAudioTrack,
}
