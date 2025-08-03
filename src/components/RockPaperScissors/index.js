import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import GameOptions from '../GameOptions'

import {
  AppContainer,
  ResultContainer,
  OptionsContainer,
  Option,
  ScoreContainer,
  ScorePhrase,
  ScoreNumber,
  GameViewContainer,
  GameOptionsList,
  PopupContainer,
  TriggerButton,
  CloseButton,
  PopUpImage,
  PopUpBody,
  GameResultViewContainer,
  SelectedOptionsContainer,
  GameUserOptionContainer,
  GameParticipantText,
  GameParticipantChoiceImage,
  ResultText,
  PlayAgainButton,
  GameStatsContainer,
  StatItem,
  StatValue,
  StatLabel,
  LoadingContainer,
  LoadingText,
  SoundToggleButton,
  AutoPlayToggleButton,
  NextRoundButton,
} from './styledComponents'

const gameStatusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
  loading: 'LOADING',
}

class RockPaperScissors extends Component {
  state = {
    score: parseInt(localStorage.getItem('rps-score'), 10) || 0,
    gamesPlayed: parseInt(localStorage.getItem('rps-games-played'), 10) || 0,
    wins: parseInt(localStorage.getItem('rps-wins'), 10) || 0,
    losses: parseInt(localStorage.getItem('rps-losses'), 10) || 0,
    draws: parseInt(localStorage.getItem('rps-draws'), 10) || 0,
    gameStatus: gameStatusConstants.inProgress,
    userChoice: '',
    gameChoice: '',
    soundEnabled: localStorage.getItem('rps-sound') !== 'false',
    autoPlay: localStorage.getItem('rps-autoplay') === 'true',
    streak: parseInt(localStorage.getItem('rps-streak'), 10) || 0,
    bestStreak: parseInt(localStorage.getItem('rps-best-streak'), 10) || 0,
    isLoading: false,
    showResultDuration: 2500, // How long to show result before auto-continuing
  }

  componentDidMount() {
    // Clear any existing timers when component mounts
    this.clearAutoPlayTimer()
  }

  componentWillUnmount() {
    // Clean up timers when component unmounts
    this.clearAutoPlayTimer()
  }

