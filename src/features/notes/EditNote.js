import { useParams } from "react-router-dom";
import EditNoteFrom from "./EditNoteForm.js";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetNotesQuery } from "./notesApiSlice.js";
import useAuth from "../../hooks/useAuth.js";
import { PulseLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle.js";

const EditNote = () => {
  const { id } = useParams();

  useTitle("Edit Note");

  const { isManager, isAdmin, username } = useAuth();

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data.entities[id]),
    }),
  });
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  if (!users?.length || !note) return <PulseLoader color="#fff" />;

  if (!isManager && !isAdmin) {
    if (note.user !== username) {
      return <p className="errmsg">No Access!</p>;
    }
  }
  const content = <EditNoteFrom users={users} note={note} />;

  return content;
};

export default EditNote;
