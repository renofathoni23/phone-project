import { gql, useQuery } from "@apollo/react-hooks";

export const GET_CONTACT_LIST = gql`
  query GetContactList(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

export const useContacts = (limit: number, offset: number, skip: boolean) => {
  const { data, error, loading } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: limit,
      offset: offset * limit,
      order_by: [{ first_name: "asc" }],
    },
    skip: skip,
    fetchPolicy: "cache-and-network",
  });

  return { data, error, loading };
};
