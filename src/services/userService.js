import * as request from './requestUtils.js';


const baseUrl = 'http://localhost:3030/users';

export const login = (email, password) =>
   request.post(`${baseUrl}/login`, { email, password });

export const logout = async (accessToken) => {
   try {
     const response = await fetch(`${baseUrl}/logout`, {
         headers: {
            'X-Authorization': accessToken
         }
      });
      //response.status == '204'

      return response;
   } catch (error) {
      console.log(error);
   }
}

export const register = (firstName, lastName, email, password, age, tac ) => {
   request.post(`${baseUrl}/register`, { firstName, lastName, email, password, age, tac });
} 