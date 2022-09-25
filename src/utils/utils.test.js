import utils from "./utils"

it('should return a number with commas', () => {
    expect(utils.numberWithCommas(0)).toEqual('0');
    expect(utils.numberWithCommas(-5)).toEqual('-5');
    expect(utils.numberWithCommas(100)).toEqual('100');
    expect(utils.numberWithCommas(10000)).toEqual('10,000');
});