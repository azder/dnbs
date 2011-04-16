/**
   Memorizing D 'n' B sizes
*/
(function(GLOBAL, $, undefined){

   var _MODULE = this;
   var _array = [];

   var _CONSTANTS = {
       itemDefaults: { cups: 'BB', bust: '90' }
   };

   var _init = function(){
       this.html(''); return this;
   }; // var _init

   var _add = function(args){

       if(!args.name){
           return this;
       } // if

       var item = $.extend( {} ,_CONSTANTS.itemDefaults, args );
       _array.push(item);

       return this;

   }; // var _add

   var _list = function(args){
       var $element = this;
       $element.html('');
	var odd = true;
       $.each(_array,function(index,item){
	odd = !odd;
           $element.append('<span class="row '+(odd?'odd':'even')+' ">'+ item.name + ', ' + item.cups + ', ' + item.bust +'</span><br />');
       });
       return this;
   }; // var _list

   var _clear = function(args){

       args = args || {};

       var $element = this;
       var html = ( 'undefined' === typeof args.html) ? true : !! args.html ;
       if( html){
           $element.html('');
       } // if html

       if( !!args.data ){
           _array = [];
       } // if args.data

       return this;

   }; // var _clear

   var _methods = {
       init: _init,
       add: _add,
       list: _list,
       clear: _clear
   }; // MODULE._methods = {} ;

   /**
   The default message pump for the plugin
   */
   $.fn.dnbs = function( method ) {

       if ( _methods[method] ) {
         return _methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
       } else if ( typeof method === 'object' || ! method ) {
         return _methods.init.apply( this, arguments );
       } else {
         $.error( 'Method "' +  method + '" does not exist on jQuery.ace' );
       }

   }; // $.fn.dnbs

})(window,$jq);
