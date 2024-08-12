import { useGameContext } from '@/contexts/GameContext'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

export const Multiplier = () => {
  const { toggleMultiplier, multiplierLabel } = useGameContext()
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleMultiplier}
      style={styles.container}
    >
      <Text style={styles.text}>{multiplierLabel}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    zIndex: 10,
    backgroundColor: '#d9d9d9',
    width: '92%',
    height: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  text: {
    fontFamily: 'Rowdies_700Bold',
    fontSize: 42,
    color: '#1e1e1e',
  },
})
