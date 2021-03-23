import { useState } from 'react';
import firebase from './firebase';
import styled  from 'styled-components';
import {ReactComponent as UserX } from './icons/bxs-user-x.svg'
import { useHistory } from 'react-router-dom';
const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err,setErr] = useState("");
    const [loading,setLoading] = useState(false);
    const history = useHistory();  
    
    if(firebase.getCurrentUser()){
        history.replace('/admin');
        return null
    }
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        setErr("");
        try {
           await firebase.login(username,password);
           setLoading(false);
           history.replace("/admin")
        }
        catch(error){
           setLoading(false)
           switch(error.code){
               case "auth/invalid-email" :
               case "auth/wrong-password" :
                            setErr("Username or Password incorrect");
                            break;
               case "auth/user-not-found" :
                            setErr("We dont see you here");
                            break;
           }
        }
    }
    return (
        <LoginContainer>
            <LoginInnerContainer>
                <h2>Welcome,</h2>
                <h1>Log in to Dokobus</h1>
                <ErrorMsg style = {{display : err === "" ? "none" : "block" }}>
                    <ErrorMsgContainer>
                        <UserX />
                        <ErrMsg>
                            {err}
                        </ErrMsg>
                    </ErrorMsgContainer>
                </ErrorMsg>
                <form onSubmit = {handleSubmit}>
                    <FormInput 
                        required
                        placeholder = "Username" 
                        type="text"
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                    />
                    <FormInput 
                         required
                         placeholder = "Password" 
                         type="password"
                         value = {password}
                         onChange = {(e) => setPassword(e.target.value)}
                    />
                    <FormBtn type = 'submit'>
                        <LoaderIcon 
                            style = {{opacity:loading ? 1:0 , visibility: loading ? 'visible':'hidden'}}
                        />
                        {loading ? 'Logging In':'Log In'}
                    </FormBtn>
                </form>
            </LoginInnerContainer>
        </LoginContainer>
     );
}

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

const LoginContainer = styled.div`
    width:100%;
    height:100vh;
`
const LoginInnerContainer = styled.div`
    max-width:500px;
    margin : 0 auto; 
    
    > h1{
        font-weight:600;
    }
    > h2{
        font-weight:500;
    }
   
    padding : 50px 24px 24px 24px ; 
    > form{
        margin-top:24px;
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
export default Login;