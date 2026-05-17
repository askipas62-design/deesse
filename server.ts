app.post("/api/send-payment-proof", upload.single("proof"), async (req, res) => {
  try {
    // Vérification fichier
    if (!req.file) {
      return res.status(400).json({
        error: "Aucun fichier téléversé",
      });
    }

    // Données formulaire
    const { tier, email: clientEmail } = req.body;

    // Objet sauvegarde
    const proofData = {
      id: Date.now(),
      tier: tier || "Non spécifié",
      email: clientEmail || "Non communiqué",
      filename: req.file.filename,
      originalName: req.file.originalname,
      date: new Date().toISOString(),
    };

    // Lecture ancien fichier
    let proofs = [];

    if (fs.existsSync(PROOFS_FILE)) {
      try {
        proofs = JSON.parse(
          fs.readFileSync(PROOFS_FILE, "utf-8")
        );
      } catch (e) {
        console.error("Erreur lecture proofs.json :", e);
      }
    }

    // Sauvegarde locale
    proofs.unshift(proofData);

    fs.writeFileSync(
      PROOFS_FILE,
      JSON.stringify(proofs, null, 2)
    );

    // Vérification Resend
    if (!resend) {
      console.warn("Resend non configuré");

      return res.status(200).json({
        success: true,
        message:
          "Preuve enregistrée localement (email non configuré)",
      });
    }

    // Lecture image
    const fileBuffer = fs.readFileSync(req.file.path);

    // Envoi email
    const response = await resend.emails.send({
      from: "Déesse Angèle <onboarding@resend.dev>",

      // IMPORTANT :
      // doit être TON email Resend autorisé
      to: "magiparvel@gmail.com",

      subject: `💳 Nouveau paiement - ${tier || "Pass"}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          background: #111;
          color: white;
          padding: 30px;
          border-radius: 12px;
        ">
          <h1 style="
            color: gold;
            margin-bottom: 20px;
          ">
            Nouveau Paiement Reçu
          </h1>

          <p>
            <strong>Pass :</strong>
            ${tier || "Non spécifié"}
          </p>

          <p>
            <strong>Email client :</strong>
            ${clientEmail || "Non communiqué"}
          </p>

          <p>
            Une preuve de paiement est jointe à cet email.
          </p>
        </div>
      `,

      attachments: [
        {
          filename: req.file.originalname,
          content: fileBuffer.toString("base64"),
        },
      ],
    });

    // Gestion erreur Resend
    if (response.error) {
      console.error("Erreur Resend :", response.error);

      return res.status(500).json({
        error: "Erreur lors de l'envoi de l'email",
      });
    }

    console.log("Email envoyé :", response.data);

    // Succès
    return res.status(200).json({
      success: true,
      message: "Preuve envoyée avec succès",
      data: response.data,
    });

  } catch (err) {
    console.error("Erreur upload :", err);

    return res.status(500).json({
      error:
        "Une erreur interne est survenue",
    });
  }
});
