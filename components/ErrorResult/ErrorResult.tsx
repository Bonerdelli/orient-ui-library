import React from 'react'
import { Result, Button } from 'antd'

type ErrorResultProps = {
  title?: string,
  message?: string,
  status?: 'error' | 'warning' | 403 | 404 | 500,
  reloadCallback?: () => void,
}

export const ErrorResultView: React.FC<ErrorResultProps> = ({
  title = 'commonErrors.dataLoadingError.title',
  message = 'commonErrors.dataLoadingError.desc',
  status = 'error',
  reloadCallback,
}) => (
  // TODO: translation
  <Result
    status={status}
    title={title}
    subTitle={message}
    extra={reloadCallback && [
      <Button key='reload' onClick={() => reloadCallback()}>
        Перезагрузить
      </Button>,
    ]}
  />
)
