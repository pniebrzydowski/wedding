import Head from "next/head";
import GuestReplyForm from "../components/GuestReplyForm";
import Layout, { siteTitle } from "../components/Layout";
import useCollectionDocsData from "../firebase/hooks/useCollectionDocsData";
import { Guest } from "../firebase/types";

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
  const inviteId = "CHNLr4xnflG0COwg9pgU";
  const { loading, data: guests } = useCollectionDocsData<Guest>({
    collection: "guests",
    query: {
      field: "inviteId",
      operator: "==",
      value: inviteId,
    },
  });

  return (
    <Layout>
      <Head>
        <title>Reply | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: introContent.contentHtml }} />

      {loading && "Loading..."}

      {guests &&
        guests.map((guest) => <GuestReplyForm guest={guest} key={guest.id} />)}
    </Layout>
  );
};

export default Reply;
