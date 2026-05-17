import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const REVIEWS_FILE = path.join(process.cwd(), "data", "reviews.json");
const PAYMENT_FILE = path.join(process.cwd(), "data", "payment-info.json");

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "data");
const uploadsDir = path.join(dataDir, "uploads");
const PROOFS_FILE = path.join(dataDir, "proofs.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Setup Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

async function startServer() {
  // API Routes
  app.use("/uploads", express.static(uploadsDir));

  app.get("/api/payment-info", (req, res) => {
    try {
      if (!fs.existsSync(PAYMENT_FILE)) {
        // Return default data if file doesn't exist yet to avoid 404
        const defaultData = {
          wero: { label: "Wero", fields: [{ label: "Numéro", value: "0780948256" }, { label: "Nom", value: "DARDAI A****" }], instruction: "..." },
          crypto: { label: "Crypto", fields: [{ label: "Adresse LTC", value: "..." }], instruction: "..." },
          virement: { label: "Virement", fields: [{ label: "IBAN", value: "..." }], instruction: "..." }
        };
        return res.json(defaultData);
      }
      const data = fs.readFileSync(PAYMENT_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (err) {
      console.error("Read payment info error:", err);
      res.status(500).json({ error: "Could not read payment info" });
    }
  });

  app.post("/api/payment-info", (req, res) => {
    try {
      const { password, data } = req.body;
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "angele2026";
      
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Mot de passe incorrect" });
      }

      if (!data) {
        return res.status(400).json({ error: "Données manquantes" });
      }

      fs.writeFileSync(PAYMENT_FILE, JSON.stringify(data, null, 2));
      res.json({ success: true, message: "Informations de paiement mises à jour" });
    } catch (err) {
      console.error("Update payment info error:", err);
      res.status(500).json({ error: "Could not update payment info" });
    }
  });

  app.get("/api/reviews", (req, res) => {
    try {
      if (!fs.existsSync(REVIEWS_FILE)) {
        return res.json([]);
      }
      const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (err) {
      console.error("Read reviews error:", err);
      res.status(500).json({ error: "Could not read reviews" });
    }
  });

  app.post("/api/reviews", (req, res) => {
    try {
      const { user, content, rating, pass } = req.body;
      if (!user || !content || !rating) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      let reviews = [];
      if (fs.existsSync(REVIEWS_FILE)) {
        reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE, "utf-8"));
      }

      const newReview = {
        id: Date.now(),
        user,
        content,
        rating: Number(rating),
        pass: pass || "Visiteur",
        date: "À l'instant"
      };

      reviews.unshift(newReview); // Add to beginning
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
      res.status(201).json(newReview);
    } catch (err) {
      console.error("Save review error:", err);
      res.status(500).json({ error: "Could not save review" });
    }
  });

  app.post("/api/send-payment-proof", upload.single("proof"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Aucun fichier téléversé" });
      }

      const { tier, email: clientEmail } = req.body;
      const proofData = {
        id: Date.now(),
        tier: tier || "N/A",
        email: clientEmail || "N/A",
        filename: req.file.filename,
        originalName: req.file.originalname,
        date: new Date().toISOString()
      };

      // Save locally first (backup)
      let proofs = [];
      if (fs.existsSync(PROOFS_FILE)) {
        try {
          proofs = JSON.parse(fs.readFileSync(PROOFS_FILE, "utf-8"));
        } catch (e) {
          console.error("Error reading proofs file:", e);
        }
      }
      proofs.unshift(proofData);
      fs.writeFileSync(PROOFS_FILE, JSON.stringify(proofs, null, 2));

      // Attempt to send email if Resend is configured
      if (resend) {
        try {
          // Read file for email attachment since it's on disk now
          const fileContent = fs.readFileSync(req.file.path);
          
          const { error } = await resend.emails.send({
            from: "Déesse Angèle <onboarding@resend.dev>",
            to: "magiparvel@gmail.com",
            subject: `Nouveau paiement pour la Déesse Angèle - ${tier}`,
            html: `
              <div style="font-family: serif; padding: 20px; background: #0a0a0a; color: #fff; border: 1px solid #c5a666;">
                <h1 style="color: #c5a666; text-transform: uppercase; letter-spacing: 0.2em;">Nouveau Paiement Reçu</h1>
                <p style="font-style: italic; color: #fff; opacity: 0.8;">Un nouveau fidèle a déposé son obole pour le sanctuaire.</p>
                <hr style="border: none; border-top: 1px solid rgba(197, 166, 102, 0.2); margin: 20px 0;" />
                <div style="margin-bottom: 20px;">
                  <p><strong>Tier / Pass :</strong> <span style="color: #c5a666;">${tier || 'Non spécifié'}</span></p>
                  <p><strong>Email Client :</strong> ${clientEmail || 'Non communiqué'}</p>
                </div>
                <p>Veuillez trouver l'image de la preuve de paiement en pièce jointe.</p>
              </div>
            `,
            attachments: [
              {
                filename: req.file.originalname,
                content: fileContent,
              },
            ],
          });

          if (error) {
            console.error("Resend Error:", error);
            // We don't return error 500 here because the proof is saved locally
          }
        } catch (emailErr) {
          console.error("Email Sending Failed:", emailErr);
        }
      } else {
        console.warn("Resend not configured, proof only saved locally in data/proofs.json");
      }

      res.status(200).json({ 
        success: true, 
        message: "Preuve de paiement enregistrée avec succès",
        id: proofData.id 
      });
    } catch (err) {
      console.error("Upload Error:", err);
      res.status(500).json({ error: "Une erreur interne est survenue lors du traitement du fichier" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
