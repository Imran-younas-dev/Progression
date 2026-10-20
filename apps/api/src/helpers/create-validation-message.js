/* import helpers */
import translate from './translate'

export default function createValidationMessage({ key }) {
    return {
        message: () => translate('validations', key),
    }
}
