import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";

import { getContentData } from "../lib/content";

export async function getStaticProps() {
  const schedule = await getContentData("schedule");

  return {
    props: {
      schedule,
    },
  };
}

const DayOf = ({ schedule }) => {
  return (
    <Layout>
      <Head>
        <title>Day Of | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: schedule.contentHtml }} />
    </Layout>
  );
};

export default DayOf;
