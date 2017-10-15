export default function (state = [], action) {
    switch (action.type) {
        case "FILL_FORM" :
            return [
                ...state,
                {
                    username : action.username,
                    phone : action.phone,
                    email : action.email
                }
            ];
        default:
            return state;
    }


};