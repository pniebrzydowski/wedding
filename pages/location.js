import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";

import { getContentData } from "../lib/content";

export const getStaticProps = async ({ locale }) => {
  const schlossGreinburg = await getContentData({
    id: "schloss-greinburg",
    locale,
  });
  const arrival = await getContentData({ id: "arrival", locale });

  return {
    props: {
      schlossGreinburg,
      arrival,
    },
  };
};

const Location = ({ schlossGreinburg, arrival }) => {
  return (
    <Layout>
      <Head>
        <title>Location | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: schlossGreinburg.contentHtml }} />
      <div dangerouslySetInnerHTML={{ __html: arrival.contentHtml }} />
    </Layout>
  );
};

export default Location;
