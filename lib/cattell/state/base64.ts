const TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export function toBase64(bit6: number): string {
  return TABLE[bit6];
}

export function fromBase64(chr: string): number {
    return TABLE.indexOf(chr);
}
