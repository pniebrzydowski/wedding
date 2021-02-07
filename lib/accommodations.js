import fs from "fs";
import path from "path";
import { getContentData } from "./content";

const accommodationsDirectory = path.join(
  process.cwd(),
  "content/accommodations"
);

const getAllAccommodationData = async () => {
  const fileNames = fs.readdirSync(accommodationsDirectory);
  const allAccommodationsData = Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      return getContentData(id, "accommodations/");
    })
  );

  return allAccommodationsData;
};

export const getBlockedAccommodations = async () => {
  const allData = await getAllAccommodationData();
  return allData.filter((a) => !!a.bookedUntil);
};

export const getOtherAccommodations = async () => {
  const allData = await getAllAccommodationData();
  return allData.filter((a) => !a.bookedUntil);
};
