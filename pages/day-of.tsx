import Head from "next/head";
import { useRouter } from "next/router";
import Layout, { siteTitle } from "../components/Layout";

import { getContentData } from "../lib/content";

export const getStaticProps = async ({ locale }) => {
  const dayOf = await getContentData({ id: "day-of", locale });

  return {
    props: {
      dayOf,
    },
  };
};

const DayOf = ({ dayOf }) => {
  const { locale } = useRouter();

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
