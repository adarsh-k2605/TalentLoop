import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
    try {
        const auth = getAuth(req);

        // Use getAuth instead of requireAuth for API routes - returns 401 instead of 302 redirect
        if (!auth?.userId) {
            return res.status(401).json({ message: "Unauthorized - invalid token" });
        }

        const clerkId = auth.userId;

        // find user in db by clerkId
        const user = await User.findOne({ clerkId });

        if (!user) return res.status(404).json({ message: "User not found" });

        // attach user to req
        req.user = user;

        next();
    } catch (error) {
        console.error("Error in protectRoute middleware", error);
        res.status(500).json({ message: "Internal server error" });
    }
};