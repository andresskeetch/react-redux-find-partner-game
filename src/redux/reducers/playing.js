import data from '../../data/items';
import table from '../../data/table';
import { type as getData } from '../actions/getData';
import { type as restartGame } from '../actions/restartGame';
import { type as selectItem } from '../actions/selectItem';
import { type as partnerFound } from '../actions/partnerFound';
import { type as endGame } from '../actions/endGame';

let itemsToChoice = JSON.parse(JSON.stringify(data));
function getItemRandom() {
    const max = itemsToChoice.length;
    const index = Math.floor(Math.random() * max); 
    itemsToChoice[index].copy--;
    const result = { id: itemsToChoice[index].id, img: itemsToChoice[index].img };
    if (itemsToChoice[index].copy === 0) {
        itemsToChoice.splice(index, 1);
    }
    return result;
}

const defaultState = { data: [], lastColumn: {}, endGame: false };
function reducer(state = defaultState, { type, payload}) {
    switch(type) {
        case getData:
            const tablePrint = JSON.parse(JSON.stringify(table));
            tablePrint.forEach(row => {
                row.columns.forEach(column => {
                    const columnSelected = getItemRandom();
                    column.img = columnSelected.img;
                    column.id = columnSelected.id;
                    column.isOpen = false;
                });
            });
            state.data = tablePrint;
            return { ...state };
        case selectItem:
            state.data[payload.indexRow].columns[payload.indexColumn].isOpen = payload.selected;
            return { ...state, lastColumn: { ...payload.column, indexRow: payload.indexRow, indexColumn: payload.indexColumn} };
        case partnerFound:
            state.data[payload.column1.indexRow].columns[payload.column1.indexColumn].isOpen = true;
            state.data[payload.column2.indexRow].columns[payload.column2.indexColumn].isOpen = true;
            return { ...state, lastColumn : undefined};
        case restartGame:
                itemsToChoice = JSON.parse(JSON.stringify(data));
                const tablePrintRestart = JSON.parse(JSON.stringify(table));
                tablePrintRestart.forEach(row => {
                    row.columns.forEach(column => {
                        const columnSelected = getItemRandom();
                        column.img = columnSelected.img;
                        column.id = columnSelected.id;
                        column.isOpen = false;
                    });
                });
                state.data = tablePrintRestart;
                return { ...state, lastColumn : undefined, endGame: false};
        case endGame:
            return { ...state, endGame: true };
        default: 
            return state;
    }
}

export default reducer;