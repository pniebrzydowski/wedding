import React, { FunctionComponent } from "react";
import { Guest } from "../../firebase/types";

interface Props {
  guest: Guest;
}

const GuestReplyForm: FunctionComponent<Props> = ({
  guest: { attending, name, dietaryNeeds, songRequest },
}) => (
  <li>
    <p>
      {name} - {attending}
    </p>
    <div>
      <label htmlFor="dietaryNeeds">Dietary Needs</label>
      <textarea>{dietaryNeeds}</textarea>
    </div>
    <div>
      <label htmlFor="songRequest">Song Request</label>
      <textarea>{songRequest}</textarea>
    </div>
  </li>
);

export default GuestReplyForm;
