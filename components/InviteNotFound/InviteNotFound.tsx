import { ReactElement } from 'react';

import { Trans } from '@lingui/macro';

function InviteNotFound(): ReactElement {
  return (
    <p>
      <Trans id="reply:noInvite">
        Sorry, we were unable to find your invitation.
        Be sure you accessed the site via the direct link sent in your invitation.
        If you are still having problems, please contact us directly!
      </Trans>
    </p>
  );
}

export default InviteNotFound;
