// @flow
import React from 'react'

// components
import TitleWithBreadcrumbs from '@bheui/components/lib/components/TitleWithBreadcrumbs'
import withModule from '@bheui/components/lib/components/WithModule'
import ListComponent from '@bheui/components/lib/components/ListComponent'
import CustomModuleComponents from '@bheui/components/lib/components/modules/CustomModuleComponents'

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
            customComponents={CustomModuleComponents}
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
