/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

type Props = {
  onPress?: () => void
  onLongPress?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  style?: any
  sensitivity?: number // Propriedade opcional para definir a sensibilidade
}

export const Tile = ({
  onPress,
  onLongPress,
  onSwipeUp,
  onSwipeDown,
  style,
  sensitivity = 50,
}: Props) => {
  const [y, setY] = useState(0)
  const [longPressTriggered, setLongPressTriggered] = useState(false)

  const handlePressIn = (e: any) => {
    setY(e.nativeEvent.pageY)
    setLongPressTriggered(false) // Resetar o estado quando o toque começa
  }

  const handlePressOut = (e: any) => {
    const deltaY = e.nativeEvent.pageY - y

    if (Math.abs(deltaY) > sensitivity) {
      if (deltaY > 0) {
        onSwipeDown?.()
      } else {
        onSwipeUp?.()
      }
    } else if (!longPressTriggered) {
      onPress?.()
    }
    setY(0)
  }

  const handleLongPress = () => {
    setLongPressTriggered(true)
    onLongPress?.()
  }

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.2}
      onLongPress={handleLongPress}
      style={style}
    />
  )
}
