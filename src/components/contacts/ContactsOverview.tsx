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
  IContactInput,
  ContactDeletedDocument
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
          if (result.findIndex(c => c?.id === newContact.id) === -1) {
            cache.writeQuery({
              query: GetContactsDocument,
              data: { result: [newContact, ...result] }
            });
          }
        }
      }
    }
  });

  const [deleteContact] = useDeleteContactMutation({
    update(cache, res) {
      if (res.data) {
        const dContacts = res.data.result;
        if (dContacts.length && dContacts[0]) {
          const currentContact: IContact = dContacts[0];
          const { result } = cache.readQuery({
            query: GetContactsDocument
          }) as IGetContactsQuery;
          const newResult = result.filter(c => c?.id !== currentContact.id);
          cache.writeQuery({
            query: GetContactsDocument,
            data: { result: [...newResult] }
          });
        }
      }
    }
  });

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
        return prev;
      }
    });

    subscribeToMore({
      document: ContactDeletedDocument,
      updateQuery: (prev, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const deletedContact: IContact = subscriptionData.data.result;
        const result = prev.result.filter(p => p?.id !== deletedContact?.id);
        return { result };
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
    deleteContact({
      variables: { input: { id: input.id } },
      optimisticResponse: {
        __typename: "Mutation",
        result: [
          {
            __typename: "Contact",
            id: input.id ? input.id : "dasdas",
            first_name: input.first_name,
            last_name: input.last_name,
            email: input.email,
            company: {
              __typename: "Company",
              company_name: "hahaha"
            }
          }
        ]
      }
    });
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
