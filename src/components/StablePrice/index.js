import React, { useMemo } from 'react'
import styled from 'styled-components'
import Panel from '../Panel'
import { AutoColumn } from '../Column'
import { RowFixed } from '../Row'
import { TYPE } from '../../Theme'
import { usePairData } from '../../contexts/PairData'
import { formattedNum } from '../../utils'
import { WUSD_IETH_PAIR } from '../../constants'

const PriceCard = styled(Panel)`
  position: absolute;
  right: -220px;
  width: 220px;
  top: -20px;
  z-index: 9999;
  height: fit-content;
  background-color: ${({ theme }) => theme.bg1};
`

function formatPercent(rawPercent) {
  if (rawPercent < 0.01) {
    return '<1%'
  } else return parseFloat(rawPercent * 100).toFixed(0) + '%'
}

export default function StablePrice() {
  const wusdPair = usePairData(WUSD_IETH_PAIR)

  const totalLiquidity = useMemo(() => {
    return wusdPair
      ? wusdPair.trackedReserveUSD
      : 0
  }, [wusdPair])

  const wusdPerEth = wusdPair ? parseFloat(wusdPair.token1Price).toFixed(2) : '-'

  return (
    <PriceCard>
      <AutoColumn gap="10px">
        <RowFixed>
          <TYPE.main>WUSD/IETH: {formattedNum(wusdPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {wusdPair && totalLiquidity ? formatPercent(wusdPair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed>
      </AutoColumn>
    </PriceCard>
  )
}
