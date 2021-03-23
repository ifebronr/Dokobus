import { useHistory} from "react-router-dom";
import { useState} from "react";
import styled from "styled-components"
import firebase from "./firebase";
import Image from "./styled/Image";
import {Avatar, AvatarInformation} from "./styled/Avatar";
import {ReactComponent as UserDefaultIcon } from './icons/bxs-user-circle.svg'
import {ReactComponent as PhoneIcon} from "../components/icons/bxs-phone.svg";
import {ReactComponent as UserBadgeIcon} from "../components/icons/bxs-user-badge.svg";
const Profile = ({user}) => {
    
  const users = firebase.db.collection("users");
    const history = useHistory();
    const [dropMenuOpen ,setDropMenuOpen] = useState(false);
    async function handleLogout(){
      if(firebase.getCurrentUser()){
        await firebase.logout();
        history.replace('/login')
      }
    }
   const handleLogin  = (e) =>{
    e.preventDefault();
    history.replace('/login');
   }
    return (
        user ? 
        <ProfileWrapper>
          {console.log(user)}
          <ProfileIcon onClick = {() =>{setDropMenuOpen(!dropMenuOpen)}} ><UserDefaultIcon /></ProfileIcon>
          <ProfileDropMenu style = {{display : dropMenuOpen ? "block":"none"}}>
            <ProfileDropMenuWrapper>
              <Avatar size = {60}>
                  <Image 
                          src= {user.displayImage ? user.displayImage :UserDefaultIcon} 
                          alt={`${user.name}'s Photo`} />
              </Avatar>
              <AvatarInformation>
                  <p>{user.displayName}</p>
                  <p><span><UserBadgeIcon/>  { user.username}</span><span><PhoneIcon />{user.contactNumber}</span></p>
              </AvatarInformation>
              <SignInBtn onClick = {handleLogout}>Sign Out</SignInBtn>
            </ProfileDropMenuWrapper>
          </ProfileDropMenu>
        </ProfileWrapper> : 
        <SignInBtn onClick = {(e) =>{handleLogin(e)}}>Sign In</SignInBtn>
        
      );
}

export default Profile


const ProfileWrapper = styled.div`
    display:flex;
    align-items:center;
    gap:8px;
    position:relative;
`;
const UserDetails = styled.div`
    padding:14px;
`
const UserDisplayPicture = styled.div`
    width:50px;
    height:50px;
    & svg {
      width:50px;
      height:50px;
      fill:#333333;
    }
`;


const ProfileDropMenu = styled.div`
  display: "none";
  position:absolute;
  top:50px;
  left : -260px;
  z-index:10;
  background:#FFF;
  border-radius: 8px;
  box-shadow: 0 0 16px rgba(101, 101, 101, 0.25);
  width:300px;
`
const ProfileDropMenuWrapper = styled.ul``
const ProfileDropMenuItem = styled.li``
const ProfileIcon = styled.button`
    all:unset;
    width: 42px;
    height: 42px;
    display:flex;
    align-items:center;
    justify-content: center;
    border-radius: 40px;
    cursor:pointer;
    & svg {
      width:42px;
      height:42px;
      fill:#333333;
    }
`;
const SignInBtn = styled.button`
    all:unset;
    cursor: pointer;
    display:inline;
    height:42px;
    color:#333333;
    background:#FFF;
    padding: 0 16px;
    border-radius: 100px;
    font-size:16px;
    box-shadow: 0 0 16px rgba(101, 101, 101, 0.25);   
    transition : all 0.1s cubic-bezier(.17,.67,.9,.55);
    &:active{
      transform:scale(0.95);
    }
 `
