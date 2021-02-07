import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";

import { getContentData } from "../lib/content";

export const getStaticProps = async ({ locale }) => {
  const ourStory = await getContentData({ id: "our-story", locale });
  const aboutPatrick = await getContentData({ id: "about-patrick", locale });
  const aboutChristina = await getContentData({
    id: "about-christina",
    locale,
  });
  return {
    props: {
      ourStory,
      aboutPatrick,
      aboutChristina,
    },
  };
};

const About = ({ ourStory, aboutPatrick, aboutChristina }) => {
  return (
    <Layout>
      <Head>
        <title>About Us | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: ourStory.contentHtml }} />
      <div dangerouslySetInnerHTML={{ __html: aboutPatrick.contentHtml }} />
      <div dangerouslySetInnerHTML={{ __html: aboutChristina.contentHtml }} />
    </Layout>
  );
};

export default About;
