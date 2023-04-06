import { useAddNewUserMutation } from "./usersApiSlice";
import { useState, useEffect } from "react";
import { ROLES } from "../../config/roles";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import useTitle from "../../hooks/useTitle";

const USER_REGEX = /^[A-z]{3,24}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{8,24}$/;

const NewUserForm = () => {
  useTitle("New User");
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUsername, setvalidUsername] = useState(false);
  const [validPwd, setvalidPwd] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setvalidUsername(USER_REGEX.test(username));
  }, [username]);
  useEffect(() => {
    setvalidPwd(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePwdChange = (e) => setPassword(e.target.value);

  const handleRolesChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validUsername, validPwd].every(Boolean) && !isLoading;

  const handleSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {[role]}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass =
    username && !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = password && !validPwd ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const content = (
    <>
      <p className={`${errClass}`}>{error?.data?.message}</p>
      <form className="form" onSubmit={handleSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={handleUsernameChange}
        />
        <label className="form__label" htmlFor="password">
          Password:<span className="nowrap">[6,12 char incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePwdChange}
        />
        <label className="form__label" htmlFor="roles">
          Assgined Roles
        </label>
        <select
          className={`form__select ${validRolesClass}`}
          id="roles"
          name="roles"
          multiple={true}
          size="3"
          value={roles}
          onChange={handleRolesChange}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};

export default NewUserForm;
