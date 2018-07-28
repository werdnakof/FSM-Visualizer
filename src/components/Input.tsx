import * as React from 'react';

interface Props {
  placeholder: string
  text: string
  getText: (text: string) => void
}

export default class Input extends React.Component<Props, null> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <input type="text"
             placeholder={this.props.placeholder}
             value={this.props.text}
             onChange={e => this.props.getText(e.target.value)}/>
    )
  }
}
