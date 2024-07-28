import React, { useState } from 'react'
import styled from 'styled-components';
import TextInput from "./TextInput"
import  Button  from './Button';
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

const Container =styled.div`
width: 100%;
 max-width: 500px;
 display:flex;
 flex-direction:column;
 gap:38px;
`;
const Title =styled.div`
font-size: 30px;
font-weight:600;
color: ${({ theme }) => theme.text_primary};
`
const Span=styled.div`font-size: 16px;
font-weight: 400;
color: ${({ theme }) => theme.text_secondary + 90};`

const SignUp = () => {
 const dispatch= useDispatch();
 const [loading, setLoading]= useState(false);
 const [buttonDiasbled, setButtonDiasabled] = useState(false);
 const [name, setName]= useState("")
 const [email, setEmail]= useState("");
 const [password, setPassword]= useState("");


 const validateInputs =()=>{
  if (!name || !email || !password){
    alert("please fill all the fields");
    return false;
  }
   return true;
 }

 const handelSignUp = async () =>{
   setLoading(true);
   setButtonDiasabled(true);
   if(validateInputs()){
    await UserSignUp({name, email, password})
    .then((res)=>{
      dispatch(loginSuccess(res.data));
      alert ("Account created succesfully");
      setLoading(false);
      setButtonDiasabled(false)
    })
    .catch((err) => {
      alert (err.response.data.message);
      setLoading(false);
      setButtonDiasabled(false)
    })
   
   }
 }

  return <Container>
      <div>
        <Title>Create a new account 👀</Title>
        <Span>Please enter your details here to create a new account</Span>
      </div>
      <div style={{
        display: "flex",
        gap:"25px",
        flexDirection: "column"


      }}>
      <TextInput label="Full Name" placeholder="Enter your name here" value={name} handelChange={(e)=> setName(e.target.value)} />
<TextInput label="Email Address" placeholder="Enter your Email here" value={email} handelChange={(e) => setEmail(e.target.value)} />
<TextInput label="Password" placeholder="Enter your password" 
value={password}
handelChange={(e)=> setPassword(e.target.value)}
password
 />
 
<Button text="SignUp" onClick={handelSignUp} isLoading={loading} isDisabled={buttonDiasbled} />
      </div>
    </Container>
  
}



export default SignUp

