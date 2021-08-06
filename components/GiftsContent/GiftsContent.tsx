import { Trans } from '@lingui/macro';
import { ReactElement } from 'react';
import Grid from '../ui/Grid';

interface Props {
  giftInfo: string;
}

const GiftsContent = ({ giftInfo }: Props): ReactElement => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: giftInfo }} />
      <Grid>
        <div>
          <Trans id="gifts:experiences">
            <h3><a href="https://www.tinggly.com/" target="_blank" rel="noreferrer">Shared Experiences via Tinggly</a></h3>
            <p>
            There is nothing that would help draw us closer together during our trip than sharing new experiences.
            </p>
          </Trans>
        </div>
        <div>
          <Trans id="gifts:amazon">
            <h3><a href="https://www.amazon.de/wedding/share/wallner-niebski" target="_blank" rel="noreferrer">Amazon Registry</a></h3>
            <p>
              For those who prefer a more traditional approach, we have put together a small registry on Amazon.de.
            </p>
          </Trans>
        </div>
      </Grid>
    </>
  );
};

export default GiftsContent;
