export function userActions(username, phone, email) {
    return {
        type: "FILL_FORM",
        username,
        phone,
        email
    }
}

