// @flow
import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'
import { Pivot, PivotItem } from '@fluentui/react'

// redux
import EditActions from '@bheui/components/lib/redux/EditRedux'
import HelperActions from '@bheui/components/lib/redux/HelperRedux'

// utils

// components
import TitleWithBreadcrumbs from '@bheui/components/lib/components/TitleWithBreadcrumbs'
import withModule from '@bheui/components/lib/components/WithModule'
import FormComponentWithStack from '@bheui/components/lib/components/form/FormComponentStack'

// types

type Props = {
  action: string,
  changeRedirectUrl: (string) => void,
  data: Object[],
  loadData: () => void,
  module: string,
  navigationItem: Object,
  onEditSaveRequest: ({ type: string, module: string, moduleUrl: string, data: Object }) => void,
  resources: Object,
  resourcesVersion: number,
  rights: Object,
  settings: Object,
}

const emptyImmutable = Immutable({})
class EditContainer extends React.Component<Props> {
  componentDidMount() {
    this.handleUpdateConfig()
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.navigationItem.name !== this.props.navigationItem.name) {
      this.handleUpdateConfig()
    }
  }

  handleUpdateConfig = () => {
    const { action, onEditLoadFormConfigRequest, navigationItem, router } = this.props
    onEditLoadFormConfigRequest({
      module: navigationItem.name,
      type: action,
      id: router && router.query && router.query.id,
    })
  }

  handleFetchResources = (resourcesName: string) => {
    const { resources, getResourcesRequest } = this.props
    const resource = resources.getIn([resourcesName])
    if (resource) {
      return resource
    }
    getResourcesRequest(resourcesName)
  }

  handleSubmit = (data: Object) => {
    const { action, navigationItem, onEditSaveRequest } = this.props
    onEditSaveRequest({
      type: action,
      module: navigationItem.name,
      moduleUrl: navigationItem.url,
      data,
    })
  }

  render() {
    const { configs, data, navigationItem, changeRedirectUrl, action, module, resourcesVersion, t } = this.props
    const tabs = Object.keys(configs.getIn([navigationItem.name], emptyImmutable))
    return (
      <div className="edit-container-wrapper">
        <div className="container">
          <TitleWithBreadcrumbs
            action={action}
            changeRedirectUrl={changeRedirectUrl}
            module={module}
            navigationItem={navigationItem}
            t={t}
            title={t(`modules.${navigationItem.name}.listTitle`)}
          />
        </div>
        <div className="container ms-bgColor-white">
          <Pivot>
            {tabs.map((tab) => (
              <PivotItem
                key={tab}
                headerButtonProps={{
                  'data-order': 1,
                  'data-title': 'My Files Title',
                }}
                headerText={t(`modules.${navigationItem.name}.tab.${tab}`)}
              >
                <FormComponentWithStack
                  defaultData={data.getIn([navigationItem.name])}
                  editable={action !== 'VIEW'}
                  fetchResources={this.handleFetchResources}
                  formConfig={configs.getIn([navigationItem.name, tab])}
                  labelPrefix="forms."
                  onSubmit={this.handleSubmit}
                  resourceVersion={resourcesVersion}
                  showSubmitButton={action !== 'VIEW'}
                  submitButtonText={t('editScreen.submitButton')}
                  t={t}
                />
              </PivotItem>
            ))}
          </Pivot>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  action: `${ownProps.router.query.action}`.toUpperCase(), // todo selector
  configs: state.edit.configs,
  data: state.edit.data,
  listSettings: state.list.listSettings,
  navigation: state.navigation.navigation,
  resources: state.helper.resources,
  resourcesVersion: state.helper.resourcesVersion,
})

const mapActionsToProps = {
  getResourcesRequest: HelperActions.getResourcesRequest,
  onEditLoadFormConfigRequest: EditActions.onEditLoadFormConfigRequest,
  onEditSaveRequest: EditActions.onEditSaveRequest,
}

export default connect(mapStateToProps, mapActionsToProps)(withModule(EditContainer))
