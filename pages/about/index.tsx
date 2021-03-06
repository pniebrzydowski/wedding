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
  ourStory: StaticContent,
}

export const getAboutRoute = (): Route => ({
  name: RouteName.About,
  url: '/about',
  title: i18n._(defineMessage({
    id: 'pageTitle:about',
    message: 'About Us'
  }))
});

export const getAboutSubRoute = (): Route => ({
  name: RouteName.About,
  url: '/about',
  title: i18n._(defineMessage({
    id: 'pageTitle:about.story',
    message: 'Our Story'
  }))
});

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const ourStory = await getContentData({ id: 'our-story', locale });

  return {
    props: {
      ourStory
    },
  };
};

function About({ ourStory }: Props): ReactElement {
  const pageTitle = getAboutRoute().title;

  return (
    <Layout>
      <Head>
        <title>{pageTitle} | {getTranslatedSiteTitle()}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: ourStory.contentHtml }} />
    </Layout>
  );
}

export default About;
