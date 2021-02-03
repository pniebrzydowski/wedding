import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";

import { getContentData } from "../lib/content";

export async function getStaticProps() {
  const schlossGreinburg = await getContentData("schloss-greinburg");
  return {
    props: {
      schlossGreinburg,
    },
  };
}

const Location = ({ schlossGreinburg }) => {
  return (
    <Layout>
      <Head>
        <title>Location | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: schlossGreinburg.contentHtml }} />
    </Layout>
  );
};

export default Location;
