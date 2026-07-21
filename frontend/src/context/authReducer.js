export const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
};

export const authReducer = (state, action) => {
    switch (action.type) {
        case "AUTH_START":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null,
            };

        case "REGISTER_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
            };

        case "AUTH_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: null,
                error: null,
            };

        default:
            return state;
    }
};