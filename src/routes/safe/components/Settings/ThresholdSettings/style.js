// @flow
import {
  fontColor, lg, smallFontSize, border, secondaryText,
} from '~/theme/variables'

export const styles = () => ({
  ownersText: {
    color: secondaryText,
    '& b': {
      color: fontColor,
    },
  },
  container: {
    padding: lg,
  },
  buttonRow: {
    padding: lg,
    position: 'absolute',
    left: 0,
    bottom: 0,
    boxSizing: 'border-box',
    width: '100%',
    justifyContent: 'flex-end',
    borderTop: `2px solid ${border}`,
  },
  modifyBtn: {
    height: '32px',
    fontSize: smallFontSize,
  },
})
