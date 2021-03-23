import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import firebase from "../firebase"
import {ReactComponent as UploadImageIcon} from '../icons/bxs-image-add.svg'
import DefaultImageIcon from '../icons/user-circle-solid-84.png'
import Image from "../styled/Image"
import {Avatar} from "../styled/Avatar"
const AddDriverForm = ({toggle}) => {
    const [driverID,setDriverID] = useState("");
    const [driverName,setDriverName] = useState("");
    const [driverContactNumber,setDriverContactNumber] = useState("");
    const [driverDisplayImage,setDriverDisplayImage] = useState();
    const [imagePreview,setImagePreview] = useState("");
    const driverImageUploadRef = useRef(null);

    const [loading,setLoading] = useState(false);


    useEffect(()=>{
        if(driverDisplayImage){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(driverDisplayImage)
        }
        else{
            setImagePreview("")
        }
    },[driverDisplayImage])
    // reset Form Inputs
    useEffect(()=>{
        setDriverID("");
        setDriverName("")
        setDriverContactNumber("")
        setImagePreview("")
        
    },[toggle])

    async function AddNewDriver(e){
        e.preventDefault()
        setLoading(true)
        console.log(loading)
        try {
            await firebase.AddNewDriver({driverID,driverName,driverContactNumber,imagePreview}).then();
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
        console.log(loading)
    }
    
    return ( 
        <AddDriverContainer style = {{display: toggle ? "block":"none"}}>
            <AddDriverFormContainer>
                <h1>Add a new driver</h1>               
                <AddForm onSubmit = {AddNewDriver}>
                    <ImageUpload>
                        <Avatar size = {100}>
                            <Image className = "responsive-img" src={imagePreview === "" ? DefaultImageIcon : imagePreview} alt="Display Preview Image"/>
                        </Avatar>
                        <button
                            onClick = {(e) => {
                                e.preventDefault();
                                driverImageUploadRef.current.click();
                            }}
                        >
                            <UploadImageIcon/>
                        </button>
                        <FormUploadInput 
                            ref =  {driverImageUploadRef}
                            type = 'file'
                            accept ="image/*"
                            onChange = {(e) => {
                                const file = e.target.files[0];
                                if(file && file.type.substring(0,5)==='image'){
                                    setDriverDisplayImage(file);
                                }
                                else{
                                    setDriverDisplayImage("")
                                }
                            }}
                        />
                    </ImageUpload>
                    <FormInput 
                        required
                        type="text"
                        placeholder = "Driver-ID"
                        value = {driverID}
                        onChange ={(e) => setDriverID(e.target.value)}
                    />
                    <FormInput 
                        required
                        type="text"
                        value = {driverName}
                        placeholder = "Driver Name"
                        onChange ={(e) => setDriverName(e.target.value)}
                    />
                    <FormInput 
                            type ='tel'
                            required
                            value = {driverContactNumber}
                            placeholder = "Mobile Number"
                            pattern="[0-9]{10}"
                            maxlength="10"
                            onChange ={(e) => setDriverContactNumber(e.target.value)}
                    />
                    
                    <FormBtn type = 'submit'>
                        <LoaderIcon 
                            style = {{opacity:loading ? 1:0 , visibility: loading ? 'visible':'hidden'}}
                        />
                        {loading ? 'Adding Driver..':'Add Driver'}
                    </FormBtn>
                </AddForm>
            </AddDriverFormContainer>
        </AddDriverContainer>
     );

}
export default AddDriverForm;


const ImageUpload = styled.div`
    position:relative;
    width:100px;
    > button{
        all:unset;
        width:30px;
        height:30px;
        background-color:#FF8000;
        position:absolute;
        top:0;
        cursor:pointer;
        border-radius:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        & svg{
            width:18px;
            height:18px;
            fill:#fff;
        }
    }

`
const AddDriverContainer = styled.div`
    display:none;
    position:absolute;
    top:50px;
    right:16px;
    width:400px;
    box-shadow: 0 0 16px rgba(101, 101, 101, 0.25);  
    border-radius:8px;
`
const AddDriverFormContainer = styled.div`
    padding:24px;
    border-radius:8px;
    background-color:#fff;
`
const AddForm = styled.form`
`

const FormInput = styled.input`
            display: block;
            padding:14px;
            margin-top:24px;
            font-size : 16px;
            width:100%
    
`
const FormUploadInput = styled.input.attrs(props => ({type:'file'}))`
            display: none;
            padding:14px;
            font-size : 16px;
            width:100%;
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