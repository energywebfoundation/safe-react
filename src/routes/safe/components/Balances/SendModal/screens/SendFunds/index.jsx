// @flow
import React, { useState } from 'react'
import { List } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import { OnChange } from 'react-final-form-listeners'
import Close from '@material-ui/icons/Close'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Paragraph from '~/components/layout/Paragraph'
import Row from '~/components/layout/Row'
import GnoForm from '~/components/forms/GnoForm'
import AddressInput from '~/components/forms/AddressInput'
import Col from '~/components/layout/Col'
import Button from '~/components/layout/Button'
import Block from '~/components/layout/Block'
import Img from '~/components/layout/Img'
import Hairline from '~/components/layout/Hairline'
import ButtonLink from '~/components/layout/ButtonLink'
import Field from '~/components/forms/Field'
import TextField from '~/components/forms/TextField'
import { type Token } from '~/logic/tokens/store/model/token'
import {
  composeValidators, required, mustBeFloat, maxValue, greaterThan,
} from '~/components/forms/validator'
import TokenSelectField from '~/routes/safe/components/Balances/SendModal/screens/SendFunds/TokenSelectField'
import SafeInfo from '~/routes/safe/components/Balances/SendModal/SafeInfo'
import ScanQRModal from '~/components/ScanQRModal'
import ArrowDown from '../assets/arrow-down.svg'
import QRIcon from '~/assets/icons/qrcode.svg'
import { styles } from './style'

type Props = {
  onClose: () => void,
  classes: Object,
  safeAddress: string,
  safeName: string,
  ethBalance: string,
  selectedToken: string,
  tokens: List<Token>,
  onSubmit: Function,
  initialValues: Object,
}

const formMutators = {
  setMax: (args, state, utils) => {
    utils.changeValue(state, 'amount', () => args[0])
  },
  onTokenChange: (args, state, utils) => {
    utils.changeValue(state, 'amount', () => '')
  },
  setRecipient: (args, state, utils) => {
    utils.changeValue(state, 'recipientAddress', () => args[0])
  },
}

const SendFunds = ({
  classes,
  onClose,
  safeAddress,
  safeName,
  ethBalance,
  tokens,
  selectedToken,
  initialValues,
  onSubmit,
}: Props) => {
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false)

  const handleSubmit = (values) => {
    onSubmit(values)
  }

  const openQrModal = () => {
    setQrModalOpen(true)
  }

  const closeQrModal = () => {
    setQrModalOpen(false)
  }

  return (
    <>
      <Row align="center" grow className={classes.heading}>
        <Paragraph weight="bolder" className={classes.manage} noMargin>
          Send Funds
        </Paragraph>
        <Paragraph className={classes.annotation}>1 of 2</Paragraph>
        <IconButton onClick={onClose} disableRipple>
          <Close className={classes.closeIcon} />
        </IconButton>
      </Row>
      <Hairline />
      <GnoForm onSubmit={handleSubmit} formMutators={formMutators} initialValues={initialValues}>
        {(...args) => {
          const formState = args[2]
          const mutators = args[3]
          const { token: tokenAddress } = formState.values
          const selectedTokenRecord = tokens.find((token) => token.address === tokenAddress)

          const handleScan = (value) => {
            let scannedAddress = value

            if (scannedAddress.startsWith('ethereum:')) {
              scannedAddress = scannedAddress.replace('ethereum:', '')
            }

            mutators.setRecipient(scannedAddress)
            closeQrModal()
          }

          return (
            <>
              <Block className={classes.formContainer}>
                <SafeInfo safeAddress={safeAddress} safeName={safeName} ethBalance={ethBalance} />
                <Row margin="md">
                  <Col xs={1}>
                    <img src={ArrowDown} alt="Arrow Down" style={{ marginLeft: '8px' }} />
                  </Col>
                  <Col xs={11} center="xs" layout="column">
                    <Hairline />
                  </Col>
                </Row>
                <Row margin="md">
                  <Col xs={11}>
                    <AddressInput
                      name="recipientAddress"
                      component={TextField}
                      placeholder="Recipient*"
                      text="Recipient*"
                      className={classes.addressInput}
                      fieldMutator={mutators.setRecipient}
                    />
                  </Col>
                  <Col xs={1} center="xs" middle="xs" className={classes}>
                    <Img
                      src={QRIcon}
                      className={classes.qrCodeBtn}
                      role="button"
                      height={20}
                      alt="Scan QR"
                      onClick={() => {
                        openQrModal()
                      }}
                    />
                  </Col>
                </Row>
                <Row margin="sm">
                  <Col>
                    <TokenSelectField tokens={tokens} initialValue={selectedToken} />
                  </Col>
                </Row>
                <Row margin="xs">
                  <Col between="lg">
                    <Paragraph size="md" color="disabled" style={{ letterSpacing: '-0.5px' }} noMargin>
                      Amount
                    </Paragraph>
                    <ButtonLink weight="bold" onClick={() => mutators.setMax(selectedTokenRecord.balance)}>
                      Send max
                    </ButtonLink>
                  </Col>
                </Row>
                <Row margin="md">
                  <Col>
                    <Field
                      name="amount"
                      component={TextField}
                      type="text"
                      validate={composeValidators(
                        required,
                        mustBeFloat,
                        greaterThan(0),
                        maxValue(selectedTokenRecord && selectedTokenRecord.balance),
                      )}
                      placeholder="Amount*"
                      text="Amount*"
                      className={classes.addressInput}
                      inputAdornment={
                        selectedTokenRecord && {
                          endAdornment: <InputAdornment position="end">{selectedTokenRecord.symbol}</InputAdornment>,
                        }
                      }
                    />
                    <OnChange name="token">
                      {() => {
                        mutators.onTokenChange()
                      }}
                    </OnChange>
                  </Col>
                </Row>
              </Block>
              <Hairline />
              <Row align="center" className={classes.buttonRow}>
                <Button minWidth={140} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  minWidth={140}
                  color="primary"
                  data-testid="review-tx-btn"
                  className={classes.submitButton}
                >
                  Review
                </Button>
              </Row>
              {qrModalOpen && <ScanQRModal isOpen={qrModalOpen} onScan={handleScan} onClose={closeQrModal} />}
            </>
          )
        }}
      </GnoForm>
    </>
  )
}

export default withStyles(styles)(SendFunds)
