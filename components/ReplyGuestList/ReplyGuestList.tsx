import GuestReplyForm from "../GuestReplyForm";
import useCollectionDocsData from "../../firebase/hooks/useCollectionDocsData";
import { Guest } from "../../firebase/types";
import { FunctionComponent } from "react";

interface Props {
  inviteId: string;
}

const ReplyGuestList: FunctionComponent<Props> = ({ inviteId }) => {
  const { loading, data: guests } = useCollectionDocsData<Guest>({
    collection: "guests",
    query: {
      field: "inviteId",
      operator: "==",
      value: inviteId,
    },
  });

  return (
    <>
      {loading && "Loading..."}

      {!loading &&
        guests &&
        (guests.length ? (
          guests.map((guest) => <GuestReplyForm guest={guest} key={guest.id} />)
        ) : (
          <>Sorry, no invite was found with this ID</>
        ))}
    </>
  );
};

export default ReplyGuestList;
