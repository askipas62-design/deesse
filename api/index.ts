import express from "express";
import multer from "multer";
import { Resend } from "resend";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

const REVIEWS_FILE = path.join(process.cwd(), "data", "reviews.json");

// Setup Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Multer for file upload
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// API Routes
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
    if (!resend) {
      return res.status(500).json({ error: "Resend API key missing on server" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier téléversé" });
    }

    const { tier, email: clientEmail } = req.body;

    const { data, error } = await resend.emails.send({
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
          content: req.file.buffer,
        },
      ],
    });

    if (error) {
      console.error("Resend Error:", error);
      return res.status(500).json({ error: "Erreur lors de l'envoi du mail" });
    }

    res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Une erreur interne est survenue" });
  }
});

// For Vercel, we export the app
export default app;
