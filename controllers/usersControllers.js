import express from "express";
import { createUser, getUserByEmail } from "../services/usersServices.js";

/**
 *
 * @param {express.Request} request
 * @param {express.Response} response
 */

export const postCreateUser = async (request, response, next) => {
    try {
        const { firstName, lastName, email, password } = request.body;
        const findUser = await getUserByEmail(email);

        if (findUser) {
            return response.status(409).json({
                message: "User Already Exist"
            });
        }

        const user = await createUser(firstName, lastName, email, password);
        response.status(201).json({
            data: user,
            message: "User Successfully Created"
        });
    } catch(e) {
        next(e);
    }
};