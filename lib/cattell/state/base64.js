const TABLE = "_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.";
export function toBase64(bit6) {
    return TABLE[bit6];
}
export function fromBase64(chr) {
    return TABLE.indexOf(chr);
}
