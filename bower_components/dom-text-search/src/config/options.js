import $ from 'jquery';
import { highlightExcludes, hideExcludes } from '../config';
import { isArray, isObject } from '../utils';

let options = {
    highlightExcludes: highlightExcludes.slice() 
    , hideExcludes: hideExcludes.slice()
};
let uniqueArray = $.unique || $.uniqueSort;

function get() {
    return options;
}

function merge( newOptions ) {
    newOptions = newOptions || {};
    for ( let i in newOptions ) {
        if ( isArray( options[ i ] ) && isArray( newOptions[ i ] ) ) {
            options[ i ] = uniqueArray( options[ i ].concat( newOptions[ i ] ) );
        }
        else if ( isObject( options[ i ] ) && isObject( newOptions ) ) {
            options[ i ] = $.extend( {}, options[ i ], newOptions[ i ] );
        }
        else {
            options[ i ] = newOptions[ i ];
        }
    }
    return options;
}

export { merge };
