const _ = require('lodash');
const flatten = require('flat').flatten;
const unflatten = require('flat').unflatten;


/**
 * Masks ( or outright hides)sensitive information in the Objects when used in web requests 
 * where it may not be ideal to show the user the field. Such examples could include passwords,
 * credit card information and other PPI.
 * 
 * @param {!{}} object 
 * @param {!(RegExp|{match: RegExp, hide?: boolean, set?: (Function|String)})[]} maskingOptions 
 */
module.exports = (object, maskingOptions) => {
    // Sanity Check - Options must be an array!
    if(!Array.isArray(maskingOptions)) {
        throw TypeError('maskingOptions should be an array.')
    }
    // Sanity Check - Option elements must be a regex object or an object which contains the regex object and other options.
    if(!(maskingOptions.every((value) => _.isRegExp(value) || _.isPlainObject(value)))) {
        throw TypeError('Elements should either be a Regex object or a Object that contains a Regex object and other options')
    }

    let deep = flatten(object);
    
    maskingOptions = maskingOptions.map((opt) => _.isRegExp(opt) ? { match: opt } : opt);

    keysToBeHidden = [];
    for(key in deep) {
        for(const m of maskingOptions) {
            if(!key.match(m.match)) { continue; }
            if(m.hide) {
                keysToBeHidden.push(key);
                continue;
            }
            if(m.set) {
                if(_.isFunction(m.set)) {
                    deep[key] = m.set(key, value);
                } else if(_.isString(m.set)) {
                    deep[key] = m.set;
                }
                continue;
            } 
            deep[key] = '******';
        }
    }

    for(key of keysToBeHidden) {
        delete deep[key];
    }

    return unflatten(deep);
}