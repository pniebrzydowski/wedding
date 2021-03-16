import { ReactElement } from 'react';

import { i18n } from '@lingui/core';
import Head from 'next/head';

import AccommodationInfo from '../components/AccommodationInfo/AccommodationInfo';
import Layout, { getTranslatedSiteTitle } from '../components/Layout';
import {
  AccommodationData,
  getBlockedAccommodations,
  getOtherAccommodations,
} from '../lib/accommodations';
import { getContentData } from '../lib/content';
import { StaticContent } from '../content/types';
import Grid from '../components/ui/Grid';
import { defineMessage } from '@lingui/macro';

interface Props {
  introContent: StaticContent;
  additionalContent: StaticContent;
  blockedAccommodations: AccommodationData[];
  otherAccommodations: AccommodationData[];
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const introContent = await getContentData({
    id: 'accommodation-intro',
    locale,
  });
  const additionalContent = await getContentData({
    id: 'accommodation-more',
    locale,
  });
  const blockedAccommodations: AccommodationData[] = await getBlockedAccommodations(locale);
  const otherAccommodations: AccommodationData[] = await getOtherAccommodations(locale);

  return {
    props: {
      introContent,
      additionalContent,
      blockedAccommodations,
      otherAccommodations,
    },
  };
};

function Accommodation({
  introContent,
  additionalContent,
  blockedAccommodations,
  otherAccommodations,
}: Props): ReactElement {
  const pageTitle = i18n._(defineMessage({
    id: 'pageTitles:accommodation',
    message: 'Accommodation'
  }));
  return (
    <Layout>
      <Head>
        <title>
          {pageTitle} | {getTranslatedSiteTitle()}
        </title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: introContent.contentHtml }} />

      <Grid factorX={4}>
        {blockedAccommodations.map((option) => (
          <AccommodationInfo accommodation={option} key={option.name} />
        ))}
      </Grid>

      <div dangerouslySetInnerHTML={{ __html: additionalContent.contentHtml }} />

      <Grid factorX={4}>
        {otherAccommodations.map((option) => (
          <AccommodationInfo accommodation={option} key={option.name} />
        ))}
      </Grid>
    </Layout>
  );
}

export default Accommodation;
