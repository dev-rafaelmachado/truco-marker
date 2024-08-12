import { View, StyleSheet, Dimensions } from 'react-native'
import { Tile } from './Tile'
import { useGameContext } from '@/contexts/GameContext'

const { height } = Dimensions.get('screen')

export const Tiles = () => {
  const { addPoints, removeLastTeamRound, remove1PointFromTeam } =
    useGameContext()
  return (
    <View style={styles.container}>
      <Tile
        style={{ ...styles.tile, borderRightWidth: 2 }}
        onLongPress={() => removeLastTeamRound('a')}
        onPress={() => addPoints('a')}
        onSwipeUp={() => addPoints('a', 3)}
        onSwipeDown={() => remove1PointFromTeam('a')}
      />
      <Tile
        style={{ ...styles.tile, borderLeftWidth: 2 }}
        onLongPress={() => removeLastTeamRound('b')}
        onPress={() => addPoints('b')}
        onSwipeUp={() => addPoints('b', 3)}
        onSwipeDown={() => remove1PointFromTeam('b')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height,
  },
  tile: {
    width: '50%',
    height: '100%',
    borderColor: '#828282',
    opacity: 0.05,
    backgroundColor: '#494949',
  },
})
