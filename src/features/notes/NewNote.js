import NewNoteForm from "./NewNoteForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { PulseLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle.js";

const NewNote = () => {
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  useTitle("New Note");

  if (!users?.length) return <PulseLoader color="#fff" />;

  const content = <NewNoteForm users={users} />;

  return content;
};

export default NewNote;
