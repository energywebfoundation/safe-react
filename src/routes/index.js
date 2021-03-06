// @flow
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Switch, Redirect, Route, withRouter,
} from 'react-router-dom'
import { defaultSafeSelector } from '~/routes/safe/store/selectors'
import Loader from '~/components/Loader'
import Welcome from './welcome/container'
import {
  SAFELIST_ADDRESS,
  OPEN_ADDRESS,
  SAFE_PARAM_ADDRESS,
  WELCOME_ADDRESS,
  OPENING_ADDRESS,
  LOAD_ADDRESS,
} from './routes'
import { withTracker } from '~/utils/googleAnalytics'

const Safe = React.lazy(() => import('./safe/container'))

const Open = React.lazy(() => import('./open/container/Open'))

const Opening = React.lazy(() => import('./opening/container'))

const Load = React.lazy(() => import('./load/container/Load'))

const SAFE_ADDRESS = `${SAFELIST_ADDRESS}/:${SAFE_PARAM_ADDRESS}`

type RoutesProps = {
  defaultSafe?: string,
  location: Object,
}

const Routes = ({ defaultSafe, location }: RoutesProps) => {
  const [isInitialLoad, setInitialLoad] = useState<boolean>(true)

  useEffect(() => {
    if (location.pathname !== '/') {
      setInitialLoad(false)
    }
  }, [])

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (!isInitialLoad) {
            return <Redirect to={WELCOME_ADDRESS} />
          }

          if (typeof defaultSafe === 'undefined') {
            return <Loader />
          }

          setInitialLoad(false)
          if (defaultSafe) {
            return <Redirect to={`${SAFELIST_ADDRESS}/${defaultSafe}/balances`} />
          }

          return <Redirect to={WELCOME_ADDRESS} />
        }}
      />
      <Route exact path={WELCOME_ADDRESS} component={withTracker(Welcome)} />
      <Route exact path={OPEN_ADDRESS} component={withTracker(Open)} />
      <Route path={SAFE_ADDRESS} component={withTracker(Safe)} />
      <Route exact path={OPENING_ADDRESS} component={withTracker(Opening)} />
      <Route exact path={LOAD_ADDRESS} component={withTracker(Load)} />
      <Redirect to="/" />
    </Switch>
  )
}

// $FlowFixMe
export default connect<Object, Object, ?Function, ?Object>(
  (state) => ({ defaultSafe: defaultSafeSelector(state) }),
  null,
)(withRouter(Routes))
