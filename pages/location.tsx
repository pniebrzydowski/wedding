import { ReactElement } from 'react';

import Head from 'next/head';

import Layout, { getTranslatedSiteTitle } from '../components/Layout';
import { getContentData } from '../lib/content';
import { defineMessage } from '@lingui/macro';
import { i18n } from '@lingui/core';

interface Props {
  schlossGreinburg: any;
  arrival: any;
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const schlossGreinburg = await getContentData({
    id: 'schloss-greinburg',
    locale,
  });
  const arrival = await getContentData({ id: 'arrival', locale });

  return {
    props: {
      schlossGreinburg,
      arrival,
    },
  };
};

function Location({ schlossGreinburg, arrival }: Props): ReactElement {
  const pageTitle = i18n._(defineMessage({
    id: 'pageTitle:location',
    message: 'Location'
  }));

  return (
    <Layout headerImageUrl="greinburg-hero.jpg">
      <Head>
        <title>
          {pageTitle} | {getTranslatedSiteTitle()}
        </title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: schlossGreinburg.contentHtml }} />
      <div dangerouslySetInnerHTML={{ __html: arrival.contentHtml }} />
    </Layout>
  );
}

export default Location;
