import { Request, Response, NextFunction } from 'express';
import Role from '../4-models/Role';
import { ForbiddenError, UnauthorizedError } from '../4-models/Error';

// Middleware for routes that only admins may access.
// Must run after verifyLoggedIn, which sets request.user.
export const isUserAdmin = (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;

    if (!user) {
        return next(new UnauthorizedError("You are not authorized"));
    }

    if (user.role !== Role.Admin) {
        return next(new ForbiddenError("Permission is allowed only for admins."));
    }

    next();
}
