import { IETH_ADDRESS } from "../constants"

interface BasicData {
  token0?: {
    id: string
    name: string
    symbol: string
    iname: string
    isymbol: string
  }
  token1?: {
    id: string
    name: string
    symbol: string
    iname: string
    isymbol: string
  }
}

// Override data return from graph - usually because proxy token has changed
// names since entitiy was created in subgraph
// keys are lowercase token addresses <--------
const TOKEN_OVERRIDES: { [address: string]: { name: string; symbol: string, isymbol: string } } = {
  [IETH_ADDRESS]: {
    name: 'Ether (Item)',
    symbol: 'ETH',
    isymbol: 'IETH'
  },
}

// override tokens with incorrect symbol or names
export function updateNameData(data: BasicData): BasicData | undefined {
  if (data?.token0?.id && Object.keys(TOKEN_OVERRIDES).includes(data.token0.id)) {
    data.token0.name = TOKEN_OVERRIDES[data.token0.id].name
    data.token0.symbol = TOKEN_OVERRIDES[data.token0.id].symbol
    data.token0.isymbol = TOKEN_OVERRIDES[data.token0.id].isymbol
    data.token0.iname = TOKEN_OVERRIDES[data.token0.id].name
  }

  if (data?.token1?.id && Object.keys(TOKEN_OVERRIDES).includes(data.token1.id)) {
    data.token1.name = TOKEN_OVERRIDES[data.token1.id].name
    data.token1.symbol = TOKEN_OVERRIDES[data.token1.id].symbol
  }

  return data
}
