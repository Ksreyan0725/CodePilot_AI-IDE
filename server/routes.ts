import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, signupSchema } from "@shared/schema";
import { hashPassword, verifyPassword, sanitizeUser } from "./auth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      // Validate request body
      const { email, password } = loginSchema.parse(req.body);

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          error: "Invalid email or password" 
        });
      }

      // Verify password
      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ 
          error: "Invalid email or password" 
        });
      }

      // Store user in session
      req.session.userId = user.id;

      // Return safe user data
      const safeUser = sanitizeUser(user);
      res.json({ 
        user: safeUser,
        message: "Login successful" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: error.errors[0].message 
        });
      }
      console.error("Login error:", error);
      res.status(500).json({ 
        error: "An error occurred during login" 
      });
    }
  });

  // Signup endpoint
  app.post("/api/auth/signup", async (req, res) => {
    try {
      // Validate request body
      const userData = signupSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({ 
          error: "An account with this email already exists" 
        });
      }

      // Hash password
      const hashedPassword = await hashPassword(userData.password);

      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      // Store user in session
      req.session.userId = user.id;

      // Return safe user data
      const safeUser = sanitizeUser(user);
      res.status(201).json({ 
        user: safeUser,
        message: "Account created successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: error.errors[0].message 
        });
      }
      console.error("Signup error:", error);
      res.status(500).json({ 
        error: "An error occurred during signup" 
      });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ 
          error: "Failed to logout" 
        });
      }
      res.json({ message: "Logout successful" });
    });
  });

  // Get current user endpoint
  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ 
        error: "Not authenticated" 
      });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ 
        error: "User not found" 
      });
    }

    const safeUser = sanitizeUser(user);
    res.json({ user: safeUser });
  });

  const httpServer = createServer(app);

  return httpServer;
}
