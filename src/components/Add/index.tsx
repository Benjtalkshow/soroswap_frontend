import { styled, useTheme } from "@mui/material";
import { useSorobanReact } from "@soroban-react/core";
import { ButtonError, ButtonLight } from "components/Buttons/Button";
import { DarkGrayCard } from "components/Card";
import { AutoColumn, ColumnCenter } from "components/Column";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import { AddRemoveTabs } from "components/NavigationTabs";
import { BodySmall, ButtonText } from "components/Text";
import TransactionConfirmationModal from "components/TransactionConfirmationModal";
import { useCallback, useState } from "react";
import { Plus } from "react-feather";
import { opacify } from "themes/utils";

export const PageWrapper = styled('main')`
  position: relative;
  background: ${({ theme }) => `linear-gradient(${theme.palette.customBackground.bg2}, ${theme.palette.customBackground.bg2}) padding-box,
              linear-gradient(150deg, rgba(136,102,221,1) 0%, rgba(${theme.palette.mode == 'dark' ? "33,29,50,1" : "255,255,255,1"}) 35%, rgba(${theme.palette.mode == 'dark' ? "33,29,50,1" : "255,255,255,1"}) 65%, rgba(136,102,221,1) 100%) border-box`};
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 32px;
  padding-top: 12px;
  box-shadow: 0px 40px 120px 0px #f00bdd29;
  transition: transform 250ms ease;
  max-width: 480px;
  width: 100%;
  &:hover: {
    border: 1px solid ${({ theme }) => opacify(24, theme.palette.secondary.main,)},
  }

  @media (max-width: ${({theme}) => theme.breakpoints.values.md}px) {
    padding: 16px;
  }
`

type TokensType = [string, string];

