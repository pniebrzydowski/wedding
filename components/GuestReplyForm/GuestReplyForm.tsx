import { ReactElement } from 'react';

import { i18n } from '@lingui/core';
import { defineMessage, Trans } from '@lingui/macro';

import { Attending, Guest } from '../../firebase/types';
import Select, { SelectOption } from '../form/Select';
import Textarea from '../form/Textarea';

import styles from './guestReplyForm.module.css';
import Grid from '../ui/Grid';

interface Props {
  guest: Guest;
}

function GuestReplyForm(
  { guest: { id, attending, name, dietaryNeeds, songRequest, comment }
  }: Props): ReactElement {

  const attendingOptions: SelectOption<Attending>[] = [
    {
      value: '',
    },
    {
      value: 'yes',
      label: i18n._(defineMessage({
        id: 'reply:options.yes',
        message: 'Can\'t wait!'
      }))
    },
    {
      value: 'no',
      label: i18n._(defineMessage({
        id: 'reply:options.no',
        message: 'Sorry, can\'t make it'
      }))
    },
  ];

  return (
    <li className={styles.listItem}>
      <div className={styles.header}>
        <h3>{name}</h3>
      </div>
      <Grid factorX={2}>
        <Select
          disabled
          formName="reply"
          fieldName={`guest[${id}].attending`}
          label={<Trans id="reply:labels.answer">You in?</Trans>}
          options={attendingOptions}
          defaultValue={attending}
        />
        <Textarea
          formName="reply"
          fieldName={`guest[${id}].dietaryNeeds`}
          label={<Trans id="reply:labels.dietaryRestrictions">Dietary Restrictions</Trans>}
          defaultValue={dietaryNeeds}
        />
        <Textarea
          formName="reply"
          fieldName={`guest[${id}].comment`}
          label={<Trans id="reply:labels.otherComment">Other comments</Trans>}
          defaultValue={comment}
        />
        <div>
          <Textarea
            formName="reply"
            fieldName={`guest[${id}].songRequest`}
            label={<Trans id="reply:labels.songRequest">Song Request</Trans>}
            defaultValue={songRequest}
          />
          <p className={styles.disclaimer}>* <Trans id="reply:songRequestDisclaimer">No guarantee</Trans></p>
        </div>
      </Grid>
    </li>
  );
}
export default GuestReplyForm;
