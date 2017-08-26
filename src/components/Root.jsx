// @flow

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import StorePicker from './StorePicker'
import NotFound from './NotFound'

const Root = () =>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker} />
      <Route path="/store/:storeId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>

export default Root
