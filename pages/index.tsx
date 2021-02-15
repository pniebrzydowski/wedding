import Head from "next/head";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import Layout, { siteTitle } from "../components/Layout";

const saveInviteId = (inviteId: string) => {
  localStorage.setItem("inviteId", inviteId);
};

const Home: FunctionComponent = () => {
  const { query } = useRouter();

  if (query.inviteId) {
    saveInviteId(query.inviteId as string);
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
    </Layout>
  );
};

export default Home;
