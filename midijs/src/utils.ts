export const notes: string[] = "cdefgab".toUpperCase().split("");

export const keys: string[] = "cdefgab".toUpperCase().split("");

export const noteCodeToKey = ( noteIndex: number ): string => {
    return notes[noteIndex % 12];
};