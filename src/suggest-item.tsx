import * as React from 'react';
import classnames from 'classnames';
import Suggest from './types/suggest';

interface Props {
  readonly userInput: string;
  readonly isActive: boolean;
  readonly className: string;
  readonly suggestItemClassName?: string;
  readonly activeClassName?: string;
  readonly suggest: Suggest;
  readonly isHighlightMatch: boolean;
  readonly style: any;
  readonly onSelect: (suggest: Suggest) => void;
  readonly renderSuggestItem?: (suggest: Suggest, userInput: string) => JSX.Element | string;
  readonly onMouseDown: (event: React.MouseEvent) => void;
  readonly onMouseOut: (event: React.MouseEvent) => void;
}

/**
 * A single Geosuggest item in the list
 */
export default class extends React.PureComponent<Props, {}> {
  /**
   * The reference to the suggest element
   */
  ref: HTMLLIElement | null = null;

  /**
   * The constructor.
   */
  constructor(props: Props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  /**
   * Makes a text bold
   */
  makeBold(element: string, key: string): JSX.Element {
    return (
      <b className="geosuggest__item__matched-text" key={key}>
        {element}
      </b>
    );
  }

  /**
   * Replace matched text with the same in bold
   */
  formatMatchedText(userInput: string, suggest: Suggest): JSX.Element | string {
    if (!userInput || !suggest.matchedSubstrings) {
      return suggest.label;
    }

    const start: number = suggest.matchedSubstrings.offset;
    const length: number = suggest.matchedSubstrings.length;
    const end: number = start + length;
    const boldPart = this.makeBold(
      suggest.label.substring(start, end),
      suggest.label
    );

    let pre = '';
    let post = '';

    if (start > 0) {
      pre = suggest.label.slice(0, start);
    }
    if (end < suggest.label.length) {
      post = suggest.label.slice(end);
    }

    return (
      <span>
        {pre}
        {boldPart}
        {post}
      </span>
    );
  }

  /**
   * Checking if item just became active and scrolling if needed.
   */
  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.isActive && !this.props.isActive) {
      this.scrollIfNeeded();
    }
  }

  /**
   * Scrolling current item to the center of the list if item needs scrolling.
   * Item is scrolled to the center of the list.
   */
  scrollIfNeeded(): void {
    const element = this.ref;
    const parent = element && element.parentElement;

    if (!element || !parent) {
      return;
    }

    const overTop = element.offsetTop - parent.offsetTop < parent.scrollTop;
    const overBottom =
        element.offsetTop - parent.offsetTop + element.clientHeight >
        parent.scrollTop + parent.clientHeight;

    if (overTop || overBottom) {
      parent.scrollTop =
        element.offsetTop -
        parent.offsetTop -
        parent.clientHeight / 2 +
        element.clientHeight / 2;
    }
  }

  /**
   * When the suggest item got clicked
   */
  onClick(event: React.MouseEvent): void {
    event.preventDefault();
    this.props.onSelect(this.props.suggest);
  }

  /**
   * Render the view
   */
  render(): JSX.Element {
    const {suggest} = this.props;
    const classes = classnames(
      'geosuggest__item',
      this.props.className,
      this.props.suggestItemClassName,
      {'geosuggest__item--active': this.props.isActive},
      {
        [this.props.activeClassName || '']: this.props.activeClassName
          ? this.props.isActive
          : null
      }
    );
    let content: JSX.Element | string = suggest.label;

    if (this.props.renderSuggestItem) {
      content = this.props.renderSuggestItem(suggest, this.props.userInput);
    } else if (this.props.isHighlightMatch) {
      content = this.formatMatchedText(this.props.userInput, suggest);
    }

    return (
      <li
        className={classes}
        ref={li => (this.ref = li)}
        style={this.props.style}
        onMouseDown={this.props.onMouseDown}
        onMouseOut={this.props.onMouseOut}
        onClick={this.onClick}>
        {content}
      </li>
    );
  }
}
