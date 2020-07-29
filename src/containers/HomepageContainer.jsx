// @flow
import React from 'react'
import { connect } from 'react-redux'

import TestComponent from '../components/TestComponent'

import GeneralActions from '../redux/GeneralRedux'

type HomepageContainerProps = {}

class HomepageContainer extends React.Component<HomepageContainerProps> {
  handleTestOnClick = () => {
    this.props.testIncreaseNumber()
  }

  render() {
    const { testNumber } = this.props

    return (
      <div>
        <h1>DevX starterpack</h1>
        <TestComponent text={testNumber} />
        <button onClick={this.handleTestOnClick}>increase</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  testNumber: state.general.testNumber,
})

const mapDispatchToProps = {
  testIncreaseNumber: GeneralActions.testIncreaseNumber,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomepageContainer)
