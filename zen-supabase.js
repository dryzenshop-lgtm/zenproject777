/* =========================================================
   ZEN777 // SUPABASE CONNECTOR
   REPORT + SPONSOR
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIG
    ===================================================== */

    const SUPABASE_URL =
        "https://qmjhtboctxmjxnufxejx.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_E-x5RyoBqWvAty80zPo6Eg_5CEvXUON";


    /* =====================================================
       SUPABASE INSERT
    ===================================================== */

    async function insertIntoSupabase(table, data) {

        const response = await fetch(
            SUPABASE_URL +
            "/rest/v1/" +
            table,
            {
                method: "POST",

                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization":
                        "Bearer " + SUPABASE_KEY,
                    "Content-Type":
                        "application/json",
                    "Prefer":
                        "return=minimal"
                },

                body: JSON.stringify(data)
            }
        );


        if (!response.ok) {

            let error = "";

            try {
                error = await response.text();
            } catch (_) {
                error = "Unknown error";
            }

            console.error(
                "ZEN777 SUPABASE ERROR:",
                error
            );

            throw new Error(
                "Supabase ha rifiutato la richiesta."
            );
        }

        return true;
    }


    /* =====================================================
       ZEN ID
    ===================================================== */

    function getZenId() {

        try {

            if (
                typeof window.zenId !==
                "undefined"
            ) {
                return window.zenId;
            }

        } catch (_) {}


        try {

            if (
                typeof zenId !==
                "undefined"
            ) {
                return zenId;
            }

        } catch (_) {}


        return null;
    }


    /* =====================================================
       CUSTOM SUCCESS MESSAGE
    ===================================================== */

    function successMessage(message) {

        alert(message);

    }


    /* =====================================================
       CUSTOM ERROR MESSAGE
    ===================================================== */

    function errorMessage(message) {

        alert(
            "❌ " + message
        );

    }


    /* =====================================================
       REPORT
    ===================================================== */

    function submitReport(form) {

        const platformElement =
            document.getElementById(
                "reportPlatform"
            );

        const targetElement =
            document.getElementById(
                "reportTarget"
            );

        const contactElement =
            document.getElementById(
                "reportContact"
            );

        const descriptionElement =
            document.getElementById(
                "reportDescription"
            );

        const anonymousElement =
            document.getElementById(
                "anonymous"
            );


        const platform =
            platformElement
                ? platformElement.value.trim()
                : "";

        const target =
            targetElement
                ? targetElement.value.trim()
                : "";

        const contact =
            contactElement
                ? contactElement.value.trim()
                : "";

        const description =
            descriptionElement
                ? descriptionElement.value.trim()
                : "";

        const anonymous =
            anonymousElement
                ? anonymousElement.checked
                : false;


        /* ---------------------------------------------
           VALIDATION
        --------------------------------------------- */

        if (!platform) {

            errorMessage(
                "Seleziona WhatsApp, Telegram o Discord."
            );

            return;

        }


        if (!target) {

            errorMessage(
                "Inserisci il numero o username da segnalare."
            );

            return;

        }


        if (!description) {

            errorMessage(
                "Inserisci una descrizione del report."
            );

            return;

        }


        /* ---------------------------------------------
           DATA
        --------------------------------------------- */

        const data = {

            platform: platform,

            target: target,

            contact:
                anonymous
                    ? null
                    : contact,

            description:
                description,

            anonymous:
                anonymous,

            zen_id:
                getZenId(),

            created_at:
                new Date().toISOString()

        };


        /* ---------------------------------------------
           BUTTON
        --------------------------------------------- */

        const button =
            form.querySelector(
                'button[type="submit"]'
            );

        const oldText =
            button
                ? button.textContent
                : "";


        if (button) {

            button.disabled = true;

            button.textContent =
                "INVIO...";

        }


        /* ---------------------------------------------
           SEND
        --------------------------------------------- */

        insertIntoSupabase(
            "reports",
            data
        )

        .then(function () {

            successMessage(
                "✅ Report inviato correttamente."
            );


            if (
                typeof closeModal ===
                "function"
            ) {

                closeModal(
                    "reportModal"
                );

            }


            form.reset();


            document
                .querySelectorAll(
                    ".platform-button"
                )
                .forEach(
                    function (button) {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


            const hidden =
                document.getElementById(
                    "reportPlatform"
                );

            if (hidden) {
                hidden.value = "";
            }


            const target =
                document.getElementById(
                    "reportTarget"
                );

            if (target) {

                target.placeholder =
                    "Seleziona prima la piattaforma";

            }


            const label =
                document.getElementById(
                    "targetLabel"
                );

            if (label) {

                label.textContent =
                    "NUMERO / USERNAME";

            }

        })

        .catch(function (error) {

            console.error(
                "ZEN777 REPORT:",
                error
            );

            errorMessage(
                error.message ||
                "Impossibile inviare il report."
            );

        })

        .finally(function () {

            if (button) {

                button.disabled =
                    false;

                button.textContent =
                    oldText;

            }

        });

    }


    /* =====================================================
       SPONSOR
    ===================================================== */

    function submitSponsor(form) {

        const nameElement =
            document.getElementById(
                "sponsorName"
            );

        const communityElement =
            document.getElementById(
                "sponsorCommunity"
            );

        const typeElement =
            document.getElementById(
                "sponsorType"
            );

        const contactElement =
            document.getElementById(
                "sponsorContact"
            );

        const descriptionElement =
            document.getElementById(
                "sponsorDescription"
            );


        const name =
            nameElement
                ? nameElement.value.trim()
                : "";

        const community =
            communityElement
                ? communityElement.value.trim()
                : "";

        const type =
            typeElement
                ? typeElement.value.trim()
                : "";

        const contact =
            contactElement
                ? contactElement.value.trim()
                : "";

        const description =
            descriptionElement
                ? descriptionElement.value.trim()
                : "";


        /* ---------------------------------------------
           VALIDATION
        --------------------------------------------- */

        if (!name) {

            errorMessage(
                "Inserisci il tuo nome o nickname."
            );

            return;

        }


        if (!community) {

            errorMessage(
                "Inserisci la community o il progetto."
            );

            return;

        }


        if (!type) {

            errorMessage(
                "Seleziona il tipo di richiesta."
            );

            return;

        }


        if (!contact) {

            errorMessage(
                "Inserisci un contatto."
            );

            return;

        }


        if (!description) {

            errorMessage(
                "Descrivi la tua proposta."
            );

            return;

        }


        /* ---------------------------------------------
           DATA
        --------------------------------------------- */

        const data = {

            name: name,

            community: community,

            type: type,

            contact: contact,

            description: description,

            zen_id:
                getZenId(),

            created_at:
                new Date().toISOString()

        };


        /* ---------------------------------------------
           BUTTON
        --------------------------------------------- */

        const button =
            form.querySelector(
                'button[type="submit"]'
            );

        const oldText =
            button
                ? button.textContent
                : "";


        if (button) {

            button.disabled = true;

            button.textContent =
                "INVIO...";

        }


        /* ---------------------------------------------
           SEND
        --------------------------------------------- */

        insertIntoSupabase(
            "sponsor_requests",
            data
        )

        .then(function () {

            successMessage(
                "✅ Richiesta di collaborazione inviata correttamente."
            );


            if (
                typeof closeModal ===
                "function"
            ) {

                closeModal(
                    "sponsorModal"
                );

            }


            form.reset();

        })

        .catch(function (error) {

            console.error(
                "ZEN777 SPONSOR:",
                error
            );

            errorMessage(
                error.message ||
                "Impossibile inviare la richiesta."
            );

        })

        .finally(function () {

            if (button) {

                button.disabled =
                    false;

                button.textContent =
                    oldText;

            }

        });

    }


    /* =====================================================
       CAPTURE SUBMIT
       
       IMPORTANT:
       capture=true permette a questo script
       di intercettare il form PRIMA del vecchio
       listener presente nell'index.html.
    ===================================================== */

    document.addEventListener(
        "submit",
        function (event) {

            const form =
                event.target;


            if (
                !form ||
                !form.id
            ) {
                return;
            }


            /* -----------------------------------------
               REPORT
            ----------------------------------------- */

            if (
                form.id ===
                "reportForm"
            ) {

                event.preventDefault();

                event.stopPropagation();

                if (
                    event.stopImmediatePropagation
                ) {

                    event.stopImmediatePropagation();

                }


                submitReport(form);

                return;

            }


            /* -----------------------------------------
               SPONSOR
            ----------------------------------------- */

            if (
                form.id ===
                "sponsorForm"
            ) {

                event.preventDefault();

                event.stopPropagation();

                if (
                    event.stopImmediatePropagation
                ) {

                    event.stopImmediatePropagation();

                }


                submitSponsor(form);

                return;

            }

        },

        true
    );


    /* =====================================================
       READY
    ===================================================== */

    console.log(
        "%cZEN777",
        "color:#ff0000;font-size:22px;font-weight:900;"
    );

    console.log(
        "%cSUPABASE CONNECTED",
        "color:#ffffff;font-size:13px;font-weight:900;"
    );

})();
