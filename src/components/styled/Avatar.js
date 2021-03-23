import styled from "styled-components";

const Avatar =  styled.div`
    width:${props => props.size}px;
    height:${props => props.size}px;
    flex: 0 0 ${props => props.size};
    border-radius:100%;
    img {
        border-radius:100%;
    }
`
const AvatarInformation =  styled.div`
   
    p{
        display:flex;
        gap:8px;

        & svg {
            fill:#333;
            width:18px;
            height:18px;
        }
        & span{
            display:flex;
            align-items:center;
            font-size:14px;
        }
    }
    p:nth-child(1){
        font-weight:600;
        color:#FF8000;;
    }
`
export {Avatar , AvatarInformation}