type Bit = 0 | 1;

export class WritableBitStream {
    private _bytes: number[] = [];
    private _byte: Bit[] = [0, 0, 0, 0, 0, 0, 0, 0];
    private _counter: number = 0;

    constructor(bytes: number[] = []) {
        this._bytes = bytes;
    }

    public getBytes(): number[] | null {
        if (this.isClean) {
            return this._bytes;
        }

        return null;
    }

    public get isClean() {
        return this._counter === 0;
    }

    public writeBit(value: number): void {
        this._byte[this._counter++] = (value & 1) as Bit;
        this._flush();
    }

    public writeBit2(value: number): void {
        this.writeBit(value);
        this.writeBit(value >> 1);
    }

    public writeByte(value: number): void {
        this.writeBit(value);
        this.writeBit(value >> 1);
        this.writeBit(value >> 2);
        this.writeBit(value >> 3);
        this.writeBit(value >> 4);
        this.writeBit(value >> 5);
        this.writeBit(value >> 6);
        this.writeBit(value >> 7);
    }

    private _flush(): void {
        if (this._counter === 8) {
            this._bytes.push(WritableBitStream.bitsToByte(this._byte));
            this._counter = 0;
        }
    }

    private static bitsToByte(bits: Bit[]): number {
        return bits[0]
            | (bits[1] << 1)
            | (bits[2] << 2)
            | (bits[3] << 3)
            | (bits[4] << 4)
            | (bits[5] << 5)
            | (bits[6] << 6)
            | (bits[7] << 7);
    }

}