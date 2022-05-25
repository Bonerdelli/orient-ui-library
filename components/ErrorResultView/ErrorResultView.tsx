import { useTranslation } from 'react-i18next'
import { Result, Button } from 'antd'

type ErrorResultViewProps = {
  title?: string,
  message?: string,
  status?: 'error' | 'warning' | 403 | 404 | 500,
  reloadCallback?: () => void,
}

const ErrorResultView: React.FC<ErrorResultViewProps> = ({
  title = 'common.errors.dataLoadingError.title',
  message = 'common.errors.dataLoadingError.desc',
  status = 'error',
  reloadCallback,
}) => {
  const { t } = useTranslation()
  return (
    <Result
      status={status}
      title={t(title)}
      subTitle={t(message)}
      extra={reloadCallback && [
        <Button key='reload' onClick={() => reloadCallback()}>
          {t('common.actions.reload.title')}
        </Button>,
      ]}
    />
  )
}

export default ErrorResultView
