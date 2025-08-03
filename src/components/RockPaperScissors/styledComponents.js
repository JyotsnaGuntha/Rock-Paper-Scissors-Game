import styled, {keyframes} from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const AppContainer = styled.div`
  background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

export const ResultContainer = styled.div`
  padding: 25px;
  border: 3px solid #ffffff;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.6s ease-out;
`

export const Option = styled.h1`
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  padding: 20px 35px;
  border-radius: 15px;
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1),
              inset -5px -5px 10px rgba(255, 255, 255, 0.8);
  
  .streak {
    color: #fbbf24;
    font-size: 12px;
    margin-top: 5px;
  }
`

export const ScorePhrase = styled.p`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  color: #223a5f;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const ScoreNumber = styled.p`
  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  color: #223a5f;
  margin: 5px 0 0 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`

export const GameStatsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 20px 0;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`

export const StatValue = styled.span`
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
`

export const StatLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const GameViewContainer = styled.div`
  width: 90%;
  max-width: 600px;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const GameOptionsList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

export const LoadingText = styled.div`
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: ${pulse} 1s infinite ease-in-out;
  
  &::after {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #ffffff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-left: 10px;
    vertical-align: middle;
  }
`

export const TriggerButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  color: #223a5f;
  padding: 12px 20px;
  margin: 8px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.8);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 7px 7px 15px rgba(0, 0, 0, 0.3),
                -7px -7px 15px rgba(255, 255, 255, 0.9);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                inset -3px -3px 6px rgba(255, 255, 255, 0.8);
  }
`

export const SoundToggleButton = styled.button`
  font-size: 24px;
  padding: 10px;
  margin: 8px;
  background: ${props =>
    props.soundEnabled ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  backdrop-filter: blur(10px);
  border: 2px solid ${props =>
    props.soundEnabled ? '#22c55e' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`

export const PopupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`

export const CloseButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  background: rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #ef4444;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: scale(1.1);
  }
`

export const PopUpImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
`

export const PopUpBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
`

export const GameResultViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
`

export const SelectedOptionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-bottom: 30px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 20px;
  }
`

export const GameUserOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

export const GameParticipantText = styled.p`
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const GameParticipantChoiceImage = styled.img`
  width: 170px;
  height: 170px;
  object-fit: contain;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
  }
`

export const ResultText = styled.p`
  color: ${props => (props.isWin ? '#10b981' : '#ffffff')};
  font-size: 32px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin: 20px 0;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${props => (props.isWin ? pulse : 'none')} 1s ease-in-out 3;
  
  @media (max-width: 480px) {
    font-size: 24px;
  }
`

export const PlayAgainButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  color: white;
  padding: 15px 30px;
  margin: 20px 0;
  background: linear-gradient(145deg, #10b981, #059669);
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
  
  &:hover {
    background: linear-gradient(145deg, #059669, #047857);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3);
  }
`

// Add these to your existing styledComponents.js file

export const AutoPlayToggleButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  color: ${props => (props.autoPlay ? '#ffffff' : '#223a5f')};
  padding: 10px 15px;
  margin: 8px;
  background: ${props =>
    props.autoPlay
      ? 'linear-gradient(145deg, #10b981, #059669)'
      : 'linear-gradient(145deg, #ffffff, #e6e6e6)'};
  border: 2px solid ${props => (props.autoPlay ? '#10b981' : 'transparent')};
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${props =>
    props.autoPlay
      ? '0 5px 15px rgba(16, 185, 129, 0.3)'
      : '5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.8)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props =>
      props.autoPlay
        ? '0 8px 25px rgba(16, 185, 129, 0.4)'
        : '7px 7px 15px rgba(0, 0, 0, 0.3), -7px -7px 15px rgba(255, 255, 255, 0.9)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`

export const NextRoundButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  color: rgba(255, 255, 255, 0.7);
  padding: 15px 30px;
  margin: 20px 0;
  background: linear-gradient(145deg, #6b7280, #4b5563);
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: not-allowed;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  opacity: 0.8;
`
