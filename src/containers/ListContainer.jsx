// @flow
import React from 'react'

// components
import TitleWithBreadcrumbs from '../components/TitleWithBreadcrumbs'
import withModule from '../components/WithModule'
import ListComponent from '../components/ListComponent'

// types

type Props = {
  changeRedirectUrl: (string) => void,
  data: Object[],
  loadData: () => void,
  module: string,
  navigationItem: Object,
  rights: Object,
  settings: Object,
}

class ListContainer extends React.Component<Props, State> {
  render() {
    const { changeRedirectUrl, module, navigationItem, rights, settings, t } = this.props
    return (
      <div className="list-container-wrapper">
        <div className="container">
          <TitleWithBreadcrumbs
            changeRedirectUrl={changeRedirectUrl}
            module={module}
            navigationItem={navigationItem}
            t={t}
            title={t(`modules.${navigationItem.name}.listTitle`)}
          />
        </div>
        <div className="container ms-bgColor-white list-container">
          <ListComponent
            changeRedirectUrl={changeRedirectUrl}
            module={module}
            navigationItem={navigationItem}
            rights={rights}
            settings={settings}
            t={t}
          />
        </div>
      </div>
    )
  }
}

export default withModule(ListContainer)
