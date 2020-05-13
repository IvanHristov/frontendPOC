import React, { useState, useEffect, FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loader from "./Loader";

interface IContact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const CONTACT_DETAILS = gql`
  fragment ContactDetails on Contact {
    id
    first_name
    last_name
    email
  }
`;

const GET_CONTACTS = gql`
  query Contacts {
    result: contacts {
      ...ContactDetails
    }
  }
  ${CONTACT_DETAILS}
`;

const Contacts: FunctionComponent<RouteComponentProps> = () => {
  const contacts = useQuery(GET_CONTACTS);
  console.log(contacts);

  if (contacts.loading) return <Loader />;
  if (contacts.error) return <div>ERROR</div>;
  const contactsArray: IContact[] = contacts.data.result;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactsArray.map(contact => (
            <TableRow key={contact.id}>
              <TableCell align="left">{contact.id}</TableCell>
              <TableCell align="left">{contact.first_name}</TableCell>
              <TableCell align="left">{contact.last_name}</TableCell>
              <TableCell align="left">{contact.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Contacts;
