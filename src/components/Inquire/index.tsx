import React from 'react'
import styled from 'styled-components'
import Refresh from '../../assets/images/refresh.svg'
import querylogo from '../../assets/images/eotc.png'
import { useActiveWeb3React } from '../../hooks'
import { useETHBalances, useCurrencyBalance } from '../../state/wallet/hooks'
import { Currency } from 'eotc-bscswap-sdk'

const Lists = styled.div`
  position: relative;
  top: -455px;
  left: 550px;
  padding: 1rem;
  border-radius: 30px;
  font-size: 18px;
  background: ${({ theme }) => theme.bg1};
  max-width: 600px;
  width: 100%;
`

const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
`

const ListImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 6px;
  cursor: pointer;
`

const ActiveText = styled.div`
  color: ${({ theme }) => theme.text1};
`

const QueryList = styled.div`
  border: 1px solid #237ff8;
  border-radius: 6px;
  margin: 10px 0px;
`

// const TokenList = styled.div``

const ListDiv = styled.div`
  display: flex;
  line-height: 25px;
`

const TokenBalance = styled.span`
  margin-left: 10px;
  font-size: 10px;
  color: #7586a7;
`

const QueryText = styled.span`
  color: ${({ theme }) => theme.text1};
  font-size: 22px;
  font-weight: 500;
`

const QueryButton = styled.button`
  background-color: ${({ theme }) => theme.primary1};
  color: #fff;
  border-radius: 8px;
  width: 75px;
  height: 30px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`

interface CurrencyInquire {
  currency?: Currency | null
}

export default function Inquire({ currency }: CurrencyInquire) {
  const { account } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  return (
    <Lists>
      <ListTitle>
        <ActiveText>查询结果</ActiveText>
        <ListImg src={Refresh}></ListImg>
      </ListTitle>
      <QueryList>
        <ListTitle>
          <ListDiv>
            <ListImg src={querylogo}></ListImg>
            <ActiveText> EOTC</ActiveText>
          </ListDiv>
          <ListDiv>
            <TokenBalance>EOTC余额: {selectedCurrencyBalance?.toSignificant(6)}</TokenBalance>
            <TokenBalance>BNB余额: {userEthBalance?.toSignificant(4)}</TokenBalance>
          </ListDiv>
        </ListTitle>
        <ListTitle>
          <ListDiv>
            <QueryText>2.38 EOTC</QueryText>
            <TokenBalance>(手续费：~$0.003)</TokenBalance>
          </ListDiv>
          <QueryButton>交换</QueryButton>
        </ListTitle>
      </QueryList>
    </Lists>
  )
}
