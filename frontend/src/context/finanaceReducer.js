export const initialState = {
    transactions: [],
    summary:null,
    loading:false,
    error: null,
    deleting: false,
    saving: false,
    pagination:null,
};

export const financeReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START": return {
            ...state, 
            loading:true,
            error:null,
        };

        case "FETCH_TRANSACTIONS": return {
            ...state, 
            loading: false,
            transactions: action.payload.data,
            pagination: action.payload.pagination,
        };

        case "FETCH_SUMMARY": return {
            ...state,
            summary: action.payload,
        };

        case "FETCH_ERROR": return {
            ...state,
            loading: false,
            error: action.payload,
        };

        case "ADD_TRANSACTION": return{
            ...state,
            transactions: [action.payload, ...state.transactions],
        };

        case "UPDATE_TRANSACTION": return {
            ...state,
            transactions: state.transactions.map((transaction) => transaction.id === action.payload.id ? action.payload : transaction),
        };

        case "DELETE_TRANSACTION": return{
            ...state,
            transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
        };

        default: return state;
    }
};