import { ReactElement, useEffect, useState } from 'react';

import Head from 'next/head';

import Layout, { getTranslatedSiteTitle } from '../components/Layout';
import ReplyGuestList from '../components/ReplyGuestList';
import { getContentData } from '../lib/content';
import { defineMessage } from '@lingui/macro';
import { i18n } from '@lingui/core';
import { StaticContent } from '../content/types';
import InviteNotFound from '../components/InviteNotFound';

interface Props {
  introContent: StaticContent;
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

  const pageTitle = i18n._(defineMessage({
    id: 'pageTitle:reply',
    message: 'Reply'
  }));

  return (
    <Layout>
      <Head>
        <title>{pageTitle} | {getTranslatedSiteTitle()}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: introContent.contentHtml }} />

      {inviteId ? <ReplyGuestList inviteId={inviteId} /> : <InviteNotFound />}
    </Layout>
  );
}

export default Reply;
