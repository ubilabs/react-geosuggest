var _     = require('underscore');
var React = require('react');

var GeosuggestItem = React.createClass({
  propTypes: {
      isActive: React.PropTypes.bool,
      isFocus: React.PropTypes.bool,
      onSuggestOver: React.PropTypes.func,
      onSuggestSelect: React.PropTypes.func,
      suggest: React.PropTypes.object.isRequired,
  },
  getDefaultProps: function() {
    return {
      isActive: false,
      isFocus: false,
    };
  },
  shouldComponentUpdate: function(nextProps,nextState){
      return !_.isEqual(nextProps,this.props);
  },
  _handleMouseOver: function(e){
      e.preventDefault();
      if(typeof this.props.onSuggestOver === 'function')
      {
          this.props.onSuggestOver(this.props.suggest);
      }
  },
  _handleClick: function(e){
      e.preventDefault();
      if(typeof this.props.onSuggestSelect === 'function')
      {
          this.props.onSuggestSelect(this.props.suggest);
      }
  },
  _getSuggestClasses: function() {
      var classes = 'geosuggest__suggests-item';

      classes += this.props.isActive ? ' geosuggest__suggests-item--active' 
          : this.props.isFocus ? ' geosuggest__suggests-item--focus' : '';

      return classes;
  },
  render: function() {
    return (// eslint-disable-line no-extra-parens
      <li 
        className={this._getSuggestClasses()}
        onClick={this._handleClick}
        onMouseEnter={this._handleMouseOver}>
          {this.props.suggest.label}
      </li>
    );
  },
});

module.exports = GeosuggestItem;