export default function AddLiquidityPage() {

  const theme = useTheme()

  // const router = useRouter();
  // const { tokens } = router.query as { tokens: TokensType };
  // // console.log("pages/add tokens:", tokens)

  // const [currencyIdA, currencyIdB] = Array.isArray(tokens) ? tokens : ['', ''];
  // console.log("src/components/Add/index: [currencyIdA, currencyIdB]:", [currencyIdA, currencyIdB])

  // // console.log("typeof tokens:", typeof tokens)
  // // const {
  // //   dependentField,
  // //   currencies,
  // //   pair,
  // //   pairState,
  // //   currencyBalances,
  // //   parsedAmounts,
  // //   price,
  // //   noLiquidity,
  // //   liquidityMinted,
  // //   poolTokenPercentage,
  // //   error,
  // // } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const sorobanContext = useSorobanReact()

  // const [currencyA, setCurrencyA] = useState<TokenType | undefined>()
  // const [currencyB, setCurrencyB] = useState<TokenType | undefined>()

  // const [amountOfLpTokensToReceive, setAmountOfLpTokensToReceive] = useState<string>("")
  // const [amountOfLpTokensToReceiveBN, setAmountOfLpTokensToReceiveBN] = useState<BigNumber>()
  // const [totalShares, setTotalShares] = useState<string>("")

  // const navigate = useCallback((destination: any) => { router.push(destination) }, [router]
  // )
  // // console.log("pages/add, currencyA, currencyB", currencyA, currencyB)

  // const derivedMintInfo = useDerivedMintInfo(
  //   currencyA ? currencyA : undefined,
  //   currencyB ? currencyB : undefined)
  // // const derivedMintInfo = useDerivedMintInfo(tokens[0], tokens[1])
  // const { dependentField, currencies, parsedAmounts, noLiquidity, pairAddress } = derivedMintInfo
  // console.log("pages/add derivedMintInfo:", derivedMintInfo)
  // // const noLiquidity = true
  // const isCreate = false

  // const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  // const { independentField, typedValue, otherTypedValue } = useMintState()

  // // console.log("src/components/Add/index.tsx: independentField:", independentField)
  // const formattedAmounts = useMemo(() => {
  //   return {
  //     [independentField]: typedValue,
  //     // [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.value ?? '',
  //     [dependentField]: noLiquidity ? otherTypedValue : formatTokenAmount(parsedAmounts[dependentField]?.value ?? ''),
  //     // [dependentField]: otherTypedValue
  //   }
  // }, [dependentField, independentField, noLiquidity, otherTypedValue, parsedAmounts, typedValue])

  // // console.log("src/components/Add/index.tsx: formattedAmounts:", formattedAmounts)
  // // console.log("src/components/Add/index.tsx: formatTokenAmount(formattedAmounts[dependentField]):", formatTokenAmount(formattedAmounts[dependentField]))
  // // console.log("src/components/Add/index.tsx: parsedAmounts:", parsedAmounts)
  // // console.log("src/components/Add/index.tsx: noLiquidity:", noLiquidity)

  // // Modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    // if (txHash) {
    //   onFieldAInput('')
    // }
    // setTxHash('')
  }, [])

  // const provideLiquidity = useCallback(() => {

  //   // TODO: check that amount0 corresponds to token0?
  //   depositOnContract({
  //     sorobanContext,
  //     pairAddress: pairAddress,
  //     amount0: formattedAmounts[independentField],
  //     amount1: formattedAmounts[dependentField],
  //   })
  // }, [dependentField, pairAddress, formattedAmounts, independentField, sorobanContext])

  // const handleCurrencyASelect = useCallback(
  //   (currencyA: TokenType) => {
  //     const newCurrencyIdA = currencyA.address
  //     if (newCurrencyIdA === currencyIdB) {
  //       navigate(`/liquidity/add/${currencyIdB}/${currencyIdA}`)
  //     } else {
  //       navigate(`/liquidity/add/${newCurrencyIdA}/${currencyIdB}`)
  //     }
  //   },
  //   [currencyIdB, navigate, currencyIdA]
  // )
  // const handleCurrencyBSelect = useCallback(
  //   (currencyB: TokenType) => {
  //     const newCurrencyIdB = currencyB.address
  //     if (currencyIdA === newCurrencyIdB) {
  //       if (currencyIdB) {
  //         navigate(`/liquidity/add/${currencyIdB}/${newCurrencyIdB}`)
  //       } else {
  //         navigate(`/liquidity/add/${newCurrencyIdB}`)
  //       }
  //     } else {
  //       navigate(`/liquidity/add/${currencyIdA ? currencyIdA : 'ETH'}/${newCurrencyIdB}`)
  //     }
  //   },
  //   [currencyIdA, navigate, currencyIdB]
  // )

  // // update currencies
  // useEffect(() => {
  //   if (currencyIdA || currencyIdA !== '') {
  //     getToken(sorobanContext, currencyIdA).then((token) => {
  //       // console.log("src/components/Add/index: get Token A called: ", token)
  //       setCurrencyA(token)
  //     })
  //   }
  //   if (currencyIdB || currencyIdB !== '') {
  //     getToken(sorobanContext, currencyIdB).then((token) => {
  //       // console.log("src/components/Add/index: get Token B called: ", token)
  //       setCurrencyB(token)
  //     })
  //   }

  // }, [currencyIdA, currencyIdB, sorobanContext])

  // // Get the LP token amount to receive
  // useEffect(() => {
  //   if (!pairAddress || !currencyA || !currencyB) return
  //   // LP tokens
  //   // We need to get which one is amount0 
  //   reservesBNWithTokens(pairAddress, sorobanContext).then((reserves) => {
  //     if (!reserves.reserve0 || !reserves.reserve1 || !formattedAmounts.CURRENCY_A || !formattedAmounts.CURRENCY_B) return

  //     let amount0, amount1
  //     // Check if currencyA corresponds to token0 or token1
  //     if (currencyA.address === reserves.token0) {
  //       amount0 = new BigNumber(formattedAmounts.CURRENCY_A)
  //       amount1 = new BigNumber(formattedAmounts.CURRENCY_B)
  //     } else if (currencyA.address === reserves.token1) {
  //       amount0 = new BigNumber(formattedAmounts.CURRENCY_B)
  //       amount1 = new BigNumber(formattedAmounts.CURRENCY_A)
  //     } else {
  //       console.log("currencyA does not correspond to either token0 or token1");
  //       return
  //     }
  //     getLpTokensAmount(
  //       amount0,
  //       reserves.reserve0,
  //       amount1,
  //       reserves.reserve1,
  //       pairAddress,
  //       sorobanContext
  //     ).then((lpTokens) => {
  //       if (lpTokens === undefined) console.log("src/components/Add/index.tsx: lpTokens are undefined")
  //       else {
  //         setAmountOfLpTokensToReceive(lpTokens.toString())
  //         setAmountOfLpTokensToReceiveBN(lpTokens)
  //       }
  //     })
  //   })
  // }, [currencyA, currencyB, formattedAmounts, pairAddress, sorobanContext])

  // // Get share of Pool
  // useEffect(() => {
  //   if (!pairAddress || !amountOfLpTokensToReceiveBN) return
  //   getTotalShares(pairAddress, sorobanContext).then((totalSharesResult) => {
  //     if (typeof totalSharesResult === 'number' || typeof totalSharesResult === 'string') {
  //       const totalSharesBN = new BigNumber(totalSharesResult)
  //       const share = amountOfLpTokensToReceiveBN.multipliedBy(100).dividedBy(amountOfLpTokensToReceiveBN.plus(totalSharesBN.shiftedBy(-7)))
  //       setTotalShares(share.toString())
  //     } else {
  //       console.error("Invalid type for totalSharesResult", totalSharesResult);
  //     }
  //   })
  // }, [amountOfLpTokensToReceiveBN, pairAddress, sorobanContext])
  return (
    <>
      <PageWrapper>
        <AddRemoveTabs creating={false} adding={true} autoSlippage={"DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE"} />
        <TransactionConfirmationModal
          isOpen={false}
          onDismiss={handleDismissConfirmation}
          attemptingTxn={attemptingTxn}
          reviewContent={() => (
            <></>
            // <ConfirmationModalContent
            //   title={true ? <>You are creating a pool</> : <>You will receive</>}
            //   onDismiss={handleDismissConfirmation}
            //   topContent={() => AddModalHeader({ currencies, amountOfLpTokensToReceive })}
            //   bottomContent={() => AddModalFooter({ currencies, formattedAmounts, totalShares, onConfirm: provideLiquidity })}
            // />
          )}
        />
        <AutoColumn gap="20px">
          <DarkGrayCard>
            <BodySmall color={theme.palette.custom.textTertiary}>
              <b>Tip: </b>When you add liquidity, you will receive LP tokens representing your position.
              <span style={{marginTop: 15}}>These tokens automatically earn fees proportional to your share of the pool.Can be redeemed at any time</span>
            </BodySmall>
          </DarkGrayCard>          
          <CurrencyInputPanel
            value={""}
            onUserInput={() => { }}
            // onMax={() => {
            //   onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
            // }}
            onCurrencySelect={() => { }}
            showMaxButton={false}
            currency={null}
            // currency={null}
            id="add-liquidity-input-tokena"
          // showCommonBases
          />
          <ColumnCenter>
            <Plus size="16" color={theme.palette.secondary.main} />
          </ColumnCenter>
          <CurrencyInputPanel
            value={""}
            onUserInput={() => {}}
            onCurrencySelect={() => {}}
            // onMax={() => {
            //   onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
            // }}
            showMaxButton={false}
            currency={null}
            // currency={currencies[Field.CURRENCY_A] ?? null}
            // currency={null}
            id="add-liquidity-input-tokenb"
          // showCommonBases
          />
          {!sorobanContext.address ? (

            <ButtonLight onClick={() => { }}>
              <>Connect Wallet</>
            </ButtonLight>
          ) : (
            <AutoColumn gap="md">
              <ButtonError
                onClick={() => {
                  setShowConfirm(true)
                  // provideLiquidity()
                  console.log("pages/add: ButtonError onClick")
                }}
                disabled={false}
                error={false}
              >
                <ButtonText fontSize={20} fontWeight={600}>
                  Supply
                </ButtonText>
              </ButtonError>
            </AutoColumn>
          )}
        </AutoColumn>
      </PageWrapper>
    </>
  );
}
