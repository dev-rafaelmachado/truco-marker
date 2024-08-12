import { ReactElement } from 'react'
import { TouchableOpacity } from 'react-native'

type Props = {
  onPress?: () => void
  onLongPress?: () => void
  icon: ReactElement
}

export const IconButton = ({ onPress, onLongPress, icon }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {icon}
    </TouchableOpacity>
  )
}
