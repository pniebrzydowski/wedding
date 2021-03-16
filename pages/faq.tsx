import { ReactElement } from 'react';

import Head from 'next/head';

import Layout, { getTranslatedSiteTitle } from '../components/Layout';
import { getContentData } from '../lib/content';
import { StaticContent } from '../content/types';

interface Props {
  faq: StaticContent;
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const faq = await getContentData({ id: 'faq', locale });

  return {
    props: {
      faq,
    },
  };
};

function Faq({ faq }: Props): ReactElement {
  return (
    <Layout>
      <Head>
        <title>Frequently Asked Questions | {getTranslatedSiteTitle()}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: faq.contentHtml }} />
    </Layout>
  );
}

export default Faq;
