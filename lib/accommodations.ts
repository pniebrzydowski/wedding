import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';
import { StaticContent } from '../content/types';
import { getContentData } from './content';

export interface AccommodationData extends StaticContent {
  id: string;
  blockedUntil: string;
  blockedSingle: number;
  blockedDouble: number;
  blockedFamily: number;
  costSingle: number;
  costDouble: number;
  costFamily: number;
  distance: number;
  url: string;
  name: string;
  order: number;
}


const getAllAccommodationData = async (locale = 'en') => {
  const accommodationsDirectory = path.join(
    process.cwd(),
    'content',
    locale,
    'accommodations'
  );

  const fileNames = fs.readdirSync(accommodationsDirectory);
  const allAccommodationsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const accData: AccommodationData = await getContentData({ id, filePath: 'accommodations/', locale });
      return accData;
    })
  );

  return allAccommodationsData.sort((a, b) => a.order - b.order);
};

export const getBlockedAccommodations = async (locale: string): Promise<AccommodationData[]> => {
  const allData = await getAllAccommodationData(locale);
  return allData.filter((a) => !!a.blockedUntil && dayjs(a.blockedUntil).startOf('day') >= dayjs().startOf('day'));
};

export const getOtherAccommodations = async (locale: string): Promise<AccommodationData[]> => {
  const allData = await getAllAccommodationData(locale);
  return allData.filter((a) => !a.blockedUntil || dayjs(a.blockedUntil).startOf('day') < dayjs().startOf('day'));
};
