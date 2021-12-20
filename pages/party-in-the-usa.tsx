import { ReactElement } from 'react';

import Head from 'next/head';

import ReplyGuestList from '../components/ReplyGuestList';
import { getContentData } from '../lib/content';
import { StaticContent } from '../content/types';
import InviteNotFound from '../components/InviteNotFound';

import useInviteId from '../firebase/hooks/useInviteId';
import LayoutUS, { getTranslatedSiteTitle } from '../components/partyUS/Layout';
import HomeContentUS from '../components/partyUS/HomeContent';

interface Props {
  introContent: StaticContent;
  basicInfo: StaticContent;
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const introContent = await getContentData({ id: 'reply-intro-us', locale });
  const basicInfo = await getContentData({ id: 'basic-info-us', locale });

  return {
    props: {
      introContent,
      basicInfo
    },
  };
};

function PartyUS({ introContent, basicInfo }: Props): ReactElement {
  const inviteId = useInviteId();

  return (
    <LayoutUS>
      <Head>
        <title>{getTranslatedSiteTitle()}</title>
      </Head>

      <HomeContentUS basicInfo={basicInfo.contentHtml} />

      <div dangerouslySetInnerHTML={{ __html: introContent.contentHtml }} />

      {inviteId ? <ReplyGuestList inviteId={inviteId} partyLocation='us' /> : <InviteNotFound />}
    </LayoutUS>
  );
}

export default PartyUS;
