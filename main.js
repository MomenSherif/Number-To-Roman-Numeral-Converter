var romanNumbers = new Map([
    [1, 'I'],
    [5, 'V'],
    [10, 'X'],
    [20, 'XX'],
    [30, 'XXX'],
    [40, 'XL'],
    [50, 'L'],
    [60, 'LX'],
    [70, 'LXX'],
    [80, 'LXXX'],
    [90, 'XC'],
    [100, 'C'],
    [200, 'CC'],
    [300, 'CCC'],
    [400, 'CD'],
    [500, 'D'],
    [600, 'DC'],
    [700, 'DCC'],
    [800, 'DCCC'],
    [900, 'CM'],
    [1000, 'M'],
    [1600, 'MDC'],
    [1700, 'MDCC'],
    [1900, 'MCM'],
    [2000, 'MM'],
    [3000, 'MMM'],
    [4000, 'MMMM'],
    [5000, '&#7804;'],
]);
function numToRoman(num) {
    var _a, _b;
    var romanNumbersIterator = romanNumbers.entries();
    var _c = romanNumbersIterator.next().value, currNum = _c[0], currRomanNum = _c[1];
    var _d = [currNum, currRomanNum], prevNum = _d[0], prevRomanNum = _d[1];
    if (num === 0)
        return '';
    do {
        _a = [currNum, currRomanNum], prevNum = _a[0], prevRomanNum = _a[1];
        if (num > currNum) {
            _b = romanNumbersIterator.next().value, currNum = _b[0], currRomanNum = _b[1];
        }
        if (num == currNum) {
            return currRomanNum;
        }
    } while (num > currNum);
    if (currNum - num === 1) {
        return "I" + currRomanNum;
    }
    else {
        var str = "" + prevRomanNum;
        for (var i = 0; i < num - prevNum; i++) {
            str = str.concat("I");
        }
        return str;
    }
}
var form = document.querySelector('form');
var input = form.number;
var div = document.querySelector('.display-2');
input.addEventListener('keyup', function (e) {
    var value = input.value.trim();
    if (isValidNumber(value) && +value > 0) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        var numbers = value.split('')
            .reverse()
            .map(function (num, i) { return +num * Math.pow(10, i); });
        var romanNumber = numbers.reduce(function (acc, curr) {
            return "" + acc + numToRoman(curr).split('').reverse().join('');
        }, '').split('').reverse().join('');
        div.innerHTML = "" + romanNumber;
    }
    else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        div.textContent = 'Invalid Data [1 - 5000]';
    }
});
form.addEventListener('submit', function (e) { return e.preventDefault(); });
function isValidNumber(number) {
    var re = /\b([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-4][0-9]{3}|5000)\b/;
    return re.test(number);
}
