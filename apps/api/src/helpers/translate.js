/* import lang */
import errors from '../lang/en/errors'
import messages from '../lang/en/messages'
import validations from '../lang/en/validations'

const tables = {
    errors,
    messages,
    validations,
}

export default function translate(type, key, replacements = {}) {
    const table = tables[type] || {}
    let text = table[key] || key

    Object.entries(replacements).forEach(([name, value]) => {
        text = text.replaceAll(`:${name}`, String(value))
    })

    return text
}
