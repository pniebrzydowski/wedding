import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";

import { getContentData } from "../lib/content";

export const getStaticProps = async () => {
  const ourStory = await getContentData("our-story");
  const aboutPatrick = await getContentData("about-patrick");
  const aboutChristina = await getContentData("about-christina");
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
