/* 
Returns the null-coalesced value of the two operands.
*/
export default function Coalesce(a: object, b: object): object {
    let result: object = {};
    for (let key in a) {
        if (b[key] !== undefined) {
            result[key] = b[key];
        } else {
            result[key] = a[key];
        }
    }
    return result;
};