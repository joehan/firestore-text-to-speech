
const fs = require('fs');
const admin = require('firebase-admin');
admin.initializeApp();
const storage = admin.storage();

export async function saveAudioToStorage(filePath: string, gcsPath: string): Promise<any>{
  return storage.bucket(process.env.IMG_BUCKET).upload(filePath, {
    destination: gcsPath,
    predefinedAcl: 'publicRead',
  }).then((res: any) => {
    fs.unlinkSync(filePath);
    console.log(res);
    return res[0].getMetadata();
  });
}