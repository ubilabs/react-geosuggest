import * as React from 'react';
import classnames from 'classnames';
import SuggestItem from './suggest-item';
import Suggest from './types/suggest';

interface Props {
  readonly isHidden: boolean;
  readonly suggests: Suggest[];
  readonly suggestsClassName?: string;
  readonly hiddenClassName?: string;
  readonly suggestItemClassName?: string;
  readonly suggestItemActiveClassName?: string;
  readonly activeSuggest: Suggest | null;
  readonly style: any;
  readonly suggestItemStyle: any;
  readonly userInput: string;
  readonly isHighlightMatch: boolean;
  readonly onSuggestNoResults: () => void;
  readonly renderSuggestItem?: (suggest: Suggest, userInput: string) => JSX.Element | string;
  readonly onSuggestSelect: (suggest: Suggest) => void;
  readonly onSuggestMouseDown: (event: React.MouseEvent<Element>) => void;
  readonly onSuggestMouseOut: (event: React.MouseEvent<Element>) => void;
}

/**
 * The list with suggestions.
 */
export default class extends React.PureComponent<Props, {}> {
  /**
   * Whether or not it is hidden
   */
  isHidden(): boolean {
    return this.props.isHidden || this.props.suggests.length === 0;
  }

  /**
   * There are new properties available for the list
   */
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.suggests !== this.props.suggests) {
      if (nextProps.suggests.length === 0) {
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
      <ul className={classes} style={this.props.style}>
        {this.props.suggests.map(suggest => {
          const isActive =
            this.props.activeSuggest &&
            suggest.placeId === this.props.activeSuggest.placeId || false;

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
