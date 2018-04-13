import { REGEXP_PREFIX, SELECTOR_PREFIX } from './constant';
import { escapeRegExp } from '../utils';
import { 
    searchStyle
    , searchTextStyle
    , searchHighlightStyle
    , searchElementHighlightStyle
    , searchHideStyle
    , infoStyle
    , infoCurrentStyle
    , infoSplitterStyle
    , infoTotalStyle
} from '../style';

export const regSelectorPrefix 
    = new RegExp( '^' + escapeRegExp( SELECTOR_PREFIX ) + '(.*)' );

export const regRegExpPrefix 
    = new RegExp( '^' + escapeRegExp( REGEXP_PREFIX ) + '(.*)' );

export const highlightExcludes = [
    '.' + searchStyle
    , '.' + infoStyle
    , '.' + searchHideStyle
    , '.' + infoCurrentStyle
    , '.' + infoTotalStyle
    , '.' + infoSplitterStyle
    , /style|script|iframe|input|textarea|svg|canvas/i
];
export const hideExcludes = [
    '.' + searchStyle
    , '.' + infoStyle
    , '.' + searchHideStyle
    , /style|script|iframe|h[1-7]/i
];
