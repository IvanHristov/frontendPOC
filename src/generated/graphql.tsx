import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
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


export type IGetContactsQueryVariables = {
  input?: Maybe<IContactInput>;
};


export type IGetContactsQuery = (
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

export type ICreateContactMutationVariables = {
  input: INewContactInput;
};


export type ICreateContactMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'Contact' }
    & Pick<IContact, 'id' | 'first_name' | 'last_name' | 'email'>
    & { company?: Maybe<(
      { __typename?: 'Company' }
      & Pick<ICompany, 'company_name'>
    )> }
  ) }
);


export const GetContactsDocument = gql`
    query GetContacts($input: ContactInput) {
  result: contacts(input: $input) {
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

/**
 * __useGetContactsQuery__
 *
 * To run a query within a React component, call `useGetContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetContactsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IGetContactsQuery, IGetContactsQueryVariables>) {
        return ApolloReactHooks.useQuery<IGetContactsQuery, IGetContactsQueryVariables>(GetContactsDocument, baseOptions);
      }
export function useGetContactsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IGetContactsQuery, IGetContactsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IGetContactsQuery, IGetContactsQueryVariables>(GetContactsDocument, baseOptions);
        }
export type GetContactsQueryHookResult = ReturnType<typeof useGetContactsQuery>;
export type GetContactsLazyQueryHookResult = ReturnType<typeof useGetContactsLazyQuery>;
export type GetContactsQueryResult = ApolloReactCommon.QueryResult<IGetContactsQuery, IGetContactsQueryVariables>;
export const CreateContactDocument = gql`
    mutation CreateContact($input: NewContactInput!) {
  result: createContact(input: $input) {
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
export type ICreateContactMutationFn = ApolloReactCommon.MutationFunction<ICreateContactMutation, ICreateContactMutationVariables>;

/**
 * __useCreateContactMutation__
 *
 * To run a mutation, you first call `useCreateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContactMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ICreateContactMutation, ICreateContactMutationVariables>) {
        return ApolloReactHooks.useMutation<ICreateContactMutation, ICreateContactMutationVariables>(CreateContactDocument, baseOptions);
      }
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>;
export type CreateContactMutationResult = ApolloReactCommon.MutationResult<ICreateContactMutation>;
export type CreateContactMutationOptions = ApolloReactCommon.BaseMutationOptions<ICreateContactMutation, ICreateContactMutationVariables>;