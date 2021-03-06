// @flow
import addSafe from '~/routes/safe/store/actions/addSafe'

export type AddSafe = typeof addSafe

export type Actions = {
  addSafe: typeof addSafe,
}

export default {
  addSafe,
}
