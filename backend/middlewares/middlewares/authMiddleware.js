import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // { id, role, ... }
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user && (req.user.role === "admin" || req.user.role === "super_admin")) {
        next();
    } else {
        res.status(401).json({ message: "Not authorized as an admin" });
    }
};

// Aliases for compatibility
export const authenticate = protect;
export const authorizeAdmin = adminOnly;

export const staffOnly = (req, res, next) => {
    if (req.user && (req.user.role === "admin" || req.user.role === "super_admin" || req.user.role === "employee")) {
        next();
    } else {
        res.status(401).json({ message: "Not authorized as staff member" });
    }
};

export const superAdminOnly = (req, res, next) => {
    if (req.user && req.user.role === "super_admin") {
        next();
    } else {
        res.status(401).json({ message: "Not authorized as a super admin" });
    }
};

export const partnerOnly = (req, res, next) => {
    if (req.user && (req.user.role === "partner" || req.user.role === "admin" || req.user.role === "super_admin")) {
        next();
    } else {
        res.status(401).json({ message: "Not authorized as a partner" });
    }
};
