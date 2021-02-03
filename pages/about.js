import Head from "next/head";
import Layout from "../components/layout";

import { getContentData } from "../lib/content";

export async function getStaticProps() {
  const aboutPatrick = await getContentData("about-patrick");
  const aboutChristina = await getContentData("about-christina");
  return {
    props: {
      aboutPatrick,
      aboutChristina,
    },
  };
}

const About = ({ aboutPatrick, aboutChristina }) => {
  return (
    <Layout>
      <Head>
        <title>About Us</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: aboutPatrick.contentHtml }} />
      <div dangerouslySetInnerHTML={{ __html: aboutChristina.contentHtml }} />
    </Layout>
  );
};

export default About;
