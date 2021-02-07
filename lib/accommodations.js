import fs from "fs";
import path from "path";
import { getContentData } from "./content";

const getAllAccommodationData = async (locale = "en") => {
  const accommodationsDirectory = path.join(
    process.cwd(),
    "content",
    locale,
    "accommodations"
  );

  const fileNames = fs.readdirSync(accommodationsDirectory);
  const allAccommodationsData = Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      return getContentData({ id, filePath: "accommodations/", locale });
    })
  );

  return allAccommodationsData;
};

export const getBlockedAccommodations = async (locale) => {
  const allData = await getAllAccommodationData(locale);
  return allData.filter((a) => !!a.bookedUntil);
};

export const getOtherAccommodations = async (locale) => {
  const allData = await getAllAccommodationData(locale);
  return allData.filter((a) => !a.bookedUntil);
};
