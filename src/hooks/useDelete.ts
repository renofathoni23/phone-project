import { useMutation, gql } from "@apollo/react-hooks";

export const DELETE_CONTACT = gql`
  mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

export const useDelete = () => {
  const [deleteContactMutation, { data, error, loading }] =
    useMutation(DELETE_CONTACT);

  return { deleteContactMutation, data, error, loading };
};
