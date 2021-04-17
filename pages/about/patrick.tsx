import { ReactElement } from 'react';

import Head from 'next/head';

import Layout from '../../components/Layout';
import { getContentData } from '../../lib/content';
import { getTranslatedSiteTitle } from '../../components/Layout';
import { defineMessage } from '@lingui/macro';
import { i18n } from '@lingui/core';
import { StaticContent } from '../../content/types';
import { Route, RouteName } from '../../components/MainNavigation/routes';

interface Props {
  aboutPatrick: StaticContent,
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const aboutPatrick = await getContentData({ id: 'about-patrick', locale });
  return {
    props: {
      aboutPatrick,
    },
  };
};

export const getAboutPatrickRoute = (): Route => ({
  name: RouteName.AboutPatrick,
  url: '/about/patrick',
  title: i18n._(defineMessage({
    id: 'pageTitle:about.patrick',
    message: 'About Patrick'
  }))
});

function AboutPatrick({ aboutPatrick }: Props): ReactElement {
  const pageTitle = getAboutPatrickRoute().title;

  return (
    <Layout>
      <Head>
        <title>{pageTitle} | {getTranslatedSiteTitle()}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: aboutPatrick.contentHtml }} />
    </Layout>
  );
}

export default AboutPatrick;
