import { ReactElement } from 'react';

import Head from 'next/head';

import Layout, { getTranslatedSiteTitle } from '../components/Layout';
import { getContentData } from '../lib/content';
import { defineMessage, Trans } from '@lingui/macro';
import { i18n } from '@lingui/core';
import { StaticContent } from '../content/types';
import Grid from '../components/ui/Grid';
import Table from '../components/ui/Table';

interface Props {
  schlossGreinburg: StaticContent;
  arrival: {
    intro: StaticContent;
    car: StaticContent;
    transit: StaticContent;
  }
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: Props }> => {
  const schlossGreinburg = await getContentData({
    id: 'schloss-greinburg',
    locale,
  });
  const arrival = {
    intro: await getContentData({ id: 'arrival', locale }),
    car: await getContentData({ id: 'arrival-car', locale }),
    transit: await getContentData({ id: 'arrival-transit', locale }),
  };

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
      <div dangerouslySetInnerHTML={{ __html: arrival.intro.contentHtml }} />
      <Grid factorX={4}>
        <div>
          <h3><Trans id="arrival:byTransit">By Public Transit</Trans></h3>
          <Table>
            <thead>
              <tr>
                <th>From</th>
                <th>Time</th>
                <th>Transfers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Linz</td>
                <td>75 - 90 min</td>
                <td>0 - 1</td>
              </tr>
              <tr>
                <td>Vienna</td>
                <td>2 - 3 hrs</td>
                <td>1 - 2</td>
              </tr>
              <tr>
                <td>Passau/Schärding</td>
                <td>3 - 3.5 hrs</td>
                <td>1 - 3</td>
              </tr>
            </tbody>
          </Table>
          <div dangerouslySetInnerHTML={{ __html: arrival.transit.contentHtml }} />
        </div>
        <div>
          <h3><Trans id="arrival:byCar">By Car</Trans></h3>
          <Table>
            <thead>
              <tr>
                <th>From</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Linz</td>
                <td>00:45</td>
              </tr>
              <tr>
                <td>Vienna</td>
                <td>01:35</td>
              </tr>
              <tr>
                <td>Passau/Schärding</td>
                <td>01:50</td>
              </tr>
            </tbody>
          </Table>
          <div dangerouslySetInnerHTML={{ __html: arrival.car.contentHtml }} />
        </div>
      </Grid>
    </Layout>
  );
}

export default Location;
