// @flow

import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'

type Props = {
  match: Object,
}

type State = {
  fishes: Object,
  order: Object,
}

class App extends Component<Props, State> {
  state = {
    fishes: {},
    order: {},
  }

  componentDidMount() {
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })

    const localStorageRef = localStorage.getItem(
      `order-${this.props.match.params.storeId}`,
    )

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  componentWillUpdate(nextProps: Object, nextState: Object) {
    localStorage.setItem(
      `order-${this.props.match.params.storeId}`,
      JSON.stringify(nextState.order),
    )
  }

  addFish = (fish: Object) => {
    const fishes = { ...this.state.fishes }
    const timeStamp = Date.now()
    fishes[`${timeStamp}`] = fish
    this.setState({ fishes })
  }

  removeFish = (key: string) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = null
    this.setState({ fishes })
  }

  updateFish = (key: string, updatedFish: Object) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish
    this.setState({ fishes })
  }

  loadSamples = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = (key: string) => {
    const order = { ...this.state.order }
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }

  removeFromOrder = (key: string) => {
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fish">
            {Object.keys(this.state.fishes).map(key =>
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />,
            )}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App
