import { ReactElement } from 'react';

import dayjs from 'dayjs';
import { AccommodationData } from '../../lib/accommodations';

import styles from './accommodationInfo.module.css';
import { isBoolean } from 'util';

interface Props {
  accommodation: AccommodationData;
}

function AccommodationInfo({ accommodation: {
  blockedDouble, costDouble, blockedSingle, costSingle, blockedUntil, distance, url, name, contentHtml
} }: Props): ReactElement {
  const isBlocked = blockedUntil && dayjs(blockedUntil) > dayjs();

  return (
    <div>
      <h3>
        <a href={url} target="_blank" rel="noreferrer">{name}</a>
      </h3>
      <p>
        {isBlocked && (
          <>Reserved until: <strong>{dayjs(blockedUntil).format('LL')}</strong>{distance && <br/>}</>
        )}
        {distance && <>Distance to Castle: {distance}m ({Math.round(distance * 3.28084)}ft)</>}
      </p>
      {(costDouble || costSingle) &&
        <table className={styles.roomsTable}>
          <thead>
            <tr>
              <th></th>
              {isBlocked && (blockedDouble || blockedSingle) && (
                <th className={styles.numberCol}>Rooms</th>
              )}
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {costDouble && <tr>
              <td>Double Rooms</td>
              {isBlocked && blockedDouble && <td>{blockedDouble}</td>}
              <td>€ {costDouble}</td>
            </tr>}
            {costSingle && <tr>
              <td>Single Rooms</td>
              {isBlocked && blockedSingle && <td>{blockedSingle}</td>}
              <td>€ {costSingle}</td>
            </tr>}
          </tbody>
        </table>
      }
      <div className={styles.details} dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}

export default AccommodationInfo;
