import { useTranslation } from 'react-i18next'
import { Typography } from 'antd'

import './Div.style.less'

const { Paragraph } = Typography

export interface DivProps {

}

const Div: React.FC<DivProps> = ({}) => {
  const { t } = useTranslation()
  return (
    <div className="Div" data-testid="Div">
      <Paragraph>{t('Div.component')}</Paragraph>
    </div>
  )
}

export default Div
