// @flow
import React from 'react'

type TestComponentType = {
  text: string,
}

const TestComponent = (props: TestComponentType) => <p>{props.text}</p>

export default TestComponent
