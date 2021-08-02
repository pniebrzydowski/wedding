import { ReactElement } from 'react';

import Head from 'next/head';

import Layout, { getTranslatedSiteTitle } from '../components/Layout';
import { getContentData } from '../lib/content';
import { StaticContent } from '../content/types';
import HomeContent from '../components/HomeContent';

interface Props {
  basicInfo: StaticContent;
  covidInfo: StaticContent;
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const basicInfo = await getContentData({
    id: 'basic-info',
    locale,
  });
  const covidInfo = await getContentData({
    id: 'covid-info',
    locale,
  });

  return {
    props: {
      basicInfo,
      covidInfo
    },
  };
};


function Home({ basicInfo, covidInfo }: Props): ReactElement {
  return (
    <Layout>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet"></link>
        <title>{getTranslatedSiteTitle()}</title>
      </Head>
      <HomeContent basicInfo={basicInfo.contentHtml} covidInfo={covidInfo.contentHtml} />
    </Layout>
  );
}

export default Home;
