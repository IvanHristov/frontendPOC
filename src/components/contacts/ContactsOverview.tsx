import React, { useState, FunctionComponent, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import Loader from "../Loader";

import {
  INewContactInput,
  IGetContactsQuery,
  useGetContactsQuery,
  useCreateContactMutation,
  IContact,
  GetContactsDocument,
  ContactCreatedDocument,
  ContactUpdatedDocument,
  useDeleteContactMutation,
  IContactInput
} from "../../generated/graphql";

import ContactsTable from "./ContactsTable";
import NewContact from "./NewContact";

const ContactsOverview: FunctionComponent<RouteComponentProps> = () => {
  const [modal, setModal] = useState(false);
  const { data, loading, error, subscribeToMore } = useGetContactsQuery();
  const [createContact, newContact] = useCreateContactMutation({
    update(cache, res) {
      if (res.data) {
        const newContact: IContact = res.data.result;
        const { result } = cache.readQuery({
          query: GetContactsDocument
        }) as IGetContactsQuery;
        if (result) {
          cache.writeQuery({
            query: GetContactsDocument,
            data: { result: [newContact, ...result] }
          });
        }
      }
    }
  });

  const [deleteContact, deletedContact] = useDeleteContactMutation();

  useEffect(() => {
    subscribeToMore({
      document: ContactCreatedDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newContact = subscriptionData.data.result;

        return Object.assign({}, prev, {
          result: [newContact, ...prev.result]
        });
      }
    });

    subscribeToMore({
      document: ContactUpdatedDocument,
      updateQuery: (prev, newData) => {
        console.log("prev", prev);
        console.log("newData", newData);
        return prev;
      }
    });
  }, []);

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

  const onDeleteContact = (input: IContactInput) => {
    console.log("in delete", input);
    deleteContact({ variables: { input } });
  };

  console.log("rerender");
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
      <div className="col-xs-2">
        <button onClick={() => setModal(true)}>New Contact</button>
      </div>
      {data && data.result ? (
        <ContactsTable
          onDelete={onDeleteContact}
          result={data.result as IContact[]}
        />
      ) : null}
    </div>
  );
};

export default ContactsOverview;
