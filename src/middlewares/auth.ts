import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorize";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from '../secrets';
import jwt from "jsonwebtoken";
import { prismaClient } from "..";

interface Payload {
    userId: number;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED_EXCEPTION));
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as Payload;

        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });

        if (!user) {
            next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED_EXCEPTION));
        }

        req.user = user;
        next();

    } catch (error) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED_EXCEPTION));
    }
};

export default authMiddleware;
