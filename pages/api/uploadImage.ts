import fs from 'fs-extra';
import formidable from 'formidable';

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  try {
    const files = await new Promise<{ [key: string]: formidable.File[] }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });

    const tempPath = files.image[0].path;
    const fileName = `${Date.now()}-${files.image[0].name}`;

    await fs.ensureDir('public/images');
    await fs.move(tempPath, `public/images/${fileName}`);

    const imageUrl = `${req.headers.origin}/images/${fileName}`;
    console.log('img url : ', imageUrl)
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
