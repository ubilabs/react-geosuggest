import * as React from 'react';
import classnames from 'classnames';
import SuggestItem from './suggest-item';

import {Suggest} from './types/suggest';

interface Props {
  readonly isHidden: boolean;
  readonly suggests: Suggest[];
  readonly suggestsClassName?: string;
  readonly hiddenClassName?: string;
  readonly suggestItemClassName?: string;
  readonly suggestItemActiveClassName?: string;
  readonly activeSuggest: Suggest | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly style: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly suggestItemStyle: any;
  readonly userInput: string;
  readonly isHighlightMatch: boolean;
  readonly listId: string;
  readonly listLabel: string;
  readonly onSuggestNoResults: () => void;
  readonly renderSuggestItem?: (
    suggest: Suggest,
    userInput: string
  ) => React.JSX.Element | string;
  readonly onSuggestSelect: (suggest: Suggest) => void;
  readonly onSuggestMouseDown: (event: React.MouseEvent) => void;
  readonly onSuggestMouseOut: (event: React.MouseEvent) => void;
}

/**
 * The list with suggestions.
 */
export default class SuggestList extends React.PureComponent<Props, unknown> {
  /**
   * Whether or not it is hidden
   */
  isHidden(): boolean {
    return this.props.isHidden || this.props.suggests.length === 0;
  }

  /**
   * Generate a unique key for each suggestion
   */
  getSuggestionKey(suggest: Suggest, index: number): string {
    // Use placeId if available, otherwise fall back to combination of label and index
    return suggest.placeId || `${suggest.label}_${index}`;
  }

  /**
   * There are new properties available for the list
   */
  componentDidUpdate(prevProps: Props): void {
    if (prevProps.suggests !== this.props.suggests) {
      if (this.props.suggests.length === 0) {
        this.props.onSuggestNoResults();
      }
    }
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render(): React.JSX.Element {
    const classes = classnames(
      'geosuggest__suggests',
      this.props.suggestsClassName,
      {'geosuggest__suggests--hidden': this.isHidden()},
      {
        [this.props.hiddenClassName || '']: this.props.hiddenClassName
          ? this.isHidden()
          : null
      }
    );

    return (
      <ul
        className={classes}
        style={this.props.style}
        role="listbox"
        aria-label={this.props.listLabel}
        id={this.props.listId}>
        {this.props.suggests.map((suggest, index) => {
          const isActive =
            (this.props.activeSuggest &&
              suggest.placeId === this.props.activeSuggest.placeId) ||
            false;

          return (
            <SuggestItem
              key={this.getSuggestionKey(suggest, index)}
              className={suggest.className || ''}
              userInput={this.props.userInput}
              isHighlightMatch={this.props.isHighlightMatch}
              suggest={suggest}
              style={this.props.suggestItemStyle}
              suggestItemClassName={this.props.suggestItemClassName}
              isActive={isActive}
              activeClassName={this.props.suggestItemActiveClassName}
              onMouseDown={this.props.onSuggestMouseDown}
              onMouseOut={this.props.onSuggestMouseOut}
              onSelect={this.props.onSuggestSelect}
              renderSuggestItem={this.props.renderSuggestItem}
            />
          );
        })}
      </ul>
    );
  }
}
