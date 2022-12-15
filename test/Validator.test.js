import validator from "../lib/Validator.js";

// NG Test
test("required, but value is ''", () => {
    let result = validator.validateValue({"required": true}, "")
    expect(result.isError).toBe(true);
    expect(result.error.constructor.name).toBe('ValidateError');
})

test("type string, but value is 100", () => {
    let result = validator.validateValue({"type": "string"}, 100)
    expect(result.isError).toBe(true);
    expect(result.error.constructor.name).toBe('ValidateError');
})

test("type number, but value is 'abc'", () => {
    let result = validator.validateValue({"type": "number"}, 'abc')
    expect(result.isError).toBe(true);
    expect(result.error.constructor.name).toBe('ValidateError');
})

test("type date, but value is 'abc'", () => {
    let result = validator.validateValue({"type": "date"}, 'abc')
    expect(result.isError).toBe(true);
    expect(result.error.constructor.name).toBe('ValidateError');
})

test("type hoge, hoge is not supported type", () => {
    let result = validator.validateValue({"type": "hoge"}, 'abc')
    expect(result.isError).toBe(true);
    expect(result.error.constructor.name).toBe('ValidateError');
})

test("regexp, ^123* is not match 'abc", () => {
    let result = validator.validateValue({"regexp": "^123*"}, 'abc')
    expect(result.isError).toBe(true);
    expect(result.error.constructor.name).toBe('ValidateError');
})

test("max, 'abcdefg' is longer than 6 character", () => {
    let result = validator.validateValue({"max": 6}, 'abcdefg')
    expect(result.isError).toBe(true);
    expect(result.error.constructor.name).toBe('ValidateError');
})

test("min, 'ab' is shorter than 3 character", () => {
    let result = validator.validateValue({"min": 3}, 'ab')
    expect(result.isError).toBe(true);
    expect(result.error.constructor.name).toBe('ValidateError');
})

// OK Test
test("required", () => {
    let result = validator.validateValue({"required": true}, "abc")
    expect(result.isError).toBe(false);
})

test("type string", () => {
    let result = validator.validateValue({"type": "string"}, "100")
    expect(result.isError).toBe(false);
})

test("type number", () => {
    let result = validator.validateValue({"type": "number"}, 100)
    expect(result.isError).toBe(false);
})

test("type date", () => {
    let result = validator.validateValue({"type": "date"}, '2022-12-31')
    expect(result.isError).toBe(false);
})

test("regexp", () => {
    let result = validator.validateValue({"regexp": "^123*"}, '12345')
    expect(result.isError).toBe(false);
})

test("max", () => {
    let result = validator.validateValue({"max": 6}, 'abcdef')
    expect(result.isError).toBe(false);
})

test("min", () => {
    let result = validator.validateValue({"min": 3}, 'abc')
    expect(result.isError).toBe(false);
})