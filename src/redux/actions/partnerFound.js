export const type = 'partnerFound'

const partnerFound = (column1, column2) => {
    return {
        type,
        payload: {
            column1, column2
        }
    };
}

export default partnerFound;