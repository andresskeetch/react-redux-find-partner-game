export const type = 'selectItem'

const selectItem = (indexRow, indexColumn, column, selected) => {
    return {
        type,
        payload: {
            indexRow, indexColumn, column, selected
        }
    };
}

export default selectItem;