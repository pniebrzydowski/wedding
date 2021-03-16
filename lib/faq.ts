import fs from 'fs';
import path from 'path';
import { StaticContent } from '../content/types';
import { getContentData } from './content';

export interface FaqData extends StaticContent {
  title: string;
}

export const getAllFaqs = async (locale = 'en'): Promise<FaqData[]> => {
  const accommodationsDirectory = path.join(
    process.cwd(),
    'content',
    locale,
    'faq'
  );

  const fileNames = fs.readdirSync(accommodationsDirectory);
  const allFaqs = Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const data: FaqData = await getContentData({ id, filePath: 'faq/', locale });
      return data;
    })
  );

  return allFaqs;
};
