import React, { ReactElement } from 'react';

import { Trans } from '@lingui/macro';
import dayjs from 'dayjs';
import { AccommodationData } from '../../lib/accommodations';

import styles from './accommodationInfo.module.css';
import Table from '../ui/Table';

interface Props {
  accommodation: AccommodationData;
}

function AccommodationInfo({ accommodation: {
  blockedDouble, costDouble, blockedSingle, costSingle, blockedFamily,
  costFamily, blockedUntil, distance, url, name, contentHtml
} }: Props): ReactElement {
  const isBlocked = blockedUntil && dayjs(blockedUntil) > dayjs();
  const distanceInFeet = Math.round(distance * 3.28084);

  return (
    <div className={styles.container}>
      <h3>
        <a href={url} target="_blank" rel="noreferrer">{name}</a>
      </h3>
      <p>
        {isBlocked && (
          <>
            <Trans id="accommodation:reservedUntil">Reserved until:</Trans>{' '}
            <strong>{dayjs(blockedUntil).format('LL')}</strong>{distance && <br />}
          </>
        )}
        {distance && (
          <Trans id="accommodation:distance">
            Distance to Castle: {distance}m ({distanceInFeet}ft)
          </Trans>
        )}
      </p>
      {(costDouble || costSingle) &&
        <Table>
          <thead>
            <tr>
              <th></th>
              {isBlocked && (blockedDouble || blockedSingle || blockedFamily) && (
                <th className={styles.numberCol}>
                  <Trans id="accommodation:rooms">Rooms</Trans>
                </th>
              )}
              <th className={styles.numberCol}>
                <Trans id="accommodation:price">Price</Trans>
              </th>
            </tr>
          </thead>
          <tbody>
            {costDouble && <tr>
              <td><Trans id="accommodation:doubleRooms">Double Rooms</Trans></td>
              {isBlocked && blockedDouble && <td>{blockedDouble}</td>}
              <td>€ {costDouble}</td>
            </tr>}
            {costSingle && <tr>
              <td><Trans id="accommodation:singleRooms">Single Rooms</Trans></td>
              {isBlocked && blockedSingle && <td>{blockedSingle}</td>}
              <td>€ {costSingle}</td>
            </tr>}
            {costFamily && <tr>
              <td><Trans id="accommodation:familyRooms">Family Rooms (4)</Trans></td>
              {isBlocked && blockedFamily && <td>{blockedFamily}</td>}
              <td>€ {costFamily}</td>
            </tr>}
          </tbody>
        </Table>
      }
      <div className={styles.details} dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}

export default AccommodationInfo;
