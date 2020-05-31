import { flatten, unflatten } from 'flat'

type MaskingOptionSetFn = (key: string, value: any) => string;

interface MaskingOption {
    match: RegExp;
    hide?: boolean;
    set?: string | MaskingOptionSetFn;
}

/**
 * Masks ( or outright hides)sensitive information in the Objects when used in web requests
 * where it may not be ideal to show the user the field. Such examples could include passwords,
 * credit card information and other PPI.
 *
 * @param {Record<string, any>} input
 * @param {Array<RegExp | MaskingOption>} options
 * @returns {Record<string, any>}
 */
export const mask = (input: Record<string, any>, options: Array<RegExp | MaskingOption>): Record<string, any> => {
    input = flatten(input)
    // Converts all string-based elements into MaskingOptions
    const _options: Array<MaskingOption> = options.map((opt) => opt instanceof RegExp ? { match: opt } : opt)

    const keysToBeHidden = []
    for (const key in input) {
        for (const o of _options) {
            // Do not progress if no match is detected.
            if (!key.match(o.match)) { continue }

            // Hide the field completely from output (user specified).
            if (o.hide) {
                keysToBeHidden.push(key)
                continue
            }
            // Set the field explictly to be a static string OR calcuated based on the key and/or value  (user specified).
            if (o.set) {
                if (typeof o.set === 'function') {
                    input[key] = o.set(key, input[key])
                } else if (typeof o.set === 'string') {
                    input[key] = o.set
                }
                continue
            }

            // Generic mask apply if other options weren't set.
            input[key] = '******'
        }
    }

    for (const key of keysToBeHidden) {
        delete input[key]
    }

    return unflatten(input)
}

export const hide = (input: Record<string, any>, options: Array<RegExp>): Record<string, any> => {
    input = flatten(input)

    const keysToBeHidden = []
    for (const key in input) {
        for (const o of options) {
            // Do not progress if no match is detected.
            if (key.match(o)) {
                keysToBeHidden.push(key)
            }
        }
    }

    for (const key of keysToBeHidden) {
        delete input[key]
    }

    return unflatten(input)
}

export const isMatch = (input: Record<string, any>, options: Array<RegExp>): boolean => {
    input = flatten(input)

    for (const key in input) {
        for (const o of options) {
            // Do not progress if no match is detected.
            if (key.match(o)) {
                return true
            }
        }
    }
    return false
}