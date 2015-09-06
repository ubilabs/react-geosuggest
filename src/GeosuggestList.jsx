var _               = require('underscore');
var GeosuggestItem  = require('./GeosuggestItem');
var React           = require('react');


var GeosuggestList = React.createClass({
    propTypes: {
        activeSuggest: React.PropTypes.object,
        isOpen: React.PropTypes.bool.isRequired,
        suggests: React.PropTypes.array.isRequired,
        onSuggestSelect: React.PropTypes.func,
    },
    getInitialState: function(){
        return {
            focusedIndex : -1,
        }
    },
    focusNext: function(){
        var maxIndex = this.props.suggests.length - 1;
        var index = this.state.focusedIndex >= maxIndex ? maxIndex : this.state.focusedIndex + 1;
        this._setFocusIndex(index);
    },
    focusPrev: function(){
        var index = this.state.focusedIndex <= 0 ? 0 : this.state.focusedIndex - 1;
        this._setFocusIndex(index);
    },
    selectFocused: function(){
        this.props.onSuggestSelect(
            this.props.suggests[ this.state.focusedIndex ]
        );
    },
    _handleItemOver: function(item){
        var index = _.findIndex(this.props.suggests,item);

        this._setFocusIndex(index);
    },
    _setFocusIndex: function(index){
        this.setState({focusedIndex:index});
    },
    _getSuggestsClasses: function() {
        var classes = 'geosuggest__suggests';

        classes += !this.props.isOpen ?
          ' geosuggest__suggests--hidden' : '';

        return classes;
    },
    _renderItem: function(item,index) {
        var isFocused = this.state.focusedIndex === index;

        return (// eslint-disable-line no-extra-parens
            <GeosuggestItem
              key={'suggestItem'+index}
              suggest={item}
              isActive={_.isEqual(this.props.activeSuggest,item)}
              isFocus={isFocused}
              onSuggestSelect={this.props.onSuggestSelect} 
              onSuggestOver={this._handleItemOver}/>
        );
    },
    render: function(){
        return (
            <ul className={this._getSuggestsClasses()}>
                {this.props.suggests.map(function(item,index){
                    return this._renderItem(item,index);
                },this)}
            </ul>
        )
    }
});

module.exports = GeosuggestList;