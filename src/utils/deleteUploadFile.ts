import * as fs from 'fs';

export const deleteUploadFile = (path: string) => {
  console.log('fs', fs);
  //   fs.unlink(path, err => {
  fs.unlink('uploads/4a314ed739304c0e93ea58c645f11ff0', err => {
    if (err) throw err;

    console.log('File is deleted.');
  });
  //   fs.unlinkSync('uploads/4a314ed739304c0e93ea58c645f11ff0');
};
