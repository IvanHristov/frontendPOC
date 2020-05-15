import gql from "graphql-tag";
const CONTACT_DETAILS = gql`
  fragment ContactDetails on Contact {
    id
    first_name
    last_name
    email
    company {
      company_name
    }
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

const ADD_CONTACT = gql`
  mutation CreateContact($input: NewContactInput!) {
    result: createContact(input: $input) {
      ...ContactDetails
    }
  }
  ${CONTACT_DETAILS}
`;

export { GET_CONTACTS, ADD_CONTACT };
