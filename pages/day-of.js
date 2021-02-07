import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";

import { getContentData } from "../lib/content";

export const getStaticProps = async () => {
  const dayOf = await getContentData("day-of");

  return {
    props: {
      dayOf,
    },
  };
};

const DayOf = ({ dayOf }) => {
  return (
    <Layout>
      <Head>
        <title>Day Of | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: dayOf.contentHtml }} />
    </Layout>
  );
};

export default DayOf;
