class ValidateError extends Error {
    constructor(message, kind) {
        super(message)
        this.kind = kind
        this.name = "ValidationError"
    }
}

class Validator {

    static validateValue(rule, value) {
        let validationResult = {'isError': false, error: null}

        try {
            // required
            if(rule.required) {
                if(!value) {
                    throw new ValidateError('value is empty. value is required', 'required')
                }
            }

            // type
            if(value.toString().length > 0) {
                if('type' in rule) {
                    if(rule.type === 'string') {
                        if (typeof value != 'string') {
                            throw new ValidateError(value.toString() + ' is not string', 'type')
                        }
                    }else if(rule.type === 'number') {
                        if (typeof value != 'number') {
                            throw new ValidateError(value.toString() + ' is not number', 'type')
                        }
                    }else if(rule.type === 'date') {
                        let date = new Date(value)
                        if(isNaN(date.getTime())) {
                            throw new ValidateError(value.toString() + ' is not date string', 'type')
                        }
                    }else{
                        throw new ValidateError('unexpected type ' + rule.type.toString() + ' is specified', 'type')
                    }
                }
            }

            // regexp
            if('regexp' in rule) {
                let re = new RegExp(rule.regexp)
                if(!re.test(value)) {
                    throw new ValidateError(value.toString() + ' does not match ' + rule.regexp, 'regexp')
                }
            }

            // max
            if('max' in rule) {
                if(value.length > rule.max) {
                    throw new ValidateError(value.toString() + ' is longer than defined length ' + rule.max, 'max')
                }
            }
            // min
            if('min' in rule) {
                if(value.length < rule.min) {
                    throw new ValidateError(value.toString() + ' is shorter than defined length ' + rule.min, 'min')
                }
            }

            return validationResult
        } catch (e) {
            validationResult['isError'] = true
            validationResult['error'] = e
            return validationResult
        }
    }

    static validateObject(subject) {
        for (let elem in subject) {
            this.validateValue(elem.rule, elem.value)
        }
    }
}
module.exports = Validator;
