import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum ICacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type ICompany = {
   __typename?: 'Company';
  id: Scalars['ID'];
  company_name: Scalars['String'];
};

export type ICompanyInput = {
  id?: Maybe<Scalars['ID']>;
  company_name?: Maybe<Scalars['String']>;
};

export type IContact = {
   __typename?: 'Contact';
  id: Scalars['ID'];
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  company?: Maybe<ICompany>;
};

export type IContactInput = {
  id?: Maybe<Scalars['ID']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  company_id?: Maybe<Scalars['Int']>;
};

export type IMutation = {
   __typename?: 'Mutation';
  createContact: IContact;
  updateContact: Array<Maybe<IContact>>;
  deleteContact: Array<Maybe<IContact>>;
  createCompany: ICompany;
  updateCompany: Array<Maybe<ICompany>>;
  deleteCompany: Array<Maybe<ICompany>>;
};


export type IMutationCreateContactArgs = {
  input: INewContactInput;
};


export type IMutationUpdateContactArgs = {
  input: INewContactInput;
  filter: IContactInput;
};


export type IMutationDeleteContactArgs = {
  input: IContactInput;
};


export type IMutationCreateCompanyArgs = {
  input: INewCompanyInput;
};


export type IMutationUpdateCompanyArgs = {
  input: INewCompanyInput;
  filter: ICompanyInput;
};


export type IMutationDeleteCompanyArgs = {
  input: ICompanyInput;
};

export type INewCompanyInput = {
  company_name: Scalars['String'];
};

export type INewContactInput = {
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  company_id?: Maybe<Scalars['Int']>;
};

export type IQuery = {
   __typename?: 'Query';
  contacts: Array<Maybe<IContact>>;
  contact: IContact;
  companies: Array<Maybe<ICompany>>;
  company: ICompany;
};


export type IQueryContactsArgs = {
  input?: Maybe<IContactInput>;
};


export type IQueryContactArgs = {
  input: IContactInput;
};


export type IQueryCompaniesArgs = {
  input?: Maybe<ICompanyInput>;
};


export type IQueryCompanyArgs = {
  input: ICompanyInput;
};


export type IContactsQueryVariables = {};


export type IContactsQuery = (
  { __typename?: 'Query' }
  & { result: Array<Maybe<(
    { __typename?: 'Contact' }
    & Pick<IContact, 'id' | 'first_name' | 'last_name' | 'email'>
    & { company?: Maybe<(
      { __typename?: 'Company' }
      & Pick<ICompany, 'company_name'>
    )> }
  )>> }
);


export const ContactsDocument = gql`
    query Contacts {
  result: contacts {
    id
    first_name
    last_name
    email
    company {
      company_name
    }
  }
}
    `;
export type ContactsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<IContactsQuery, IContactsQueryVariables>, 'query'>;

    export const ContactsComponent = (props: ContactsComponentProps) => (
      <ApolloReactComponents.Query<IContactsQuery, IContactsQueryVariables> query={ContactsDocument} {...props} />
    );
    
export type IContactsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<IContactsQuery, IContactsQueryVariables>
    } & TChildProps;
export function withContacts<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  IContactsQuery,
  IContactsQueryVariables,
  IContactsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, IContactsQuery, IContactsQueryVariables, IContactsProps<TChildProps, TDataName>>(ContactsDocument, {
      alias: 'contacts',
      ...operationOptions
    });
};
export type ContactsQueryResult = ApolloReactCommon.QueryResult<IContactsQuery, IContactsQueryVariables>;