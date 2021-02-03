import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h1>Welcome</h1>
      </section>

      <section>
        <h2>About Us</h2>
      </section>
    </Layout>
  );
}
