import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import useCollectionDocsData from "../firebase/hooks/useCollectionDocsData";
import useDocData from "../firebase/hooks/useDocData";

import { getContentData } from "../lib/content";

export const getStaticProps = async ({ locale }) => {
  const introContent = await getContentData({ id: "reply-intro", locale });

  return {
    props: {
      introContent,
    },
  };
};

interface Guest {
  id: string;
  inviteId: string;
  name: string;
  attending: boolean;
}

interface Invite {
  dietaryNeeds: string;
  songRequest: string;
}

const Reply = ({ introContent }) => {
  const inviteId = "CHNLr4xnflG0COwg9pgU";
  const { loading: inviteLoading, data: invite } = useDocData<Invite>({
    collection: "invites",
    id: inviteId,
  });

  const { loading: guestsLoading, data: guests } = useCollectionDocsData<Guest>(
    {
      collection: "guests",
      query: {
        field: "inviteId",
        operator: "==",
        value: inviteId,
      },
    }
  );

  return (
    <Layout>
      <Head>
        <title>Reply | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: introContent.contentHtml }} />

      {(inviteLoading || guestsLoading) && "Loading..."}

      {guests &&
        guests.map((guest) => (
          <li key={guest.id}>
            {guest.name} - {guest.attending.toString()}
          </li>
        ))}
      {invite && (
        <>
          <div>
            <label>Dietary Needs</label>
            <textarea>{invite.dietaryNeeds}</textarea>
          </div>
          <div>
            <label>Song Request</label>
            <input type="text" defaultValue={invite.songRequest} />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Reply;
