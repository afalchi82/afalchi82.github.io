export const notes = "cdefgab".toUpperCase().split("");
export const keys = "cdefgab".toUpperCase().split("");
export const noteCodeToKey = (noteIndex) => {
    return notes[noteIndex % 12];
};
