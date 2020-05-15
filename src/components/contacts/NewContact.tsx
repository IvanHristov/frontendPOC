import React, { useState } from "react";

interface IP {
  onSubmit: Function;
  onCancel: Function;
}

const NewContact: React.FunctionComponent<IP> = ({ onSubmit, onCancel }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ first_name, last_name, email });
  };

  const cancel = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <div className="new-pet page">
      <h1>New Contact</h1>
      <div className="box">
        <form onSubmit={submit}>
          <input
            className="input"
            type="text"
            placeholder="first name"
            value={first_name}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="last name"
            value={last_name}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="first name"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <br />
          <a className="error button" onClick={cancel}>
            Cancel
          </a>
          <button type="submit" name="submit">
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewContact;
