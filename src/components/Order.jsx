// @flow

import React, { Component } from 'react'
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

type Props = {
  fishes: Object,
  order: Object,
  removeFromOrder: Function,
}

class Order extends Component<Props> {
  renderOrder = (key: string) => {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]

    const FadeTransition = props =>
      <CSSTransition
        {...props}
        classNames="order"
        timeout={{
          enter: 500,
          exit: 500,
        }}
      />

    const removeButton = (
      <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
    )
    if (!fish || fish.status === 'unavailable') {
      return (
        <FadeTransition key={key}>
          <li>
            Sorry, {fish ? fish.name : `fish`} is no longer available
            {removeButton}
          </li>
        </FadeTransition>
      )
    }

    return (
      <FadeTransition key={key}>
        <li>
          <span>
            {count}
            lbs {fish.name} {removeButton}
          </span>
          <span className="price">
            {formatPrice(count * fish.price)}
          </span>
        </li>
      </FadeTransition>
    )
  }

  render() {
    const { fishes, order } = this.props
    const orderIds = Object.keys(order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key]
      const count = order[key]
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal
    }, 0)
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </TransitionGroup>
      </div>
    )
  }
}

export default Order
