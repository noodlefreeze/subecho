export interface Track {
  displayName: string
  languageCode: string
  languageName: string
  url: string
  vssId: string
}
export type AudioTrack = {
  hasAudioTrack: true
  tracks: Track[]
} | { hasAudioTrack: false, error: string }
