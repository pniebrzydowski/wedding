import { ReactElement } from 'react';

import Head from 'next/head';

import Layout, { getTranslatedSiteTitle } from '../components/Layout';
import { getContentData } from '../lib/content';
import { StaticContent } from '../content/types';
import { defineMessage } from '@lingui/macro';
import { i18n } from '@lingui/core';
import GiftsContent from '../components/GiftsContent';


interface Props {
  giftInfo: StaticContent;
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const giftInfo = await getContentData({
    id: 'gift-info',
    locale,
  });

  return {
    props: {
      giftInfo,
    },
  };
};


function Gifts({ giftInfo }: Props): ReactElement {
  const pageTitle = i18n._(defineMessage({
    id: 'pageTitle:gifts',
    message: 'Gifts'
  }));

  return (
    <Layout>
      <Head>
        <title>
          {pageTitle} | {getTranslatedSiteTitle()}
        </title>
      </Head>
      <GiftsContent giftInfo={giftInfo.contentHtml} />
    </Layout>
  );
}

export default Gifts;
