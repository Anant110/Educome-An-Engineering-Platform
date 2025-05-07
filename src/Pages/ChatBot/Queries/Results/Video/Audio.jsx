import React, { useState, useEffect, useRef } from 'react';

import AudioPlayer from 'react-audio-player';

import { SpeechClient } from '@google-cloud/speech';

const App = () => {

const [transcript, setTranscript] = useState('');

const [audioStream, setAudioStream] = useState(null);

const audioRef = useRef(null);

useEffect(() => {

// Initialize Google Cloud Speech-to-Text

const speechClient = new SpeechClient();

// Handle audio stream changes

audioRef.current.onPlay = () => {

const mediaRecorder = new MediaRecorder(audioRef.current.audio.src);

setAudioStream(mediaRecorder);

};

// Start transcription

const recognizeStream = async () => {

if (audioStream) {

// Create the request to transcribe the audio

const request = {

config: {

encoding: 'LINEAR16',

sampleRateHertz: 44100,

languageCode: 'en-US',

},

audio: {

content: audioStream,

},

};

// Start streaming the audio to the API

const recognizeStream = speechClient.streamingRecognize(request);

// Handle responses

recognizeStream.on('data', (data) => {

// Update the transcript with new data

setTranscript((prevTranscript) => {

if (data.results) {

const result = data.results[0];

return prevTranscript + result.alternatives[0].transcript;

}

return prevTranscript;

});

});

}

};

recognizeStream();

return () => {

// Clean up resources

speechClient.close();

};

}, []);

return (

<div>

<AudioPlayer ref={audioRef} src="https://www.youtube.com/watch?v=your_video_id" />

<p>Transcript: {transcript}</p>

</div>

);

};