// WingBlank
import React from 'react';
import { View } from 'react-native';
import varibles from '../style/themes/default';

import WingBlankProps from './PropsType';

class WingBlank extends React.Component<WingBlankProps, any> {

  static defaultProps = {
    size: 'lg',
  };

  render() {
    const { size, style, children } = this.props;
    return (<View style={[{
      marginLeft: varibles[`h_spacing_${size}`],
      marginRight: varibles[`h_spacing_${size}`]}, style]}
    >
      {children}
    </View>);
  }
}

export default WingBlank;
