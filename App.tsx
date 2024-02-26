import { Button, Toast } from '@/components'
import { CoreSystem } from '@/core'
import { Typography } from '@/theme'
import React from 'react'
import { SafeAreaView, Text, TouchableNativeFeedback, View } from 'react-native'

function App(): React.JSX.Element {
  const openToastMessage = () => {
    CoreSystem.toast({ message: 'Đặt hàng thành công' })
  }

  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center', padding: 24 }}>
        <Button disabled label="This is button" />
      </View>

      <Toast />
    </SafeAreaView>
  )
}

export default App
