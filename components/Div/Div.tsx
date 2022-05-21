import './Div.style.less'

/**
 * NOTE: this simple div wrapper will be useful when migrate to React Native
 * e.g. replacing Div -> View
 */
export const Div: React.FC = ({ children, ...rest }) => (
  <div {...rest}>
    {children}
  </div>
)
