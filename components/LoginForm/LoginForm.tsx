import { useTranslation } from 'react-i18next'
import { Form, Input, Button } from 'antd'

import './LoginForm.style.less'

const { Item: FormItem } = Form

export interface LoginFormProps {

}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const { t } = useTranslation()
  const onFinish = () => {}
  const onFinishFailed = () => {}
  return (
    <Form
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <FormItem
        label={t('.username')}
        name="username"
        rules={[{
          required: true,
          message: 'Please input your username!',
        }]}
      >
        <Input />
      </FormItem>

      <FormItem
        label={t('.password')}
        name="password"
        rules={[{
          required: true,
          message: 'Please input your password!',
        }]}
      >
        <Input.Password />
      </FormItem>

      <FormItem wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {t('')}
        </Button>
      </FormItem>
    </Form>
  )
}

export default LoginForm
