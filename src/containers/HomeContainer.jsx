// @flow
import React from 'react'
import { connect } from 'react-redux'

// redux

// components
import TitleWithBreadcrumbs from '../components/TitleWithBreadcrumbs'

// types
import type { UserType } from '../types/UserTypes'

type Props = {
  user: UserType,
}

class HomeScreen extends React.Component<Props, null> {
  render() {
    const { t } = this.props
    return (
      <div className="container">
        <TitleWithBreadcrumbs title={'Dashboard'} t={t} />
        {this.props.user.name.length > 0 && <h3 className="pb-3">{this.props.user.name}, welcome back</h3>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
