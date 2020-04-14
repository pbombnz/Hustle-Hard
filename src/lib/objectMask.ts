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
 * @param {Record<string, any>} object
 * @param {Array<RegExp | MaskingOption>} options
 */
export default (object: Record<string, any>, options: Array<RegExp | MaskingOption>): object => {
    const deep: Record<string, any> = flatten<Record<string, any>, Record<string, any>>(object)

    // Converts all string-based elements into MaskingOptions
    const _options: Array<MaskingOption> = options.map((opt) => opt instanceof RegExp ? { match: opt } : opt)

    const keysToBeHidden = []
    for (const key in deep) {
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
                    deep[key] = o.set(key, deep[key])
                } else if (typeof o.set === 'string') {
                    deep[key] = o.set
                }
                continue
            }

            // Generic mask apply if other options weren't set.
            deep[key] = '******'
        }
    }

    for (const key of keysToBeHidden) {
        delete deep[key]
    }

    return unflatten(deep)
}
