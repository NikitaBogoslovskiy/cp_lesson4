import {MiniMaple} from "../src/miniMaple";

test('check empty function', () => {
    let maple = new MiniMaple()
    expect(() => { maple.differentiate('', 'x'); }).toThrow(new Error('You should specify the function'));
});

test('check empty variable', () => {
    let maple = new MiniMaple()
    expect(() => { maple.differentiate('4*x^3-x^2', ''); }).toThrow(new Error('You should specify the variable'));
});

test('check polynomial calculation', () => {
    let maple = new MiniMaple()
    expect(maple.differentiate('4*x^3-x^2', 'x')).toBe('12*x^2-2*x');
});

test('check polynomial with spaces', () => {
    let maple = new MiniMaple()
    expect(maple.differentiate('4 * x ^ 3 - x ^ 2', 'x')).toBe('12*x^2-2*x');
});

test('check polynomial with brackets', () => {
    let maple = new MiniMaple()
    expect(maple.differentiate('(4*x^3) - (x^2)', 'x')).toBe('12*x^2-2*x');
});

test('check polynomial with one invalid operation - division', () => {
    let maple = new MiniMaple()
    expect(() => { maple.differentiate('x^2 / y', 'x'); }).toThrow(new EvalError(
        'You can use only these operations: +, -, *, ^. There were invalid operations: /'));
});

test('check polynomial with ** instead of ^ (wrong usage of power)', () => {
    let maple = new MiniMaple()
    expect(() => { maple.differentiate('(4*x**3) - (x**2)', 'x'); }).toThrow(new EvalError(
        'Error occured during parsing. Re-check a string with function'));
});

test('check polynomial with several invalid operations of one type - division', () => {
    let maple = new MiniMaple()
    expect(() => { maple.differentiate('((x / y) + (x / z)) / 2 * y', 'z'); }).toThrow(new EvalError(
        'You can use only these operations: +, -, *, ^. There were invalid operations: /'));
});

test('check polynomial calculation (derivative of the present variable "x")', () => {
    let maple = new MiniMaple()
    expect(maple.differentiate('4*x^3', 'x')).toBe('12*x^2');
});

test('check polynomial calculation (derivative of the missing variable "y")', () => {
    let maple = new MiniMaple()
    expect(maple.differentiate('4*x^3', 'y')).toBe('0');
});