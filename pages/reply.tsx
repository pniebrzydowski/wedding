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
  additionalInfo: StaticContent;
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const introContent = await getContentData({ id: 'reply-intro-us', locale });
  const basicInfo = await getContentData({ id: 'basic-info-us', locale });
  const additionalInfo = await getContentData({ id: 'additional-info-us', locale });

  return {
    props: {
      introContent,
      basicInfo,
      additionalInfo
    },
  };
};

function Reply({ introContent, basicInfo, additionalInfo }: Props): ReactElement {
  const inviteId = useInviteId('us');

  return (
    <LayoutUS>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet"></link>
        <title>{getTranslatedSiteTitle()}</title>
      </Head>

      {inviteId ? (
        <>
          <HomeContentUS basicInfo={basicInfo.contentHtml} additionalInfo={additionalInfo.contentHtml} introContent={introContent.contentHtml} />
          <ReplyGuestList inviteId={inviteId} partyLocation='us' />
        </>
      ) : <InviteNotFound />}
    </LayoutUS>
  );
}

export default Reply;
