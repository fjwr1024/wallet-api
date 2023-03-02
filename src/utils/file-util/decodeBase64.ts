import * as fs from 'fs';
import path from 'path';

export const decodeBase64 = async encodedData => {
  const fileData = await encodedData.replace(/^data:\w+\/\w+;base64,/, '');
  const decodedImage = await Buffer.from(fileData, 'base64');

  const fileExtension = encodedData.toString().slice(encodedData.indexOf('/') + 1, encodedData.indexOf(';'));

  const imagePath = await `uploads/uploaded-image.${fileExtension}`;

  await fs.writeFileSync(path.join('uploads', `uploaded-image.${fileExtension}`), decodedImage, { encoding: 'base64' });

  return imagePath;
};
