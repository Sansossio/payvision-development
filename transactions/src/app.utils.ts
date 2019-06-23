import { join } from 'path';
import { readFile } from 'fs';
import { InternalServerErrorException } from '@nestjs/common';

export const getTemplate = (path: string) => {
  path = join(__dirname, '..', 'template', path);
  return new Promise<string>((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
      if (err) reject(new InternalServerErrorException(err.message));
      else resolve(data);
    });
  });
};
