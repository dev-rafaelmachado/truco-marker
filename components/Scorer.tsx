import { useGameContext } from '@/contexts/GameContext'
import { View, Text, StyleSheet } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { IconButton } from './IconButton'

export const Scorer = () => {
  const { getPoints, removeLastRound, resetGame } = useGameContext()
  return (
    <View style={styles.container}>
      <View style={styles.score}>
        <View style={styles.box}>
          <Text style={styles.teamTitle}>Nós</Text>
          <Text style={styles.teamScore}>{getPoints('a')}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.teamTitle}>Eles</Text>
          <Text style={styles.teamScore}>{getPoints('b')}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <IconButton
          onPress={removeLastRound}
          icon={<Entypo name="back-in-time" size={28} color="white" />}
        />
        <IconButton
          onPress={resetGame}
          icon={<Ionicons name="close-sharp" size={32} color="white" />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    width: '92%',
    height: '22%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
    color: '#fff',
  },
  score: {
    flexDirection: 'row',
    flex: 1,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  teamTitle: {
    fontFamily: 'Rowdies_700Bold',
    fontSize: 42,
  },
  teamScore: {
    fontFamily: 'Rowdies_400Regular',
    marginTop: -15,
    fontSize: 32,
    color: '#535353',
  },
  footer: {
    backgroundColor: '#959595',
    width: '100%',
    height: '25%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
  },
})
