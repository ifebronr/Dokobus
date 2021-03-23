import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import firebase from "./firebase";
import {ReactComponent as UserX } from './icons/bxs-user-x.svg'
const SignUp = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [displayName,setDisplayName] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [currentDepartment,setDepartment] = useState("CSE");

    const history = useHistory();
    const [loading,setLoading] = useState(false);
    const [err,setErr] = useState("");
    const hangleSignUp = async (e) => {
        setErr("")
        e.preventDefault();
        setLoading(true);
        const userSignUpDetails = {
            username : username,
            password : password,
        }
        const userDetails = {
            fullname : displayName,
            mobileNumber : phoneNumber,
            contactEmail : email,
            department: currentDepartment
        }
        try{
            await firebase.signUp(userSignUpDetails,userDetails);
            setLoading(false);
            
        }
        catch(error){
            setLoading(false)
            switch(error.code){
                case "auth/email-already-in-use" :
                            setErr("Username already in use");
                             break;
                case "auth/auth/invalid-email" :
                             setErr("Invalid username");
                             break;
            }
        }
    }
    return (
        <Container>
            <InnerContainer> 
                <h2>Welcome,</h2>
                <h1>Sign Up for Dokobus</h1>
                <ErrorMsg style = {{display : err == "" ? "none" : "block" }}>
                    <ErrorMsgContainer>
                        <UserX />
                        <ErrMsg>
                            {err}
                        </ErrMsg>
                    </ErrorMsgContainer>
                </ErrorMsg>   
                <SignUpForm onSubmit = {(e) => {hangleSignUp(e)}}>                   
                    <TwoColContainer>
                        <FormInput 
                            required
                            placeholder = "Register No"
                            type = 'text'
                            value = {username}
                            onChange = {(e) => setUsername(e.target.value)}
                        />
                        <SelectField name="department" onChange = {(e) => setDepartment(e.target.value)}>
                            {['CSE','MECH','IT','CIVIL'].map((department) =>  <option value={department} key = {department}>{department}</option>                             
                            )}
                        </SelectField>
                    </TwoColContainer>
                    <FormInput 
                            required
                            placeholder = "Password"
                            type = 'password'
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                    />
                    <FormInput 
                            required
                            placeholder = "Fullname"
                            type = 'text'
                            value = {displayName}
                            onChange = {(e) => setDisplayName(e.target.value)}
                    />                   
                    <FormInput 
                            required
                            placeholder = "Email"
                            type = 'text'
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                    />
                    <FormInput 
                            required
                            placeholder = "Mobile Number"
                            pattern="[0-9]{10}"
                            type = 'tel'
                            maxlength="10"
                            value = {phoneNumber}
                            onChange = {(e) => setPhoneNumber(e.target.value)}
                    />
                    <FormBtn type = 'submit'>
                        <LoaderIcon 
                            style = {{opacity:loading ? 1:0 , visibility: loading ? 'visible':'hidden'}}
                        />
                        {loading ? 'Logging In':'Sign Up'}
                    </FormBtn>
                </SignUpForm>
            </InnerContainer>
        </Container>
     );
}
const Container = styled.div`
    width:100%;
    height:100vh;
    
`
const InnerContainer = styled.div`
    max-width:500px;
    margin : 0 auto;
    padding : 50px 24px 24px 24px ;  
    > h1{
        font-weight:600;
    }
    > h2{
        font-weight:500;
    }
    
`
const SignUpForm = styled.form`
    margin-top:24px;
`
const TwoColContainer = styled.div`
    display:flex;
    gap:16px;
`
const SelectField = styled.select`
    display:block;
    width:100%;
    margin-top:24px;
`
const FormInput = styled.input`
            display: block;
            padding:14px;
            margin-top:24px;
            font-size : 16px;
            width:100%
`
const FormBtn = styled.button`

            cursor:pointer;
            display:flex;
            justify-content:center;
            align-items: center;
            width:100%;
            color:#fff;
            border:none;
            font-size : 16px;
            outline:none;
            padding:14px;
            margin-top:24px;
            background-color:#FF8000;
`;

const LoaderIcon = styled.div`
    
    display:inline-block;
    position:relative;
    opacity:0;
    visibility :hidden;
    width:18px;
    height:18px;
    margin-left :-45px;
    margin-right:16px;
    &:after {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        margin-top:  -3px;
        width: 18px;
        height: 18px;
        border: 3px solid transparent;
        border-left-color: white;
        border-top-color: white;
        border-radius :50% ;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: css-loader-circle 1s linear infinite;
        animation: css-loader-circle 1s linear infinite;
      }
    }
    @keyframes css-loader-circle {
        from {
            -webkit-transform: translateZ(0) rotate(0deg);
            transform: translateZ(0) rotate(0deg)
        }
        to {
            -webkit-transform: translateZ(0) rotate(360deg);
            transform: translateZ(0) rotate(360deg)
        }
    }
`
const ErrorMsg = styled.div`
    border: 1px red solid;
    
    background-color: rgba(230,57,70,0.1);
    margin-top : 24px;
    padding :8px;
`
const ErrorMsgContainer = styled.div`
   color:#E63946;
   display:flex;
   align-items:center;
   & svg {
       fill:#E63946;
   }
`
const ErrMsg = styled.div`
   font-size : 14px;
   margin-left : 8px
`
export default SignUp;