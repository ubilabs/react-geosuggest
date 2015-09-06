/* global google */

var _               = require('underscore');
var GeosuggestList  = require('./GeosuggestList'); // eslint-disable-line
var React           = require('react');
   

var Geosuggest = React.createClass({
    propTypes: {
        bounds: React.PropTypes.object,
        className: React.PropTypes.string,
        country: React.PropTypes.string,
        fixtures: React.PropTypes.array,
        googleMaps: React.PropTypes.object,
        initialValue: React.PropTypes.string,
        location: React.PropTypes.object,
        language: React.PropTypes.string,
        onBlur: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onSuggestSelect: React.PropTypes.func,
        placeholder: React.PropTypes.string,
        radius: React.PropTypes.number,
        types: React.PropTypes.array,
    },
    getInitialState: function() {
        return {
            activeSuggest:null,
            isSuggestsHidden: true,
            suggests: [],
            userInput: '',
        };
    },
    componentDidMount: function(){
        // set the initial input value
        if( typeof this.props.initialValue  === 'string' )
        {
            this._setInputValue(this.props.initialValue);
        }

        // check that googleAPI is available
        this.googleMaps = google.maps || this.props.googleMaps;

        if(!this.googleMaps)
        {
            console.error('Google map api was not found in the page.');
        }

        if(!this.googleMaps.places)
        {
            console.error('Google places library was not found in the page.');
        }

        // init google services
        this.autocompleteService  =  new this.googleMaps.places.AutocompleteService();
        this.geocoder             = new this.googleMaps.Geocoder();
        this._cachedRequests      = {};
    },
    shouldComponentUpdate: function(nextProps,nextState){
        return !_.isEqual(this.state,nextState);
    },
    componentDidUpdate: function(prevProps,prevState){
        if( this.state.userInput !== prevState.userInput && this.state.userInput.length ){
            this._searchSuggests(this.state.userInput);
        }
    },
    clear: function () {
        this.setState({
            isSuggestsHidden: true,
            suggests: [],
            userInput: '',
        });
    },
    update: function(value){
        this._setInputValue(value);
    },
    _handleChangeInput: function(e) {
        // set the value and open the suggests list if it's not opened yet
        this._setInputValue(e.target.value,this._openList);
    },
    _handleInputKeyDown: function(event) {
        switch (event.which) {
          case 40: // DOWN
            event.preventDefault();
            this.refs.geosuggestList.focusNext();
            break;
          case 38: // UP
            event.preventDefault();
            this.refs.geosuggestList.focusPrev();
            break;
          case 13: // ENTER
            this.refs.geosuggestList.selectFocused();
            break;
          case 9: // TAB
            this.refs.geosuggestList.selectFocused();
            break;
          case 27: // ESC
            this._closeList();
            break;
        }
    },
    _handleBlurInput: function(e){
        this._closeList();
    },
    _handleFocusInput: function(e){
        this._openList();
    },
    _handleSelectItem: function(item){
        // select the item and close the suggets list
        this._setActiveSuggest(item);

        // get info about the selection and call the handler
        // passed by props
        this._geocodeSuggest(item,function(result){
            if(typeof this.props.onSuggestSelect === 'function')
                this.props.onSuggestSelect(item);
        }.bind(this));
    },
    _setInputValue: function(value,next){
        this.setState({userInput:value},next);
    },
    _setActiveSuggest: function(suggest,next){
        this.setState({
          userInput:suggest ? suggest.label : '', // set input value 
          activeSuggest:suggest,   // set active suggest
          isSuggestsHidden: true,  // close list
          suggests: [],            // empty list
        });
    },
    _navigateSuggest:function(direction){
        var index = _.findIndex(this.state.suggests,this.state.activeSuggest);
        var newIndex = direction === 'next' ? newIndex + 1 : newIndex - 1;
        var maxIndex = this.state.suggests.length - 1;

        if( newIndex < 0 ) {
            newIndex = 0;
        } else if ( newIndex > maxIndex ) {
            newIndex = maxIndex;
        }

        this.setState({activeSuggest:this.state.suggests[newIndex]});
    },
    _setSuggests: function(suggestsGoogle) {
        if (!suggestsGoogle) {
            suggestsGoogle = [];
        }

        var suggests = [],
        regex = new RegExp(this.state.userInput, 'gim');

        this.props.fixtures.forEach(function(suggest) {
            if (suggest.label.match(regex)) {
              suggest.placeId = suggest.label;
              suggests.push(suggest);
            }
        });

        suggestsGoogle.forEach(function(suggest) {
            suggests.push({
                label: suggest.description,
                placeId: suggest.place_id
            });
        });

        this.setState({suggests: suggests});
    },
    _searchSuggests: function() {
        if( this._cachedRequests[this.state.userInput] )
        {
            return this._setSuggests(this._cachedRequests[this.state.userInput]);
        }

        var options = {
            input: this.state.userInput,
        };

        var conditionalKeys = ['location','language','radius','bounds','types'];

        conditionalKeys.forEach(function(key){
            if(this.props[key])
            {
                options[key] = this.props[key]
            }
        }.bind(this));

        if (this.props.country) {
            options.componentRestrictions = {
                country: this.props.country
            };
        }

        this.autocompleteService.getPlacePredictions(options,function(suggestsGoogle){
            this._cachedRequests[this.state.userInput] = suggestsGoogle;
            this._setSuggests(suggestsGoogle);
        }.bind(this));
    },
    _openList: function() {
        if( this.state.isSuggestsHidden )
        {
            this.setState({isSuggestsHidden: false});
        }
    },
    _closeList: function() {
        if( !this.state.isSuggestsHidden )
        {
            this.setState({isSuggestsHidden: true});
        }
    },
    _geocodeSuggest: function(suggest,next) {
      this.geocoder.geocode({address: suggest.label}, function(results, status) {
          if (status !== this.googleMaps.GeocoderStatus.OK) {
            return;
          }

          var gmaps = results[0],
            location = gmaps.geometry.location;

          suggest.gmaps = gmaps;
          suggest.location = {
            lat: location.lat(),
            lng: location.lng()
          };

          next(suggest);
      }.bind(this));
    },
    render: function() {
      var className = this.props.className || '';

      return (// eslint-disable-line no-extra-parens
          <div className={'geosuggest ' + className}>
              <input
                className="geosuggest__input"
                ref="geosuggestInput"
                type="text"
                value={this.state.userInput}
                placeholder={this.props.placeholder}
                onKeyDown={this._handleInputKeyDown}
                onChange={this._handleChangeInput}
                onFocus={this._handleFocusInput}
                onBlur={this._handleBlurInput} />
                  <GeosuggestList
                    ref="geosuggestList"
                    activeSuggest={this.state.activeSuggest}
                    isOpen={!this.state.isSuggestsHidden}
                    onSuggestSelect={this._handleSelectItem}
                    suggests={this.state.suggests}/>
          </div>
      );
    }
});

module.exports = Geosuggest;
