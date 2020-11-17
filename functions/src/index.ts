/*
 * This template contains a HTTP function that responds with a greeting when called
 *
 * Always use the FUNCTIONS HANDLER NAMESPACE
 * when writing Cloud Functions for extensions.
 * Learn more about the handler namespace in the docs
 *
 * Reference PARAMETERS in your functions code with:
 * `process.env.<parameter-name>`
 * Learn more about parameters in the docs
 */

import * as functions from 'firebase-functions';
import * as tts from './tts';
import * as gcs from './gcs';


exports.textToSpeech = functions.handler.firestore.document.onCreate(async (change) => {
  const data = change.data();
  console.log(data);
  const text = data[process.env.INPUT_FIELD_NAME || ""]
  const docPath = change.ref.id;
  const filePath = await tts.toSpeech(docPath, text);
  const gcsPath = `${process.env.SPEECH_FILES_PATH}/${docPath}.mp3`
  const res = await gcs.saveAudioToStorage(filePath, gcsPath);
  console.log(res);
  return;
});
