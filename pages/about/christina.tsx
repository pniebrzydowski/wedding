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
  aboutChristina: StaticContent,
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const aboutChristina = await getContentData({ id: 'about-christina', locale });
  return {
    props: {
      aboutChristina,
    },
  };
};

export const getAboutChristinaRoute = (): Route => ({
  name: RouteName.AboutChristina,
  url: '/about/christina',
  title: i18n._(defineMessage({
    id: 'pageTitle:about.christina',
    message: 'About Christina'
  }))
});

function AboutPatrick({ aboutChristina }: Props): ReactElement {
  const pageTitle = getAboutChristinaRoute().title;

  return (
    <Layout>
      <Head>
        <title>{pageTitle} | {getTranslatedSiteTitle()}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: aboutChristina.contentHtml }} />
    </Layout>
  );
}

export default AboutPatrick;
