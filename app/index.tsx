import { Multiplier } from '@/components/Multiplier'
import { Scorer } from '@/components/Scorer'
import { Tiles } from '@/components/Tiles'
import { GameProvider } from '@/contexts/GameContext'
import { StyleSheet, View } from 'react-native'

export default function Index() {
  return (
    <View style={style.main}>
      <GameProvider>
        <Scorer />
        <Tiles />
        <Multiplier />
      </GameProvider>
    </View>
  )
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#232323',
    color: '#fff',
  },
})
