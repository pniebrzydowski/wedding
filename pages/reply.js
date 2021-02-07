import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";

import { getContentData } from "../lib/content";

export const getStaticProps = async () => {
  const introContent = await getContentData("reply-intro");

  return {
    props: {
      introContent,
    },
  };
};

const Reply = ({ introContent }) => {
  return (
    <Layout>
      <Head>
        <title>Reply | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: introContent.contentHtml }} />
    </Layout>
  );
};

export default Reply;
