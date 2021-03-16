import { ReactElement } from 'react';

import Head from 'next/head';

import Layout, { getTranslatedSiteTitle } from '../components/Layout';
import { getContentData } from '../lib/content';
import { StaticContent } from '../content/types';
import { FaqData, getAllFaqs } from '../lib/faq';
import Accordion from '../components/Accordion';

interface Props {
  faqIntro: StaticContent;
  allFaqs: FaqData[];
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const faqIntro = await getContentData({ id: 'faq', locale });
  const allFaqs: FaqData[] = await getAllFaqs(locale);

  return {
    props: {
      faqIntro,
      allFaqs
    },
  };
};

function Faq({ faqIntro, allFaqs }: Props): ReactElement {
  return (
    <Layout>
      <Head>
        <title>Frequently Asked Questions | {getTranslatedSiteTitle()}</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: faqIntro.contentHtml }} />

      {allFaqs.map(faq => (
        <Accordion key={faq.title} title={faq.title}>
          <div dangerouslySetInnerHTML={{ __html: faq.contentHtml}} />
        </Accordion>
      ))}
    </Layout>
  );
}

export default Faq;
