import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import styled from "@emotion/styled";
import { useEditNumber } from "../../hooks/useEditNumber";
import { useNavigate } from "react-router-dom";

interface Props {
  idContact: number;
  prevNumber: string;
}
const InputFields = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  outline: none;
`;

const InputContainer = styled.form`
  width: 93%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  padding: 0px;
  margin-bottom: 10px;
`;

const EditButton = styled.button`
  display: inline-block;
  padding: 8px 8px;
  background-color: #ffa500;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  display: inline-block;
  padding: 8px 8px;
  background-color: #ff0000;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  display: inline-block;
  padding: 8px 8px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`;

const ErrorMessageName = styled.p`
  color: #ff0000;
  margin-top: 0px;
`;

const EditNumberFields: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { idContact, prevNumber } = props;
  const [isEditNumber, setIsEditNumber] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (prevNumber) {
      setNewNumber(prevNumber);
    }
  }, [prevNumber]);

  const handleInputNewNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const { value } = e.target;
    setNewNumber(value);
  };

  const { editNumberMutation } = useEditNumber();

  const handleFormSubmitEditContact = async (e: FormEvent) => {
    e.preventDefault();
    const onlyNumber = /^[0-9]*$/;
    if (!onlyNumber.test(newNumber)) {
      setErrorMessage("*Enter number only");
    } else {
      try {
        await editNumberMutation({
          variables: {
            pk_columns: {
              number: prevNumber,
              contact_id: idContact,
            },
            new_phone_number: newNumber,
          },
        });
        navigate(0);
      } catch {
        setErrorMessage(
          "*The number is already in use, please enter another number"
        );
      }
    }
  };
  return (
    <>
      <InputContainer onSubmit={handleFormSubmitEditContact}>
        <InputFields
          type="text"
          name="number"
          value={newNumber}
          readOnly={!isEditNumber}
          onChange={handleInputNewNumber}
          required
        ></InputFields>
        {isEditNumber ? (
          <>
            {" "}
            <CancelButton onClick={() => setIsEditNumber(false)}>
              Cancel
            </CancelButton>
            <SaveButton type="submit">Save</SaveButton>
          </>
        ) : (
          <EditButton onClick={() => setIsEditNumber(true)}>Edit</EditButton>
        )}
      </InputContainer>
      {errorMessage && <ErrorMessageName>{errorMessage}</ErrorMessageName>}
    </>
  );
};

export default EditNumberFields;
