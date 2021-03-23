import styled from "styled-components";
import firebase from '../firebase';
import AddDriverForm from './AddDriverForm'
import IconButton from "../styled/IconButton"
import UnorderList from "../styled/UnorderList"
import {ReactComponent as AddDriverIcon} from "../icons/bx-user-plus.svg";
import DriverDetailsCard from "./DriverDetailsCard"
import { useEffect, useState } from "react";
const Driver = () => {

    const [addDriveModal,setAddDriverModal] =useState(false);
    const [drivers,setDrivers] = useState(null);

    useEffect(async () =>{
        await firebase.db.collection("drivers").get().then((snapshot)=>{
            setDrivers(snapshot.docs)
        })
    },[])


    return ( 
        <DriverContainer>
            <DriverHeader>
                <h1>Drivers</h1>
                <IconButton onClick = {(e) => {setAddDriverModal(!addDriveModal)}}><AddDriverIcon />Add Driver</IconButton>
                <AddDriverForm  toggle = {addDriveModal}  />
            </DriverHeader>
            <UnorderList>
                {drivers === null ? "loading..":drivers.map((driver,index) => {
                    console.log(driver)
                return <DriverDetailsCard driver_id = {driver.id} driver = {driver.data()} key = {index} />
                })} 
            </UnorderList>
        </DriverContainer>
    );
}



const DriverContainer = styled.main`
   
`
const DriverHeader = styled.header`
    position:relative;
    display:flex;
    justify-content:space-between;
`
export default Driver;
