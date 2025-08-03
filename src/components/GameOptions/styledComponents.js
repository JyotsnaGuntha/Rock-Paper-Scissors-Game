import styled from 'styled-components'

export const OptionImage = styled.img`
  width: 170px;
  height: 170px;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`

export const OptionListItem = styled.li`
  list-style-type: none;
  display: flex;
  margin: 10px;
`

export const GameOptionButton = styled.button`
  outline: none;
  cursor: pointer;
  background-color: transparent;
  border: 3px solid transparent;
  border-radius: 50%;
  padding: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #fbbf24;
    transform: scale(1.1);
  }
  
  &:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.3);
  }
  
  &:hover ${OptionImage} {
    transform: scale(1.05);
  }
`
