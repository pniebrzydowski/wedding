import fs from 'fs';
import path from 'path';
import { getContentData } from './content';

interface Accommodation {
  id: string;
  contentHtml: string;
  name: string;
  url: string;
  blockedUntil: string;
  blockedSingle: number;
  blockedDouble: number;
  costSingle: number;
  costDouble: number;
  distance: number;
}

const getAllAccommodationData = async (locale = 'en') => {
  const accommodationsDirectory = path.join(
    process.cwd(),
    'content',
    locale,
    'accommodations'
  );

  const fileNames = fs.readdirSync(accommodationsDirectory);
  const allAccommodationsData = Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const accData: Accommodation = await getContentData({ id, filePath: 'accommodations/', locale });
      return accData;
    })
  );

  return allAccommodationsData;
};

export const getBlockedAccommodations = async (locale) => {
  const allData = await getAllAccommodationData(locale);
  return allData.filter((a) => !!a.blockedUntil);
};

export const getOtherAccommodations = async (locale) => {
  const allData = await getAllAccommodationData(locale);
  return allData.filter((a) => !a.blockedUntil);
};
