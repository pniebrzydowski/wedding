import Head from "next/head";
import AccommodationInfo from "../components/AccommodationInfo/AccommodationInfo";
import Layout, { siteTitle } from "../components/Layout";
import {
  getBlockedAccommodations,
  getOtherAccommodations,
} from "../lib/accommodations";

import { getContentData } from "../lib/content";

export async function getStaticProps() {
  const introContent = await getContentData("accommodation-intro");
  const blockedAccommodations = await getBlockedAccommodations();
  const otherAccommodations = await getOtherAccommodations();

  return {
    props: {
      introContent,
      blockedAccommodations,
      otherAccommodations,
    },
  };
}

const Accommodation = ({
  introContent,
  blockedAccommodations,
  otherAccommodations,
}) => {
  return (
    <Layout>
      <Head>
        <title>Accommodation | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: introContent.contentHtml }} />

      {blockedAccommodations.map((option) => (
        <AccommodationInfo accommodation={option} key={option.name} />
      ))}
      {otherAccommodations.map((option) => (
        <AccommodationInfo accommodation={option} key={option.name} />
      ))}
    </Layout>
  );
};

export default Accommodation;
