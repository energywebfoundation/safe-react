// @flow
import { lg, md, secondaryText } from '~/theme/variables'

export const styles = () => ({
  heading: {
    padding: `${md} ${lg}`,
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
    maxHeight: '75px',
  },
  annotation: {
    letterSpacing: '-1px',
    color: secondaryText,
    marginRight: 'auto',
    marginLeft: '20px',
  },
  manage: {
    fontSize: '24px',
  },
  closeIcon: {
    height: '35px',
    width: '35px',
  },
  qrCodeBtn: {
    cursor: 'pointer',
  },
  formContainer: {
    padding: `${md} ${lg}`,
  },
  buttonRow: {
    height: '84px',
    justifyContent: 'center',
    '& > button': {
      fontFamily: 'Averta',
      fontSize: '16px',
    },
  },
  submitButton: {
    boxShadow: '1px 2px 10px 0 rgba(212, 212, 211, 0.59)',
    marginLeft: '15px',
  },
})
