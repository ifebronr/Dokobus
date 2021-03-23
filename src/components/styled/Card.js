import styled from 'styled-components';

const Card = styled.li`
    box-shadow: 0 0 16px rgba(101, 101, 101, 0.25);  
    background-color:white;
    border-radius:8px;
    padding:12px 16px;
    max-width:350px;
    flex: 1 0 340px;
`
const CardWrapper = styled.div`
    display:flex;
    gap:16px;
    align-items:center;
`

export {Card , CardWrapper}