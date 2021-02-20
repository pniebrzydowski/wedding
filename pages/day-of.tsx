import { ReactElement } from 'react';

import Head from 'next/head';

import Layout, { siteTitle } from '../components/Layout';
import { getContentData } from '../lib/content';

interface Props {
  dayOf: any;
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const dayOf = await getContentData({ id: 'day-of', locale });

  return {
    props: {
      dayOf,
    },
  };
};

function DayOf({ dayOf }: Props): ReactElement {
  return (
    <Layout>
      <Head>
        <title>Day Of | {siteTitle}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: dayOf.contentHtml }} />
    </Layout>
  );
}

export default DayOf;
