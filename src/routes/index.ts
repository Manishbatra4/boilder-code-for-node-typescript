import { Router } from "express";
import authRouter from "./auth";
import productRouter from "./products";
import userRouter from "./users";
import cartRouter from "./cart";
import orderRouter from "./order";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/address", userRouter);
rootRouter.use("/cart", cartRouter);
rootRouter.use("/order", orderRouter)

export default rootRouter;