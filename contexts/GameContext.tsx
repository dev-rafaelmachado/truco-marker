import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Haptics from 'expo-haptics'

type Multiplier = 1 | 3 | 6 | 9 | 12
type MultiplierLabel = 'Truco!' | 'Seis!' | 'Nove!' | 'Doze!' | 'Reset'
const multiplierLabels: Record<Multiplier, MultiplierLabel> = {
  1: 'Truco!',
  3: 'Seis!',
  6: 'Nove!',
  9: 'Doze!',
  12: 'Reset',
} as const

type GameState = {
  multiplierLabel: MultiplierLabel
  toggleMultiplier: () => void
  resetMultiplier: () => void
  addPoints: (team: 'a' | 'b', forceValue?: number) => void
  removeLastRound: () => void
  removeLastTeamRound: (team: 'a' | 'b') => void
  remove1PointFromTeam: (team: 'a' | 'b') => void
  getPoints: (team: 'a' | 'b') => number
  resetGame: () => void
}

type Round = {
  id: number
  team: 'a' | 'b'
  points: number
}

export const GameContext = createContext<GameState | null>(null)

type Props = {
  children: React.ReactNode
}

export const GameProvider = ({ children }: Props) => {
  const [multiplier, setMultiplier] = useState<Multiplier>(1)
  const [rounds, setRounds] = useState<Round[]>([])

  useEffect(() => {
    const getRounds = async () => {
      const rounds = await AsyncStorage.getItem('rounds')
      if (rounds) {
        setRounds(JSON.parse(rounds))
      }
    }
    getRounds()
  }, [])

  useEffect(() => {
    const saveRounds = async () => {
      await AsyncStorage.setItem('rounds', JSON.stringify(rounds))
    }

    saveRounds()
  }, [rounds])

  const resetMultiplier = () => {
    setMultiplier(1)
  }

  const toggleMultiplier = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    if (multiplier === 1) {
      setMultiplier(3)
      return
    }
    if (multiplier < 12) {
      setMultiplier((multiplier + 3) as Multiplier)
      return
    }

    resetMultiplier()
  }

  const addPoints = (team: 'a' | 'b', forceValue?: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    const sum = forceValue || multiplier
    const id = new Date().getTime()
    setRounds((rounds) => [...rounds, { id, team, points: sum }])
    resetMultiplier()

    if (getPoints(team) + sum > 12) {
      resetGame()
      resetMultiplier()
    }
  }

  const removeLastRound = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    setRounds((rounds) => rounds.slice(0, -1))
  }

  const removeLastTeamRound = (team: 'a' | 'b') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    const roundsSortedById = rounds.sort((a, b) => b.id - a.id)
    const lastRoundTeamX = roundsSortedById.find((round) => round.team === team)
    if (!lastRoundTeamX) {
      return
    }
    setRounds((rounds) =>
      rounds.filter((round) => round.id !== lastRoundTeamX.id),
    )
  }

  const remove1PointFromTeam = (team: 'a' | 'b') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    const roundsSortedById = rounds.sort((a, b) => b.id - a.id)
    const lastRoundTeamX = roundsSortedById.find((round) => round.team === team)

    if (!lastRoundTeamX) {
      return
    }
    if (lastRoundTeamX.points === 1) {
      setRounds((rounds) =>
        rounds.filter((round) => round.id !== lastRoundTeamX.id),
      )
      return
    }

    setRounds((rounds) => {
      const roundsCopy = [...rounds].filter(
        (round) => round.id !== lastRoundTeamX.id,
      )
      const pointsToAdd = lastRoundTeamX.points - 1
      decomposeNumber(pointsToAdd).forEach((points) => {
        roundsCopy.push({
          id: new Date().getTime() + Math.random(),
          team: lastRoundTeamX.team,
          points,
        })
      })
      return roundsCopy
    })
  }

  const getPoints = (team: 'a' | 'b') => {
    return rounds.reduce((acc, round) => {
      if (round.team === team) {
        return acc + round.points
      }
      return acc
    }, 0)
  }

  const resetGame = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    setRounds([])
    resetMultiplier()
  }

  return (
    <GameContext.Provider
      value={{
        toggleMultiplier,
        resetMultiplier,
        multiplierLabel: multiplierLabels[multiplier],
        addPoints,
        removeLastRound,
        removeLastTeamRound,
        remove1PointFromTeam,
        getPoints,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider')
  }
  return context
}

function decomposeNumber(target: number): number[] {
  const result: number[] = []

  let currentNumber = Math.floor(target / 3) * 3

  while (target > 0) {
    if (currentNumber > 0 && target >= currentNumber) {
      result.push(currentNumber)
      target -= currentNumber
    } else {
      currentNumber -= 3
      if (currentNumber < 3) {
        currentNumber = 1
      }
    }
  }
  return result
}
