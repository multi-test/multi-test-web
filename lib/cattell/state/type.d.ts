export type CattellState = {
    position: number;
    answers: ('A' | 'B' | 'C' | '')[];
    profile: {
        gender: 'M' | 'F' | '';
        age: number;
        name: string;
    };
};

export type FinalCattellState = {
    position: number;
    answers: ('A' | 'B' | 'C')[];
    profile: {
        gender: 'M' | 'F';
        age: number;
        name: string;
    };
};
