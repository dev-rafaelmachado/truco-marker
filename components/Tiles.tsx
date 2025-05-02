import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Tile } from './Tile'
import { useGameContext } from '@/contexts/GameContext'

const { height } = Dimensions.get('screen')

export const Tiles = () => {
  const { addPoints, removeLastTeamRound, remove1PointFromTeam, getPoints } =
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
      <View style={styles.reverseViewScore}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
          {getPoints('a')} x {getPoints('b')}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 90,
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
  reverseViewScore: {
    position: 'absolute',
    bottom: 22,
    left: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    transform: [{ rotate: '180deg' }],
  },
})
