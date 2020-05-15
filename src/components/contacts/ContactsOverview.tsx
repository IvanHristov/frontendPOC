import React, { useState, FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../Loader";

import { INewContactInput, IContactsQuery } from "../../generated/graphql";

import { GET_CONTACTS, ADD_CONTACT } from "../graphql/contacts";
import ContactsTable from "./ContactsTable";
import NewContact from "./NewContact";

const ContactsOverview: FunctionComponent<RouteComponentProps> = () => {
  const [modal, setModal] = useState(false);
  const { loading, error, data } = useQuery<IContactsQuery>(GET_CONTACTS);
  const [createContact, newContact] = useMutation(ADD_CONTACT, {
    update(cache, { data: { result: newContact } }) {
      const { result } = cache.readQuery({
        query: GET_CONTACTS
      }) as IContactsQuery;

      cache.writeQuery({
        query: GET_CONTACTS,
        data: { result: [newContact, ...result] }
      });
    }
  });
  const onSubmit = (input: INewContactInput) => {
    setModal(false);
    createContact({
      variables: { input },
      optimisticResponse: {
        __typename: "Mutation",
        result: {
          __typename: "Contact",
          id: Math.round(Math.random() * -1000000) + "",
          first_name: input.first_name,
          last_name: input.last_name,
          email: input.email,
          company: {
            __typename: "Company",
            company_name: "hahaha"
          }
        }
      }
    });
  };

  if (loading) {
    return <Loader />;
  }
  if (error || newContact.error) {
    return <h1>ERROR</h1>;
  }

  if (modal) {
    return <NewContact onSubmit={onSubmit} onCancel={() => setModal(false)} />;
  }

  return (
    <div>
      {/* {loading ? <Loader /> : null}
      {error ? <h1>ERROR</h1> : null}
      {modal ? <h1>New Contact</h1> : null} */}

      <div className="col-xs-2">
        <button onClick={() => setModal(true)}>New Contact</button>
      </div>
      {data ? <ContactsTable result={data.result} /> : null}
    </div>
  );
};

export default ContactsOverview;
