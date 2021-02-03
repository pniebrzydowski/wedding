import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";

import { getContentData } from "../lib/content";

export async function getStaticProps() {
  const introContent = await getContentData("accommodation-intro");

  return {
    props: {
      introContent,
      accommodationOptions: [""],
    },
  };
}

const Accommodation = ({ introContent, accommodationOptions }) => {
  return (
    <Layout>
      <Head>
        <title>Accommodation | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: introContent.contentHtml }} />

      {accommodationOptions.map((option) => (
        <div dangerouslySetInnerHTML={{ __html: option.contentHtml }} />
      ))}
    </Layout>
  );
};

export default Accommodation;
