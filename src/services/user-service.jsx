

import { myAxios } from "./helper";

export const signUp = (user) => {
    return myAxios
        .post('/apis/v1/auth/register', user)
        .then((response) => response.data);
}