import type { AudioTrack, Track } from '@/types/audio-track'
import { defineUnlistedScript } from '#imports'
import { ytPlayerSelector } from '@/utils/const'
import { audioTrackEvents } from '@/utils/custom-event/audio-track'

interface MoviePlayerElement extends HTMLDivElement {
  getAudioTrackState: () => number // 1 if has audio tracks
  getAudioTrack: () => ({ captionTracks: Track[] })
}
export default defineUnlistedScript(() => {
  function getAudioTrack(): AudioTrack {
    try {
    // element is always defined because of the waitForElement in content script
      const playerEl = document.querySelector<MoviePlayerElement>(ytPlayerSelector)!
      const audioTrackState = playerEl.getAudioTrackState()
      const hasAudioTrack = audioTrackState === 1
      if (hasAudioTrack) {
        return {
          hasAudioTrack,
          tracks: playerEl.getAudioTrack().captionTracks,
        }
      }
      else {
      // TODO: handle case when there is no audio track (haven't encountered this case yet)
        console.error('No audio track found, audio track state: ', audioTrackState)
        return {
          hasAudioTrack,
          error: 'No audio track available',
        }
      }
    }
    catch (err) {
      return {
        hasAudioTrack: false,
        error: err instanceof Error ? err.message : String(err),
      }
    }
  }
  audioTrackEvents.exposeAudioTrackProvider(getAudioTrack)
})
