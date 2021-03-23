import styled from "styled-components"

export default styled.button`
    all:unset;
    display:flex;
    align-items:center;
    color:#FF8000;
    cursor:pointer;
    border-radius:8px;
    padding:8px 16px;
    transition : all 0.1s cubic-bezier(.17,.67,.9,.55);
    :hover{
        background-color:#F9F4F4;
    }
    :active{
        transform:scale(0.98);  
    }
    & svg{
        fill:#FF8000;
        margin-right:8px;
    }
`
