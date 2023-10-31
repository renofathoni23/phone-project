import { useMutation, gql } from "@apollo/react-hooks";

const DELETE_CONTACT = gql`
  mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

export const useDelete = () => {
  const [deleteContactMutation, { data, error, loading }] = useMutation(
    DELETE_CONTACT,
    { refetchQueries: ["GetContactList"] }
  );

  const deleteContact = async (id: number) => {
    try {
      const response = await deleteContactMutation({ variables: { id } });
      console.log(response);
    } catch {
      console.error(error);
    }
  };

  return { deleteContact, data, error, loading };
};
