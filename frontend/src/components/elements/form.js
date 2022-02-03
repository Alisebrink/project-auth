import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding:2rem 3rem;
`;

export const FormButton = styled.button`
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  color: white;
  background: #fc4f4f;
  margin: 10px;
  cursor:pointer;
  :hover {
    background:#dc3c3c;
    transition:.2s;
  }
  :disabled {
    background:#b87373;
  }
`;

export const FormLabel = styled.label`
  font-weight: 600;
  margin-bottom:5px;
`;

export const FormInput = styled.input`
margin-bottom:10px;
border:none;
background:#eeeeec;
padding:5px 15px;
border-radius:5px;`