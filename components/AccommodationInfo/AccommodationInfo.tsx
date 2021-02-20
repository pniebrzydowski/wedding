import { ReactElement } from 'react';

interface StaticContent {
  contentHtml: string;
}

interface AccommodationData extends StaticContent {
  blockedDouble: number;
  costDouble: number;
  blockedSingle: number;
  costSingle: number;
  url: string;
  name: string;
  blockedUntil: string;
}

interface Props {
  accommodation: AccommodationData;
}

function AccommodationInfo({ accommodation }: Props): ReactElement {
  const totalRooms = accommodation.blockedDouble + accommodation.blockedSingle;
  const totalBeds =
    accommodation.blockedDouble * 2 + accommodation.blockedSingle;

  return (
    <div>
      <h2>
        <a href={accommodation.url}>{accommodation.name}</a>
      </h2>
      <h3>Blocked Rooms</h3>
      <p>
        At {accommodation.name}, we have a block of {totalRooms} rooms with a
        total of {totalBeds} reserved until {accommodation.blockedUntil}, at the
        following prices:
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Amount</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Double Rooms</td>
            <td>{accommodation.blockedDouble}</td>
            <td>{accommodation.costDouble}</td>
          </tr>
          <tr>
            <td>Double Rooms</td>
            <td>{accommodation.blockedSingle}</td>
            <td>{accommodation.costSingle}</td>
          </tr>
        </tbody>
      </table>
      <div dangerouslySetInnerHTML={{ __html: accommodation.contentHtml }} />
    </div>
  );
}

export default AccommodationInfo;
