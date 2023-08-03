import * as React from 'react';
import classnames from 'classnames';
import SuggestItem from './suggest-item';
import ISuggest from './types/suggest';

interface IProps {
  readonly isHidden: boolean;
  readonly suggests: ISuggest[];
  readonly suggestsClassName?: string;
  readonly hiddenClassName?: string;
  readonly suggestItemClassName?: string;
  readonly suggestItemActiveClassName?: string;
  readonly activeSuggest: ISuggest | null;
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
    suggest: ISuggest,
    userInput: string
  ) => JSX.Element | string;
  readonly onSuggestSelect: (suggest: ISuggest) => void;
  readonly onSuggestMouseDown: (event: React.MouseEvent) => void;
  readonly onSuggestMouseOut: (event: React.MouseEvent) => void;
}

/**
 * The list with suggestions.
 */
export default class extends React.PureComponent<IProps, unknown> {
  /**
   * Whether or not it is hidden
   */
  isHidden(): boolean {
    return this.props.isHidden || this.props.suggests.length === 0;
  }

  /**
   * There are new properties available for the list
   */
  componentDidUpdate(prevProps: IProps): void {
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
  render(): JSX.Element {
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
        {this.props.suggests.map((suggest) => {
          const isActive =
            (this.props.activeSuggest &&
              suggest.placeId === this.props.activeSuggest.placeId) ||
            false;

          return (
            <SuggestItem
              key={suggest.placeId}
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
