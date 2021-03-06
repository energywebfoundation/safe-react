// @flow

export type NotifiedTransaction = {
  STANDARD_TX: string,
  CONFIRMATION_TX: string,
  CANCELLATION_TX: string,
  SETTINGS_CHANGE_TX: string,
  SAFE_NAME_CHANGE_TX: string,
  OWNER_NAME_CHANGE_TX: string,
}

export const TX_NOTIFICATION_TYPES: NotifiedTransaction = {
  STANDARD_TX: 'STANDARD_TX',
  CONFIRMATION_TX: 'CONFIRMATION_TX',
  CANCELLATION_TX: 'CANCELLATION_TX',
  SETTINGS_CHANGE_TX: 'SETTINGS_CHANGE_TX',
  SAFE_NAME_CHANGE_TX: 'SAFE_NAME_CHANGE_TX',
  OWNER_NAME_CHANGE_TX: 'OWNER_NAME_CHANGE_TX',
}
