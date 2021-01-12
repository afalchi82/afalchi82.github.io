/*
{
    "_name": "",
    "_url": "",
    "_type": "",
    "_question": "",
    "_options": []
}
*/


var wf = {
    "_name": "root",
    "_type": "domanda",
    "_question": "Chi sta depositando?",
    "_options": [
        {
            "_name": "avvocato",
            "_url": "https://els1-my.sharepoint.com/personal/a_falchi_giuffrefl_it/Documents/Workflow/redattore web ver 3-0/Indice Avvocato.docx",
            "_type": "question",
            "_options": [
                {
                    "_name": "Atto di citazione",
                    "_url": "https://els1-my.sharepoint.com/personal/a_falchi_giuffrefl_it/Documents/Workflow/redattore web ver 3-0/macro citazioni.docx",
                    "_type": "",
                    "_question": "",
                    "_options": [
                        { 
                            "_name": "Opposizione a decreto ingiuntivo",
                            "_url": "",
                            "_type": "atto",
                        },
                        { 
                            "_name": "Ordinaria Tribunale",
                            "_url": "",
                            "_type": "atto",
                        },
                        { 
                            "_name": "Chiamata in causa del terzo",
                            "_url": "",
                            "_type": "atto",
                        },
                        { 
                            "_name": "Riassunzione",
                            "_options": [
                                {"_name": "riassunzione Tribunale per incompetenza territoriale"},
                                {"_name": "riassunzione in corte d’appello per incompetenza territoriale"},
                                {
                                    "_name": "riassunzione per rinvio dalla Cassazione",
                                    "_options": [
                                        {"_name": "In Tribunale"},
                                        {"_name": "In corte di appello"}
                                    ]
                                },
                                "_name": "riassunzione per difetto di giurisdizione": ""
                            ]
                        },
                        "Riassunzione": {
                            "riassunzione Tribunale per incompetenza territoriale": "Atto",
                            "riassunzione in corte d’appello per incompetenza territoriale": "Atto",
                            "riassunzione per rinvio dalla Cassazione": {
                                "In Tribunale": "Atto",
                                "In corte di appello": "Atto"
                            },
                            "riassunzione per difetto di giurisdizione": ""
                        }, 
                        "Appello": {
                            "Appello in Tribunale avverso sentenza del GDP": "Atto",
                            "Appello In corte di appello": "Atto"
                        }
                    ]
                },
                {
                    "_name": "Comparsa di costituzione o intervento",
                    "_url": "https://els1-my.sharepoint.com/personal/a_falchi_giuffrefl_it/Documents/Workflow/redattore web ver 3-0/macro costituzioni.docx",
                    "_type": "",
                    "_question": "",
                    "_options": [
                        { 
                            "_name": "Costituzione nei riti concorsuali", 
                            "_type": "Atto"
                        },
                        { 
                            "_name": "Costituzione in procedimenti di lavoro", 
                            "_type": "Atto"
                        },
                        { 
                            "_name": "Costituzione in procedimenti civili ", 
                            "_type": "Atto"
                        },
                        { 
                            "_name": "Costituzione in procedimenti esecutivi", 
                            "_type": "Atto"
                        },
                        { 
                            "_name": "Costituzione in procedimenti di volontaria giurisdizione", 
                            "_type": "Atto"
                        },
                        { 
                            "_name": "Interventi volontari in giudizio", 
                            "_type": "Atto"
                        },
                    ]
                },
                {
                    "_name": "Atti endoprocedimentali",
                    "_url": "",
                    "_type": "",
                    "_question": "Di che materia si tratta?",
                    "_options": [
                        { 
                            "_name": "Procedure concorsuali":
                            "_url": "macro endoprocedimentali concorsuali.docx",
                            "_options": [
                                "Memoria autorizzata": "Atto",
                                "Istanza generica": {
                                    "_url": "https://els1-my.sharepoint.com/:w:/g/personal/a_falchi_giuffrefl_it/EXLz8VV0r15EswLUDQI8RZgBG4wZHYQ9hHbvI-MBppCT0g?e=T1aaTm",
        
                                    "_type": "Atto"
                                },
                                "Istanza di visibilità": "Atto",
                                "Rinuncia al credito oggetto di rivendicazione": "Atto",
                                "Rinuncia al credito oggetto di insinuazione": "Atto"   
                            ],                            
                        },
                        { 
                            "_name": "Lavoro", 
                            "_type": "Atto" 
                        },
                        { 
                            "_name": "Agrario", 
                            "_type": "Atto"
                        },
                        { 
                            "_name": "Civile", 
                            "_type": "Atto"
                        },
                        { 
                            "_name": "Esecuzioni", 
                            "_type": "Atto"
                        },
                        { 
                            "_name": "Volontaria giurisdizione", 
                            "_type": "Atto"
                        }
                    ]
                },
                {
                    "_name": "Interventi e atti endoprocessuali dei procedimenti esecutivi",
                    "_url": "",
                    "_type": "",
                    "_question": "",
                    "_options": []
                }
            ]
        },
        {
            "_name": "ctu"
        },
        {
            "_name": "delegato"
        },
        {
            "_name": "curatore"
        }
    ]
}

