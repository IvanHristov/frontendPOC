import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  cleanup,
  waitFor
} from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import ContactOverview from "../components/contacts/ContactsOverview";
import {
  GetContactsDocument,
  DeleteContactDocument,
  ContactCreatedDocument,
  ContactUpdatedDocument,
  ContactDeletedDocument
} from "../generated/graphql";
import { ApolloProvider } from "@apollo/react-hooks";
import { act } from "react-dom/test-utils";

const mocks = [
  {
    request: {
      query: GetContactsDocument
    },
    result: {
      data: {
        result: [
          {
            id: "14",
            first_name: "3van",
            last_name: "Hristov",
            email: "i.hristovv95@gmail.com",
            __typename: "Contact",
            company: {
              __typename: "Company",
              id: "1",
              company_name: "dobre sa"
            }
          },
          {
            id: "17",
            first_name: "ivancho",
            last_name: "Hristov",
            email: "i.hristov95@gmail.com",
            __typename: "Contact",
            company: {
              __typename: "Company",
              id: "2",
              company_name: "dobre sa"
            }
          }
        ]
      }
    }
  },
  {
    request: {
      query: ContactCreatedDocument
    },
    result: {
      data: {
        result: [
          {
            id: "17",
            first_name: "ivancho",
            last_name: "Hristov",
            email: "i.hristov95@gmail.com",
            __typename: "Contact",
            company: {
              __typename: "Company",
              id: "2",
              company_name: "dobre sa"
            }
          }
        ]
      }
    }
  },
  {
    request: {
      query: ContactUpdatedDocument
    },
    result: {
      data: {
        result: [
          {
            id: "17",
            first_name: "ivancho",
            last_name: "Hristov",
            email: "i.hristov95@gmail.com",
            __typename: "Contact",
            company: {
              __typename: "Company",
              id: "2",
              company_name: "dobre sa"
            }
          }
        ]
      }
    }
  },
  {
    request: {
      query: ContactDeletedDocument
    },
    result: {
      data: {
        result: [
          {
            id: "17",
            first_name: "ivancho",
            last_name: "Hristov",
            email: "i.hristov95@gmail.com",
            __typename: "Contact",
            company: {
              __typename: "Company",
              id: "2",
              company_name: "dobre sa"
            }
          }
        ]
      }
    }
  },
  {
    request: {
      query: DeleteContactDocument,
      variables: { input: { id: "17" } }
    },
    result: jest.fn(() => ({
      data: {
        result: [
          {
            id: "17",
            first_name: "ivancho",
            last_name: "Hristov",
            email: "i.hristov95@gmail.com",
            __typename: "Contact",
            company: {
              __typename: "Company",
              id: "2",
              company_name: "dobre sa"
            }
          }
        ]
      }
    }))
  }
];

afterEach(cleanup);

const client = new ApolloClient({
  link: ApolloLink.from([]),
  cache: new InMemoryCache()
});

describe("<ContactOverview />", () => {
  test("shoud render contacts", async () => {
    const { findByTestId } = render(
      <ApolloProvider client={client}>
        <MockedProvider mocks={mocks}>
          <ContactOverview path="/" />
        </MockedProvider>
      </ApolloProvider>
    );

    const newContactButton = await findByTestId("new-contact-button");
    expect(newContactButton.textContent).toEqual("New Contact");

    const contactTableBody = await findByTestId("cotacts-table-body");
    expect(contactTableBody.children.length).toEqual(2);
  });

  test("shoud delete contact", async () => {
    const { findByTestId } = render(
      <ApolloProvider client={client}>
        <MockedProvider mocks={mocks}>
          <ContactOverview path="/" />
        </MockedProvider>
      </ApolloProvider>
    );

    const deleteButton = await findByTestId("cotact-delete-button-17");
    await waitFor(() => fireEvent.click(deleteButton));
    expect(mocks[4].result).toHaveBeenCalled();

    const contactTableBody = await findByTestId("cotacts-table-body");
    expect(contactTableBody.children.length).toEqual(1);
  });
});
