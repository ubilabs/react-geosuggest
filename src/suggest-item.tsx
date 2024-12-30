import * as React from 'react';
import classnames from 'classnames';

import {Suggest} from './types/suggest';

interface Props {
  readonly userInput: string;
  readonly isActive: boolean;
  readonly className: string;
  readonly suggestItemClassName?: string;
  readonly activeClassName?: string;
  readonly suggest: Suggest;
  readonly isHighlightMatch: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly style: any;
  readonly onSelect: (suggest: Suggest) => void;
  readonly renderSuggestItem?: (
    suggest: Suggest,
    userInput: string
  ) => React.JSX.Element | string;
  readonly onMouseDown: (event: React.MouseEvent) => void;
  readonly onMouseOut: (event: React.MouseEvent) => void;
}

/**
 * A single Geosuggest item in the list
 */
export default class SuggestItem extends React.PureComponent<Props, unknown> {
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
  makeBold(element: string) {
    return <b className="geosuggest__item__matched-text">{element}</b>;
  }

  /**
   * Replace matched text with the same in bold
   */
  formatMatchedText(
    userInput: string,
    suggest: Suggest
  ): React.JSX.Element | string {
    if (!userInput || !suggest.matchedSubstrings) {
      return suggest.label;
    }

    const parts = [];

    let previousEnd = 0;

    for (const {offset: start, length} of suggest.matchedSubstrings) {
      // Add non-matching substring before and between matches
      if (start > previousEnd) {
        parts.push(suggest.label.substring(previousEnd, start));
      }

      // Add matching substring as bold text
      const end = start + length;
      const match = this.makeBold(suggest.label.substring(start, end));
      parts.push(match);

      previousEnd = end;
    }

    // Add non-matching substring after matches
    if (previousEnd < suggest.label.length) {
      parts.push(suggest.label.substring(previousEnd));
    }

    return <span>{parts}</span>;
  }

  /**
   * Checking if item just became active and scrolling if needed.
   */
  componentDidUpdate(prevProps: Props): void {
    if (!prevProps.isActive && this.props.isActive) {
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
  render(): React.JSX.Element {
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
    let content: React.JSX.Element | string = suggest.label;

    if (this.props.renderSuggestItem) {
      content = this.props.renderSuggestItem(suggest, this.props.userInput);
    } else if (this.props.isHighlightMatch) {
      content = this.formatMatchedText(this.props.userInput, suggest);
    }

    return (
      <li
        className={classes}
        ref={(li: HTMLLIElement | null) => {
          this.ref = li;
        }}
        style={this.props.style}
        onMouseDown={this.props.onMouseDown}
        onMouseOut={this.props.onMouseOut}
        onClick={this.onClick}
        role="option"
        aria-selected={this.props.isActive}
        id={suggest.placeId}>
        {content}
      </li>
    );
  }
}
