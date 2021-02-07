import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";

import { getContentData } from "../lib/content";

export async function getStaticProps() {
  const schlossGreinburg = await getContentData("schloss-greinburg");
  const arrival = await getContentData("arrival");

  return {
    props: {
      schlossGreinburg,
      arrival,
    },
  };
}

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
