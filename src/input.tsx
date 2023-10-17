import * as React from 'react';
import classnames from 'classnames';

import filterInputAttributes from './filter-input-attributes';

import {Suggest} from './types/suggest';

interface Props {
  readonly value: string;
  readonly className?: string;
  readonly id?: string;
  readonly doNotSubmitOnEnter?: boolean;
  readonly ignoreEnter?: boolean;
  readonly ignoreTab?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly style?: any;
  readonly autoComplete?: string;
  readonly isSuggestsHidden: boolean;
  readonly activeSuggest: Suggest | null;
  readonly listId: string;
  readonly label?: string;
  readonly inputType: string;
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
export default class Input extends React.PureComponent<Props, unknown> {
  /* eslint-disable @typescript-eslint/no-empty-function */
  /**
   * Default values for the properties
   */
  static defaultProps: Props = {
    activeSuggest: null,
    autoComplete: 'off',
    className: '',
    isSuggestsHidden: true,
    listId: '',
    inputType: 'text',
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
  /* eslint-enable @typescript-eslint/no-empty-function */

  /**
   * The reference to the input element
   */
  input: HTMLInputElement | null = null;

  /**
   * The constructor.
   */
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
  }

  /**
   * When the input got changed
   */
  onChange(): void {
    if (this.input) {
      this.props.onChange(this.input.value);
    }
  }

  /**
   * When a key gets pressed in the input
   */
  // eslint-disable-next-line complexity
  onInputKeyDown(event: React.KeyboardEvent): void {
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
  focus(): void {
    if (this.input) {
      this.input.focus();
    }
  }

  /**
   * Blur the input
   */
  blur(): void {
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
    const shouldRenderLabel = this.props.label && this.props.id;

    if (!attributes.tabIndex) {
      attributes.tabIndex = 0;
    }

    return (
      <>
        {shouldRenderLabel && (
          <label
            className="geosuggest__label"
            htmlFor={`geosuggest__input${
              this.props.id ? `--${this.props.id}` : ''
            }`}>
            {this.props.label}
          </label>
        )}
        <input
          className={classes}
          id={`geosuggest__input${this.props.id ? `--${this.props.id}` : ''}`}
          ref={(i): HTMLInputElement | null => (this.input = i)}
          type={this.props.inputType}
          {...attributes}
          value={this.props.value}
          style={this.props.style}
          onKeyDown={this.onInputKeyDown}
          onChange={this.onChange}
          onKeyPress={this.props.onKeyPress}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          role="combobox"
          aria-expanded={!this.props.isSuggestsHidden}
          aria-activedescendant={
            this.props.activeSuggest
              ? this.props.activeSuggest.placeId
              : // eslint-disable-next-line no-undefined
                undefined
          }
          aria-owns={this.props.listId}
        />
      </>
    );
  }
}
