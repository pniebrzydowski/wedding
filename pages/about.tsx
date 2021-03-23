import { ReactElement } from 'react';

import Head from 'next/head';

import Layout from '../components/Layout';
import { getContentData } from '../lib/content';
import { getTranslatedSiteTitle } from '../components/Layout';
import { defineMessage } from '@lingui/macro';
import { i18n } from '@lingui/core';

interface Props {
  ourStory: any,
  aboutPatrick: any,
  aboutChristina: any
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const ourStory = await getContentData({ id: 'our-story', locale });
  const aboutPatrick = await getContentData({ id: 'about-patrick', locale });
  const aboutChristina = await getContentData({
    id: 'about-christina',
    locale,
  });
  return {
    props: {
      ourStory,
      aboutPatrick,
      aboutChristina,
    },
  };
};

function About({ ourStory, aboutPatrick, aboutChristina }: Props): ReactElement {
  const pageTitle = i18n._(defineMessage({
    id: 'pageTitle:about',
    message: 'Über uns'
  }));

  return (
    <Layout>
      <Head>
        <title>{pageTitle} | {getTranslatedSiteTitle()}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: ourStory.contentHtml }} />
      <div dangerouslySetInnerHTML={{ __html: aboutPatrick.contentHtml }} />
      <div dangerouslySetInnerHTML={{ __html: aboutChristina.contentHtml }} />
    </Layout>
  );
}

export default About;
