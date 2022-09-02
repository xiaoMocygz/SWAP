import { Trade } from 'eotc-bscswap-sdk'
import React from 'react'
import styled from 'styled-components'
import { Field } from '../../state/swap/actions'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '../../utils/prices'
const QueryText = styled.span`
  color: ${({ theme }) => theme.text1};
  font-size: 22px;
  font-weight: 500;
`
const TokenBalance = styled.span`
  margin-left: 10px;
  font-size: 10px;
  color: #7586a7;
`

export default function PriceText({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  return (
    <>
      <QueryText>
        {trade
          ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}`
          : ''}
      </QueryText>
      <TokenBalance>
        (手续费：{realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'})
      </TokenBalance>
    </>
  )
}
