import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { primary } from '../colors'

import { TextSmall } from './Text'

const Dot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #6E7191;
  margin-left: 4px;
`

const ActiveDot = styled(Dot)`
  background: ${primary};
  width: 16px;
  margin-right: 12px;
`

const Indicator = ({ numItems, currentItemIdx }: { numItems: number; currentItemIdx: number }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {Array(numItems).fill(0).map((_, idx) => (
      <View key={idx} style={{ width: 16, alignItems: 'flex-start', marginRight: 8 }}>
        {idx === currentItemIdx ? <ActiveDot /> : <Dot />}
      </View>
    ))}
  </View>
)

export const TextCarousel = ({ items, index } : { items: string[]; index: number }) => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={{ flex: 1, marginBottom: 33 }}>
        <TextSmall>{items[index]}</TextSmall>
      </View>
      <Indicator numItems={items.length} currentItemIdx={index} />
    </View>
  )
}