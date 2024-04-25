export const formatMoney = (value: string | number, currency = '₮', fixed = 0) => {
    if (typeof value === 'undefined') return value;
    const re = `\\d(?=(\\d{${3}})+(\\.\\d*[0-9])?$)`;
    if (currency === '$')
        return `${currency}${Number(value)
            .toFixed(fixed)
            .replace(new RegExp(re, 'g'), '$&,')
            .replace(/(\.\d*[1-9])0+$|\.0*$/, '$1')}`.trim();
    return `${Number(value)
        .toFixed(fixed)
        .replace(new RegExp(re, 'g'), '$&,')
        .replace(/(\.\d*[1-9])0+$|\.0*$/, '$1')} ${currency}`.trim();
};