/* =========================================
   ZEN777 // SUPABASE
   REPORT + SPONSOR
========================================= */

const SUPABASE_URL =
    "https://qmjhtboctxmjxnufxejx.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_E-x5RyoBqWvAty80zPo6Eg_5CEvXUON";


async function zenSupabaseInsert(table, data) {

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${table}`,
        {
            method: "POST",

            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                "Content-Type": "application/json",
                "Prefer": "return=minimal"
            },

            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {

        let errorText = "";

        try {
            errorText = await response.text();
        } catch {
            errorText = "Errore sconosciuto";
        }

        console.error(
            `ZEN777 Supabase error [${table}]:`,
            errorText
        );

        throw new Error(
            `Errore durante il salvataggio della richiesta.`
        );
    }

    return true;
}


/* =========================================
   REPORT
========================================= */

const zenReportForm =
    document.getElementById("reportForm");


if (zenReportForm) {

    zenReportForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const submitButton =
                this.querySelector(
                    'button[type="submit"]'
                );

            const originalText =
                submitButton
                    ? submitButton.textContent
                    : "";

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent =
                    "INVIO IN CORSO...";
            }

            try {

                const platform =
                    document.getElementById(
                        "reportPlatform"
                    )?.value || "";

                const target =
                    document.getElementById(
                        "reportTarget"
                    )?.value.trim() || "";

                const contact =
                    document.getElementById(
                        "reportContact"
                    )?.value.trim() || "";

                const description =
                    document.getElementById(
                        "reportDescription"
                    )?.value.trim() || "";

                const anonymous =
                    document.getElementById(
                        "anonymous"
                    )?.checked || false;


                if (!platform) {
                    throw new Error(
                        "Seleziona una piattaforma."
                    );
                }

                if (!target) {
                    throw new Error(
                        "Inserisci il numero o username."
                    );
                }

                if (!description) {
                    throw new Error(
                        "Inserisci una descrizione."
                    );
                }


                await zenSupabaseInsert(
                    "reports",
                    {
                        platform: platform,
                        target: target,
                        contact: anonymous
                            ? null
                            : contact,
                        description: description,
                        anonymous: anonymous,
                        created_at:
                            new Date().toISOString()
                    }
                );


                alert(
                    "✅ Report inviato correttamente."
                );


                this.reset();


                document
                    .querySelectorAll(
                        ".platform-button"
                    )
                    .forEach(function(button) {
                        button.classList.remove(
                            "active"
                        );
                    });


                const platformInput =
                    document.getElementById(
                        "reportPlatform"
                    );

                if (platformInput) {
                    platformInput.value = "";
                }


                const targetInput =
                    document.getElementById(
                        "reportTarget"
                    );

                if (targetInput) {
                    targetInput.placeholder =
                        "Seleziona prima la piattaforma";
                }


                const targetLabel =
                    document.getElementById(
                        "targetLabel"
                    );

                if (targetLabel) {
                    targetLabel.textContent =
                        "NUMERO / USERNAME";
                }


                if (typeof closeModal === "function") {
                    closeModal("reportModal");
                }

            } catch (error) {

                console.error(
                    "ZEN777 REPORT:",
                    error
                );

                alert(
                    "❌ " +
                    (
                        error.message ||
                        "Impossibile inviare il report."
                    )
                );

            } finally {

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent =
                        originalText;
                }

            }

        }
    );
}


/* =========================================
   SPONSOR
========================================= */

const zenSponsorForm =
    document.getElementById("sponsorForm");


if (zenSponsorForm) {

    zenSponsorForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const submitButton =
                this.querySelector(
                    'button[type="submit"]'
                );

            const originalText =
                submitButton
                    ? submitButton.textContent
                    : "";

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent =
                    "INVIO IN CORSO...";
            }

            try {

                const name =
                    document.getElementById(
                        "sponsorName"
                    )?.value.trim() || "";

                const community =
                    document.getElementById(
                        "sponsorCommunity"
                    )?.value.trim() || "";

                const type =
                    document.getElementById(
                        "sponsorType"
                    )?.value || "";

                const contact =
                    document.getElementById(
                        "sponsorContact"
                    )?.value.trim() || "";

                const description =
                    document.getElementById(
                        "sponsorDescription"
                    )?.value.trim() || "";


                if (!name) {
                    throw new Error(
                        "Inserisci il nome o nickname."
                    );
                }

                if (!community) {
                    throw new Error(
                        "Inserisci la community o il progetto."
                    );
                }

                if (!type) {
                    throw new Error(
                        "Seleziona il tipo di richiesta."
                    );
                }

                if (!contact) {
                    throw new Error(
                        "Inserisci un contatto."
                    );
                }

                if (!description) {
                    throw new Error(
                        "Descrivi la tua proposta."
                    );
                }


                await zenSupabaseInsert(
                    "sponsor_requests",
                    {
                        name: name,
                        community: community,
                        type: type,
                        contact: contact,
                        description: description,
                        created_at:
                            new Date().toISOString()
                    }
                );


                alert(
                    "✅ Richiesta sponsor inviata correttamente."
                );


                this.reset();


                if (
                    typeof closeModal === "function"
                ) {
                    closeModal(
                        "sponsorModal"
                    );
                }

            } catch (error) {

                console.error(
                    "ZEN777 SPONSOR:",
                    error
                );

                alert(
                    "❌ " +
                    (
                        error.message ||
                        "Impossibile inviare la richiesta."
                    )
                );

            } finally {

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent =
                        originalText;
                }

            }

        }
    );
}


console.log(
    "%cZEN777 SUPABASE CONNECTED",
    "color:#ff0000;font-weight:900;font-size:16px"
);
