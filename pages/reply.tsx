import { ReactElement, useEffect, useState } from 'react';

import Head from 'next/head';

import Layout, { siteTitle } from '../components/Layout';
import ReplyGuestList from '../components/ReplyGuestList';
import { getContentData } from '../lib/content';

interface Props {
  introContent: any;
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const introContent = await getContentData({ id: 'reply-intro', locale });

  return {
    props: {
      introContent,
    },
  };
};

function Reply({ introContent }: Props): ReactElement {
  const [inviteId, setInviteId] = useState('');
  useEffect(() => {
    const iId = localStorage.getItem('inviteId');
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
}

export default Reply;
