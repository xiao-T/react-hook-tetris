// game audio

import gameAudioFile from "./resources/audio/game.mp3";

type TPlayer = {
  move?: () => void;
  killStart?: () => void;
  start?: () => void;
  clear?: () => void;
  fall?: () => void;
  gameOver?: () => void;
  rotate?: () => void;
};
const audioPlayer: TPlayer = {};
const context: AudioContext = new AudioContext();
(function () {
  window
    .fetch(gameAudioFile)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      const getAudioSource = (): AudioBufferSourceNode => {
        const source: AudioBufferSourceNode = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        return source;
      };
      audioPlayer.killStart = () => {
        audioPlayer.start = () => {};
      };
      audioPlayer.start = () => {
        audioPlayer.killStart?.();
        getAudioSource().start(0, 3.7202, 3.6224);
      };

      audioPlayer.clear = () => {
        getAudioSource().start(0, 0, 0.7675);
      };

      audioPlayer.fall = () => {
        getAudioSource().start(0, 1.2558, 0.3546);
      };

      audioPlayer.gameOver = () => {
        getAudioSource().start(0, 8.1276, 1.1437);
      };

      audioPlayer.rotate = () => {
        getAudioSource().start(0, 2.2471, 0.0807);
      };
      audioPlayer.move = () => {
        getAudioSource().start(0, 2.9088, 0.1437);
      };
    });
})();

export default audioPlayer;
