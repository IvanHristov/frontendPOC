import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@material-ui/core";

import { IContact } from "../../generated/graphql";

interface IPros {
  result: IContact[];
  onDelete: Function;
}

const ContactsTable: React.FunctionComponent<IPros> = ({
  result,
  onDelete
}) => {
  const deleteContact = (input: IContact) => {
    onDelete(input);
  };

  return (
    <div>
      <h1>Contacts</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">id</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Company</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="cotacts-table-body">
            {result.map(contact => {
              if (contact) {
                return (
                  <TableRow key={contact.id}>
                    <TableCell align="left">{contact.id}</TableCell>
                    <TableCell align="left">{contact.first_name}</TableCell>
                    <TableCell align="left">{contact.last_name}</TableCell>
                    <TableCell align="left">{contact.email}</TableCell>
                    <TableCell align="left">
                      {contact.company ? contact.company.company_name : null}
                    </TableCell>

                    <TableCell align="left">
                      <Button onClick={() => deleteContact(contact)}>X</Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContactsTable;
