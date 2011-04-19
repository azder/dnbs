/**
 Memorizing D 'n' B sizes
 */
(function(GLOBAL, $, undefined) {

	"strict mode"

	var _MODULE = this;
	var _hash = {};

	var _CONSTANTS = {
		defaults: {
			plugin: { headers: true, classes: 'dnbs' },
			female: { cups: 'B', bust: '90' },
			male: {}
		} // defaults
		,
		keys: {
			data: 'dnbs'
		} // keys
	}; // _CONSTANTS

	var _init = function(args) {
		var settings = $.extend({},_CONSTANTS.defaults.plugin,args);
		this.data(_CONSTANTS.keys.data,settings);
		this.html('').addClass(settings.classes);
		return this;
	}; // var _init

	var _addOne = function(args) {

		if(!args.name) {
			return this;
		} // if

		var person = $.extend( { key: args.name } ,_CONSTANTS.defaults.female, args )
		//Array.prototype.push.call(_hash,item);
		_hash[person.name] = person;

		return this;

	}; // var _addOne

	var _add = function(args) {

		if($.isArray(args)) {
			$.each(args, function(index,element) {
				_addOne(element);
			});

			return this;
		} // if

		return _addOne(args);

	}; // var _add

	var _get = function(args) {

		args = args || {};

		if(!!args.all) {
			return _hash;
		} // if args.all

		return $.extend({},_hash[args.key]);

	}; // var _get

	var _renderHead = function(args){
		
		args = args || {};
		var settings = args.settings;
		var $table = $(args.table);
		
		if( !settings || !settings.headers || 0 >= $table.length ) {
			return this;
		} // if
		
		$table.append('<thead class="headers"><tr> \
		<th class="name" >Name</th> \
		<th class="cups" >Cups</th> \
		<th class="bust" >Bust</th> \
		<th class="check" >Check</th> \
		</tr></thead>');
		
	} ; // var _renderHead
	
	var _renderBody = function(args){
	
		args = args || {};
		var settings = args.settings;
		var $table = $(args.table);
		
		if( !settings || !settings.headers || 0 >= $table.length ) {
			return this;
		} // if
	
		var $tbody = $('<tbody></tbody>').appendTo($table);
		var odd = false;
				
		$.each(_hash, function(index,person) {
			odd = !odd;
			var $row = $('<tr class="row" ></tr>');
			$row.append('<td class="name" >' + person.name + '</td>');
			$row.addClass(odd ? 'odd' : 'even' ).attr('data-dnbs-key',person.key);
			$row.append( '<td class="cups" >' + person.cups + '</td>' );
			$row.append( '<td class="bust" >' + person.bust + '</td>' );
			$row.append( '<input type=checkbox class="check" ></td>' );
			$tbody.append( $row );
		}); // $.each
	
	} ; // _renderBody
	
	var _renderControls = function(args){
		
	
	
	} ; // _renderControls
	
	var _show = function(args) {

		var $element = this;
		var settings = $element.data(_CONSTANTS.keys.data) || {};
		$element.html('');

		var $table = $('<table class="table"></table>').appendTo($element);
		
		_renderHead( { settings:settings,table:$table } );
		
		_renderBody( { settings:settings,table:$table } );

		_renderControls();
		
		return this;

	}; // var _show

	var _clear = function(args) {

		args = args || {};

		var $element = this;
		var html = ( 'undefined' === typeof args.html) ? true : !! args.html ;
		if( html) {
			$element.html('');
		} // if html

		if( !!args.data ) {
			_hash = {};
		} // if args.data

		return this;

	}; // var _clear

	var _methods = {
		init: _init,
		add: _add,
		show: _show,
		clear: _clear,
		get: _get
	}; // var _methods

	/**
 	The default message pump for the plugin
 	*/
	$.fn.dnbs = function( method ) {

		if ( _methods[method] ) {
			return _methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return _methods.init.apply( this, arguments );
		} else {
			$.error( 'Method "' +  method + '" does not exist on jQuery.dnbs' );
		}
		// if-else _methods

	}; // $.fn.dnbs

}).call({},window,jQuery);
