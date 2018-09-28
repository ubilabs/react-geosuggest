import * as React from 'react';
import classnames from 'classnames';

import filterInputAttributes from './filter-input-attributes';

interface IProps {
  readonly value: string;
  readonly className?: string;
  readonly doNotSubmitOnEnter?: boolean;
  readonly ignoreEnter?: boolean;
  readonly ignoreTab?: boolean;
  readonly style?: any;
  readonly autoComplete?: string;
  readonly onChange: (value: string) => void;
  readonly onSelect: () => void;
  readonly onKeyDown?: (event: React.KeyboardEvent) => void;
  readonly onKeyPress?: (event: React.KeyboardEvent) => void;
  readonly onNext: () => void;
  readonly onPrev: () => void;
  readonly onEscape: () => void;
  readonly onFocus: () => void;
  readonly onBlur: () => void;
}

/**
 * The input field
 */
export default class extends React.PureComponent<IProps, {}> {
  /* tslint:disable:no-empty */
  /**
   * Default values for the properties
   */
  static defaultProps: IProps = {
    autoComplete: 'nope',
    className: '',
    onBlur: () => {},
    onChange: () => {},
    onEscape: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    onKeyPress: () => {},
    onNext: () => {},
    onPrev: () => {},
    onSelect: () => {},
    value: ''
  };
  /* tslint:enable:no-empty */

  /**
   * The reference to the input element
   */
  input: HTMLInputElement | null = null;

  /**
   * The constructor.
   */
  constructor(props: IProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
  }

  /**
   * When the input got changed
   */
  onChange() {
    if (this.input) {
      this.props.onChange(this.input.value);
    }
  }

  /**
   * When a key gets pressed in the input
   */
  onInputKeyDown(event: React.KeyboardEvent) {
    // Call props.onKeyDown if defined
    // Gives the developer a little bit more control if needed
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    switch (event.which) {
      case 40: // DOWN
        if (!event.shiftKey) {
          event.preventDefault();
          this.props.onNext();
        }
        break;
      case 38: // UP
        if (!event.shiftKey) {
          event.preventDefault();
          this.props.onPrev();
        }
        break;
      case 13: // ENTER
        if (this.props.doNotSubmitOnEnter) {
          event.preventDefault();
        }

        if (!this.props.ignoreEnter) {
          this.props.onSelect();
        }
        break;
      case 9: // TAB
        if (!this.props.ignoreTab) {
          this.props.onSelect();
        }
        break;
      case 27: // ESC
        this.props.onEscape();
        break;
      /* istanbul ignore next */
      default:
        break;
    }
  }

  /**
   * Focus the input
   */
  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  /**
   * Blur the input
   */
  blur() {
    if (this.input) {
      this.input.blur();
    }
  }

  /**
   * Render the view
   */
  render(): JSX.Element {
    const attributes = filterInputAttributes(this.props);
    const classes = classnames('geosuggest__input', this.props.className);

    return (
      <input
        className={classes}
        ref={i => (this.input = i)}
        type="text"
        {...attributes}
        value={this.props.value}
        style={this.props.style}
        onKeyDown={this.onInputKeyDown}
        onChange={this.onChange}
        onKeyPress={this.props.onKeyPress}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      />
    );
  }
}
