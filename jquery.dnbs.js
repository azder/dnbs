/**
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
		
		var $element = this;
		var settings = $.extend({},_CONSTANTS.defaults.plugin,args);
		$element.data(_CONSTANTS.keys.data,settings);
		$element.html('').addClass(settings.classes);
	
		return this;

	}; // var _init
		
	var _removeOne = function(args) {
		var $element = $(args.element);
		console.log('element : ',$element);
		var $parent = $element.closest('[data-dnbs-key]').remove();		
		var key = $parent.attr('data-dnbs-key');
		console.log('this is the key value : ', key);
		delete _hash[key];
	}

	var _addOne = function(args) {
		
		//console.log('>> _addOne()', this, args);

		if(!args.name) {
			alert('Name field is required!');
			var test = $('input[name^="name"]').focus();
			return false;
		} // if
		
        var key = '' + (args.key || args.name);
		console.log('this is test -- -- -- ', key);
		//console.log('-- _addOne()', this, args, key);
		
		var person = $.extend( { key: key } ,_CONSTANTS.defaults.female, args )

		//Array.prototype.push.call(_hash,item);
		_hash[key] = person;
		
		
		return this;

	}; // var _addOne

	var _add = function(args) {
	
		return this.each(function(index,element){
			
			var $dnbsElement = $(element);
			
			// console.log('-- _add() $element: ', $dnbsElement);
		
			if($.isArray(args)) {
				
				$.each(args, function(index,arg) {
					_addOne(arg);
				}); // $.each args

				return this;
				
			} // if
		
			return _addOne(args);
		
		}); // this.each

	}; // var _add

	var _get = function(args) {

		args = args || {};

		if(!!args.all) {
			return _hash;
		} // if args.all

		return $.extend({},_hash[args.key]);

	}; // var _get
	/*
		var _validate = function(){
			
			var name = $('input[name="name"]').val();
			var cups = $('input[name="cups"]').val();
			var bust = $('input[name="bust"]').val();
			
			var name1 = $('#testTextBox').val();
			
			if (!name1) {
				alert('Empty string');
				return false;
			}
			
			return true;
			
		}; // var _validate
		*/

	var _renderHead = function(args){
		
		args = args || {};
		var settings = args.settings;
		var $table = $(args.table);
		
		if( !settings || !settings.headers || 0 >= $table.length ) {
			return this;
		} // if
		
		var $thead = $('<thead class="headers"><tr> \
		<th class="name" >Name</th> \
		<th class="cups" >Cups</th> \
		<th class="bust" >Bust</th> \
		<th class="check" >Check</th> \
		</tr></thead>').appendTo($table);
		
		return $thead;
		
	} ; // var _renderHead
	
	var _renderBody = function(args){
	
		args = args || {};
		var $table = $(args.table);
		
		if( 0 >= $table.length ) {
			return this;
		} // if
	
		var $tbody = $('<tbody></tbody>').appendTo($table);
		var odd = false;
				
		//$.each(_hash, function(index,person) {
		console.log('-- _renderBody() _hash:', _hash);
		for(var key in _hash){
			var person = _hash[key];
			console.log('-- _renderBody() person:', person);
			odd = !odd;
			var $row = $('<tr class="row" ></tr>');
			$row.append('<td class="name" >' + person.name + '</td>');
			$row.addClass(odd ? 'odd' : 'even' ).attr('data-dnbs-key',person.key);
			$row.append( '<td class="cups" >' + person.cups + '</td>' );
			$row.append( '<td class="bust" >' + person.bust + '</td>' );
			$row.append( '<td class="delete"><a class="delete" href="javascript: return false;" >X</a></td>' );
			$tbody.append( $row );
		} // for person
		//}); // $.each
		
		return $tbody;
		
	} ; // _renderBody
	
	var _addRecord = function(args) {

		args = args || {};
		
		$row.append('<td class="name" >' + person.name + '</td>');
		$row.addClass(odd ? 'odd' : 'even' ).attr('data-dnbs-key', person.key);
		$row.append( '<td class="cups" >' + person.cups + '</td>' );
		$row.append( '<td class="bust" >' + person.bust + '</td>' );
		$row.append( '<td class="delete"><a class="delete" href="javascript: return false;" >X</a></td>' );
		$tbody.append( $row );
	}
	
	var _renderControls = function(args){
			
			console.log('>> _renderControls',this,args);
			
			args = args || {};
			var $table = $(args.table);
	
			if( 0 >= $table.length ) {
				console.log('<< _renderControls','$table.length <= 0');
				return this;
			} // if
			
			var $tfoot = $('<tfoot></tfoot>').appendTo($table);
			var odd = false;
			
			var $tr = $('<tr class="add"></tr>').appendTo($tfoot);
			
			$tr.append('<td class="name" ><input type="text" placeholder="Name" name="name" id="testTextBox" class="textbox"></input></td>');
			$tr.append('<td class="cups" ><input type="text" placeholder="Cups" name="cups" class="textbox"></input></td>');
			$tr.append('<td class="bust" ><input type="text" placeholder="Bust" name="bust" class="textbox"></input></td>');
			$tr.append('<td class="add" ><input type="submit" value="Add" class="button add"></td>');
			
			var $submit = $tr.find('input.button.add');
			console.log('-- _renderControls', '$submit',$submit);
			
			console.log('<< _renderControls',$tr);
			return $tfoot;
			 
	} ; // _renderControls
	 
	var _show = function(args) {

		var $element = this;
		var settings = $element.data(_CONSTANTS.keys.data) || {};
		$element.html('');

		var $table = $('<table class="table"></table>').appendTo($element);
		
		_renderHead( { settings:settings,table:$table } );
		
		_renderBody( { settings:settings,table:$table } );

		_renderControls( { table:$table } );
		
		_addEvents({ element:$element });
		
		return this;

	}; // var _show
	
	var _addEvents = function(args){
		
		args = args || {};
		
		var $element = $(args.element);
		var $this = $(this);
		
		var $tbody = $element.find('tbody');
		$element.find('.delete').live('click', function(event) {
			console.log('-- _addEvents() :', event.target);
			_removeOne({ element:event.target });
			return false;
		});
		
		$element.find('.button.add').bind('click', function(index, element) {
		
			var name = $('input[name^="name"]').val();
			var cups = $('input[name^="cups"]').val();
			var bust = $('input[name^="bust"]').val();
			
			_addOne( { name: name, cups: cups || undefined, bust: bust || undefined } );
			_show.call($element);
		
		});	 // $element.find()
	
	} ; // var _addEvents
			
	var _clear = function(args) {

		args = args || {};

		var $element = this;
		var html = ( 'undefined' === typeof args.html) ? true : !! args.html;
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
