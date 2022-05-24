import { Result, Button } from 'antd'

type ErrorResultViewProps = {
  title?: string,
  message?: string,
  status?: 'error' | 'warning' | 403 | 404 | 500,
  reloadCallback?: () => void,
}

// FIXME: doesn't work

const ErrorResultView: React.FC<ErrorResultViewProps> = ({
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

export default ErrorResultView