  clearAutoPlayTimer = () => {
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer)
      this.autoPlayTimer = null
    }
  }

  saveToLocalStorage = () => {
    const {score, gamesPlayed, wins, losses, draws, streak, bestStreak, autoPlay} = this.state
    localStorage.setItem('rps-score', score.toString())
    localStorage.setItem('rps-games-played', gamesPlayed.toString())
    localStorage.setItem('rps-wins', wins.toString())
    localStorage.setItem('rps-losses', losses.toString())
    localStorage.setItem('rps-draws', draws.toString())
    localStorage.setItem('rps-streak', streak.toString())
    localStorage.setItem('rps-best-streak', bestStreak.toString())
    localStorage.setItem('rps-autoplay', autoPlay.toString())
  }

  onClickSetUserChoice = id => {
    // Clear any existing auto-play timer
    this.clearAutoPlayTimer()
    
    this.setState({
      isLoading: true,
      userChoice: id,
      gameChoice: this.getGameChoice(),
    })

    // Much faster response - reduced from 1000ms to 300ms
    setTimeout(() => {
      this.setState({isLoading: false}, () => {
        this.evaluateGame()
        this.scheduleAutoPlay()
      })
    }, 300)
  }

  scheduleAutoPlay = () => {
    const {autoPlay, showResultDuration} = this.state
    
    if (autoPlay) {
      this.autoPlayTimer = setTimeout(() => {
        this.onClickGoToGameView()
      }, showResultDuration)
    }
  }

  onClickGoToGameView = () => {
    this.clearAutoPlayTimer()
    this.setState({gameStatus: gameStatusConstants.inProgress})
  }

  getGameChoice = () => {
    const {choicesList} = this.props
    const gameChoicesList = choicesList.map(choice => choice.id)
    const randomIndex = Math.floor(Math.random() * gameChoicesList.length)
    return gameChoicesList[randomIndex]
  }

  evaluateGame = () => {
    const {userChoice, gameChoice} = this.state

    if (userChoice === gameChoice) {
      this.setState(prevState => ({
        gameStatus: gameStatusConstants.draw,
        gamesPlayed: prevState.gamesPlayed + 1,
        draws: prevState.draws + 1,
        streak: 0,
      }), () => {
        this.saveToLocalStorage()
      })
    } else if (this.isUserWin(userChoice, gameChoice)) {
      this.setState(prevState => {
        const newStreak = prevState.streak + 1
        const newBestStreak = Math.max(newStreak, prevState.bestStreak)
        return {
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
          gamesPlayed: prevState.gamesPlayed + 1,
          wins: prevState.wins + 1,
          streak: newStreak,
          bestStreak: newBestStreak,
        }
      }, () => {
        this.saveToLocalStorage()
      })
    } else {
      this.setState(prevState => ({
        gameStatus: gameStatusConstants.lost,
        score: Math.max(0, prevState.score - 1),
        gamesPlayed: prevState.gamesPlayed + 1,
        losses: prevState.losses + 1,
        streak: 0,
      }), () => {
        this.saveToLocalStorage()
      })
    }
  }

  isUserWin = (userChoice, gameChoice) => {
    const winConditions = {
      ROCK: 'SCISSORS',
      PAPER: 'ROCK',
      SCISSORS: 'PAPER',
    }
    return winConditions[userChoice] === gameChoice
  }

  toggleSound = () => {
    this.setState(prevState => {
      const newSoundEnabled = !prevState.soundEnabled
      localStorage.setItem('rps-sound', newSoundEnabled.toString())
      return {soundEnabled: newSoundEnabled}
    })
  }

  toggleAutoPlay = () => {
    this.setState(prevState => {
      const newAutoPlay = !prevState.autoPlay
      localStorage.setItem('rps-autoplay', newAutoPlay.toString())
      
      // If turning off auto-play, clear any pending timer
      if (!newAutoPlay) {
        this.clearAutoPlayTimer()
      }
      // If turning on auto-play and currently showing results, schedule next round
      else if (prevState.gameStatus !== gameStatusConstants.inProgress && !prevState.isLoading) {
        this.scheduleAutoPlay()
      }
      
      return {autoPlay: newAutoPlay}
    })
  }

  resetStats = () => {
    const confirmReset = window.confirm('Are you sure you want to reset all statistics?')
    if (confirmReset) {
      this.clearAutoPlayTimer()
      this.setState({
        score: 0,
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        streak: 0,
        bestStreak: 0,
        gameStatus: gameStatusConstants.inProgress,
      }, () => {
        localStorage.removeItem('rps-score')
        localStorage.removeItem('rps-games-played')
        localStorage.removeItem('rps-wins')
        localStorage.removeItem('rps-losses')
        localStorage.removeItem('rps-draws')
        localStorage.removeItem('rps-streak')
        localStorage.removeItem('rps-best-streak')
      })
    }
  }

  renderGameInProgressView = () => {
    const {choicesList} = this.props
    return (
      <GameOptionsList>
        {choicesList.map(eachOption => (
          <GameOptions
            key={eachOption.id}
            optionDetails={eachOption}
            onClickSetUserChoice={this.onClickSetUserChoice}
          />
        ))}
      </GameOptionsList>
    )
  }

  renderLoadingView = () => (
    <LoadingContainer>
      <LoadingText>Revealing...</LoadingText>
    </LoadingContainer>
  )

  renderResultView = (resultText, isWin = false) => {
    const {gameChoice, userChoice, autoPlay, showResultDuration} = this.state
    const {choicesList} = this.props

    const userChoiceObject = choicesList.find(choice => choice.id === userChoice)
    const gameChoiceObject = choicesList.find(choice => choice.id === gameChoice)

    return (
      <GameResultViewContainer>
        <SelectedOptionsContainer>
          <GameUserOptionContainer>
            <GameParticipantText>You</GameParticipantText>
            <GameParticipantChoiceImage
              src={userChoiceObject.image}
              alt="your choice"
            />
          </GameUserOptionContainer>
          <GameUserOptionContainer>
            <GameParticipantText>Opponent</GameParticipantText>
            <GameParticipantChoiceImage
              src={gameChoiceObject.image}
              alt="opponent choice"
            />
          </GameUserOptionContainer>
        </SelectedOptionsContainer>
        <ResultText isWin={isWin}>{resultText}</ResultText>
        
        {autoPlay ? (
          <NextRoundButton disabled>
            Next round in {Math.ceil(showResultDuration / 1000)}s...
          </NextRoundButton>
        ) : (
          <PlayAgainButton type="button" onClick={this.onClickGoToGameView}>
            PLAY AGAIN
          </PlayAgainButton>
        )}
      </GameResultViewContainer>
    )
  }

  renderGameView = () => {
    const {gameStatus, isLoading} = this.state

    if (isLoading) {
      return this.renderLoadingView()
    }

    switch (gameStatus) {
      case gameStatusConstants.inProgress:
        return this.renderGameInProgressView()
      case gameStatusConstants.win:
        return this.renderResultView('🎉 YOU WON!', true)
      case gameStatusConstants.lost:
        return this.renderResultView('😞 YOU LOSE', false)
      case gameStatusConstants.draw:
        return this.renderResultView('🤝 IT IS DRAW', false)
      default:
        return null
    }
  }

  render() {
    const {
      score,
      gamesPlayed,
      wins,
      losses,
      draws,
      soundEnabled,
      autoPlay,
      streak,
      bestStreak,
    } = this.state

    return (
      <AppContainer>
        <ResultContainer>
          <OptionsContainer>
            <Option>
              ROCK
              <br />
              PAPER
              <br />
              SCISSORS
            </Option>
          </OptionsContainer>
          <ScoreContainer>
            <ScorePhrase>Score</ScorePhrase>
            <ScoreNumber>{score}</ScoreNumber>
            {streak > 0 && (
              <ScorePhrase className="streak">🔥 {streak} streak</ScorePhrase>
            )}
          </ScoreContainer>
        </ResultContainer>

        <GameStatsContainer>
          <StatItem>
            <StatValue>{gamesPlayed}</StatValue>
            <StatLabel>Games</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{wins}</StatValue>
            <StatLabel>Wins</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{losses}</StatValue>
            <StatLabel>Losses</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{draws}</StatValue>
            <StatLabel>Draws</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{bestStreak}</StatValue>
            <StatLabel>Best Streak</StatLabel>
          </StatItem>
        </GameStatsContainer>

        <GameViewContainer>{this.renderGameView()}</GameViewContainer>

        <PopupContainer>
          <AutoPlayToggleButton
            onClick={this.toggleAutoPlay}
            autoPlay={autoPlay}
            aria-label={`Turn auto-play ${autoPlay ? 'off' : 'on'}`}
            title={`Auto-play: ${autoPlay ? 'ON' : 'OFF'}`}
          >
            {autoPlay ? '⚡ AUTO' : '⏸️ MANUAL'}
          </AutoPlayToggleButton>

          <SoundToggleButton
            onClick={this.toggleSound}
            soundEnabled={soundEnabled}
            aria-label={`Turn sound ${soundEnabled ? 'off' : 'on'}`}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </SoundToggleButton>

          <TriggerButton onClick={this.resetStats}>Reset Stats</TriggerButton>

          <Popup
            modal
            trigger={<TriggerButton type="button">Rules</TriggerButton>}
            closeOnEscape
            closeOnDocumentClick
          >
            {close => (
              <PopUpBody>
                <PopUpImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="Game rules"
                />
                <CloseButton
                  type="button"
                  onClick={() => close()}
                  aria-label="Close rules"
                >
                  <RiCloseLine />
                </CloseButton>
              </PopUpBody>
            )}
          </Popup>
        </PopupContainer>
      </AppContainer>
    )
  }
}

export default RockPaperScissors
