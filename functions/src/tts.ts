/*
Text to speech stuff!
*/
const fsPromises = require('fs').promises;
const textToSpeech = require('@google-cloud/text-to-speech');
const ttsClient = new textToSpeech.TextToSpeechClient();
// Sends a request to TTS and saves the result to a temp file
export async function toSpeech(fileName: string, text: string): Promise<string> {
  const request = {
    input: { text: text },
    // Select the language and SSML Voice Gender (optional)
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    // Select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3' },
  };
  const res = await ttsClient.synthesizeSpeech(request).catch((err: Error) => {
    console.log(err);
  })
  const tempFilePath = '/tmp/' + fileName + '.mp3';
  console.log(res)
  await fsPromises.writeFile(tempFilePath, res[0].audioContent)
  return tempFilePath;
}
