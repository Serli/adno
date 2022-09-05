import { useSpeechSynthesis } from 'react-speech-kit';
import "./TTS.css"
const TTS = (props) => {
  const { speak} = useSpeechSynthesis()
  return (
    <button className="tts_play" onClick={() => speak({ text: props.text })}>Speak</button>
  )
}

export default TTS;