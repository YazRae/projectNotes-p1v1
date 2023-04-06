import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import { PulseLoader } from "react-spinners";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const NEW_NOTE_REGEX = /^\/dash\/notes\/new(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;
const NEW_USER_REGEX = /^\/dash\/users\/new(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const dashClass = [
    !DASH_REGEX.test(pathname) &&
      !USERS_REGEX.test(pathname) &&
      !NOTES_REGEX.test(pathname),
  ].every(Boolean)
    ? "dash-header__container--small"
    : null;

  const handleUsersClicked = () => navigate("/dash/users");
  const handleNewUserClicked = () => navigate("/dash/users/new");
  const handleNotesClicked = () => navigate("/dash/notes");
  const handleNewNoteClicked = () => navigate("/dash/notes/new");
  const logoutClicked = () => sendLogout();

  let usersButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      usersButton = (
        <button
          className="icon-button"
          title="Users"
          onClick={handleUsersClicked}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let newUserButton = null;
  if (isManager || isAdmin) {
    if (!NEW_USER_REGEX.test(pathname) && pathname.includes("/dash")) {
      newUserButton = (
        <button
          className="icon-button"
          title="New User"
          onClick={handleNewUserClicked}
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesButton = (
      <button
        className="icon-button"
        title="Notes"
        onClick={handleNotesClicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  let newNoteButton = null;
  if (!NEW_NOTE_REGEX.test(pathname) && pathname.includes("/dash")) {
    newNoteButton = (
      <button
        className="icon-button"
        title="New Note"
        onClick={handleNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let buttonsContent;
  if (isLoading) {
    buttonsContent = <PulseLoader color="#fff" />;
  } else {
    buttonsContent = (
      <>
        {usersButton}
        {newUserButton}
        {notesButton}
        {newNoteButton}
      </>
    );
  }

  const errClass = isError ? "errmsg" : "offscreen";

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={logoutClicked}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to={"/dash"}>
            <h1 className="dash-header__title">TechNote</h1>
          </Link>
          <nav className="dash-header__nav">
            {buttonsContent}
            {logoutButton}
          </nav>
        </div>
      </header>
    </>
  );
  return content;
};

export default DashHeader;
