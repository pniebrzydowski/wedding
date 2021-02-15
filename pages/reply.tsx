import Head from "next/head";
import { useEffect, useState } from "react";
import Layout, { siteTitle } from "../components/Layout";
import ReplyGuestList from "../components/ReplyGuestList";

import { getContentData } from "../lib/content";

export const getStaticProps = async ({ locale }) => {
  const introContent = await getContentData({ id: "reply-intro", locale });

  return {
    props: {
      introContent,
    },
  };
};

const Reply = ({ introContent }) => {
  const [inviteId, setInviteId] = useState("");
  useEffect(() => {
    const iId = localStorage.getItem("inviteId");
    setInviteId(iId);
  });

  return (
    <Layout>
      <Head>
        <title>Reply | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: introContent.contentHtml }} />

      {inviteId && <ReplyGuestList inviteId={inviteId} />}
    </Layout>
  );
};

export default Reply;
