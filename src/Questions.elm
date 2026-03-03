module Questions exposing (Question, InputType(..), Importance(..), questions, sections, sectionName)


type InputType
    = RadioYesNo
    | TextInput
    | EmailInput
    | TelInput
    | TextArea


type Importance
    = Critical
    | Standard
    | Minor
    | Unscored


type alias Question =
    { id : String
    , section : String
    , label : String
    , guidance : Maybe String
    , inputType : InputType
    , hasAdditional : Bool
    , importance : Importance
    , weight : Int
    , isScored : Bool
    , compliantResponse : Maybe String
    , isCritical : Bool
    }


sections : List ( String, String )
sections =
    [ ( "GNRL", "General Information" )
    , ( "COMP", "Company Information" )
    , ( "REQU", "Required Questions" )
    , ( "DOCU", "Documentation" )
    , ( "ITAC", "IT Accessibility" )
    , ( "THRD", "Assessment of Third Parties" )
    , ( "CONS", "Consulting Services" )
    , ( "APPL", "Application/Service Security" )
    , ( "AAAI", "Authentication, Authorization & Account Management" )
    , ( "CHNG", "Change Management" )
    , ( "DATA", "Data" )
    , ( "DCTR", "Datacenter" )
    , ( "FIDP", "Firewalls, IDS, IPS & Networking" )
    , ( "PPPR", "Policies, Processes & Procedures" )
    , ( "HFIH", "Incident Handling" )
    , ( "VULN", "Vulnerability Management" )
    , ( "HIPA", "HIPAA Compliance" )
    , ( "PCID", "PCI DSS" )
    , ( "OPEM", "On-Premises Data Solutions" )
    , ( "PRGN", "General Privacy" )
    , ( "PCOM", "Privacy Company Details" )
    , ( "PDOC", "Privacy Documentation" )
    , ( "PTHP", "Privacy of Third Parties" )
    , ( "PCHG", "Privacy Change Management" )
    , ( "PDAT", "Privacy of Sensitive Data" )
    , ( "PRPO", "Privacy Policies & Procedures" )
    , ( "INTL", "International Privacy" )
    , ( "DRPV", "Data Retention & Privacy" )
    , ( "DPAI", "Data Privacy AI" )
    , ( "AIQU", "AI Required Questions" )
    , ( "AIGN", "AI General" )
    , ( "AIPL", "AI Planning" )
    , ( "AISC", "AI Security" )
    , ( "AIML", "AI Machine Learning" )
    , ( "AILM", "AI Large Language Models" )
    ]


sectionName : String -> String
sectionName code =
    case code of
        "GNRL" ->
            "General Information"

        "COMP" ->
            "Company Information"

        "REQU" ->
            "Required Questions"

        "DOCU" ->
            "Documentation"

        "ITAC" ->
            "IT Accessibility"

        "THRD" ->
            "Assessment of Third Parties"

        "CONS" ->
            "Consulting Services"

        "APPL" ->
            "Application/Service Security"

        "AAAI" ->
            "Authentication, Authorization & Account Management"

        "CHNG" ->
            "Change Management"

        "DATA" ->
            "Data"

        "DCTR" ->
            "Datacenter"

        "FIDP" ->
            "Firewalls, IDS, IPS & Networking"

        "PPPR" ->
            "Policies, Processes & Procedures"

        "HFIH" ->
            "Incident Handling"

        "VULN" ->
            "Vulnerability Management"

        "HIPA" ->
            "HIPAA Compliance"

        "PCID" ->
            "PCI DSS"

        "OPEM" ->
            "On-Premises Data Solutions"

        "PRGN" ->
            "General Privacy"

        "PCOM" ->
            "Privacy Company Details"

        "PDOC" ->
            "Privacy Documentation"

        "PTHP" ->
            "Privacy of Third Parties"

        "PCHG" ->
            "Privacy Change Management"

        "PDAT" ->
            "Privacy of Sensitive Data"

        "PRPO" ->
            "Privacy Policies & Procedures"

        "INTL" ->
            "International Privacy"

        "DRPV" ->
            "Data Retention & Privacy"

        "DPAI" ->
            "Data Privacy AI"

        "AIQU" ->
            "AI Required Questions"

        "AIGN" ->
            "AI General"

        "AIPL" ->
            "AI Planning"

        "AISC" ->
            "AI Security"

        "AIML" ->
            "AI Machine Learning"

        "AILM" ->
            "AI Large Language Models"

        _ ->
            code


questions : List Question
questions =
    [ { id = "GNRL-01"
      , section = "GNRL"
      , label = "Solution Provider Name"
      , guidance = Nothing
      , inputType = TextInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "GNRL-02"
      , section = "GNRL"
      , label = "Solution Name"
      , guidance = Nothing
      , inputType = TextInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "GNRL-03"
      , section = "GNRL"
      , label = "Solution Description"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "GNRL-04"
      , section = "GNRL"
      , label = "Solution Provider Contact Name"
      , guidance = Nothing
      , inputType = TextInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "GNRL-05"
      , section = "GNRL"
      , label = "Solution Provider Contact Title"
      , guidance = Nothing
      , inputType = TextInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "GNRL-06"
      , section = "GNRL"
      , label = "Solution Provider Contact Email"
      , guidance = Nothing
      , inputType = EmailInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "GNRL-07"
      , section = "GNRL"
      , label = "Solution Provider Contact Phone Number"
      , guidance = Nothing
      , inputType = TelInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "GNRL-08"
      , section = "GNRL"
      , label = "Country of Company Headquarters"
      , guidance = Nothing
      , inputType = TextInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "GNRL-09"
      , section = "GNRL"
      , label = "Employee Work Locations (all)"
      , guidance = Nothing
      , inputType = TextInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "COMP-01"
      , section = "COMP"
      , label = "Do you have a dedicated software and system development team(s) (e.g., customer support, implementation, product management, etc.)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "COMP-02"
      , section = "COMP"
      , label = "Describe your organization’s business background and ownership structure, including all parent and subsidiary relationships."
      , guidance = (Just "Include circumstances that may involve offshoring or multinational agreements.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "COMP-03"
      , section = "COMP"
      , label = "Have you operated without unplanned disruptions to this solution in the past 12 months?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "COMP-04"
      , section = "COMP"
      , label = "Do you have a dedicated information security staff or office?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "COMP-05"
      , section = "COMP"
      , label = "Use this area to share information about your environment that will assist those who are assessing your company's data security program."
      , guidance = (Just "Share any details that would help information security analysts assess your solution.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "REQU-01"
      , section = "REQU"
      , label = "Are you offering a cloud-based product?"
      , guidance = (Just "If you are only offering a service, or are offering a product that is not cloud-based, answer \"no\".")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "REQU-02"
      , section = "REQU"
      , label = "Does your product or service have an interface?"
      , guidance = (Just "This includes any interface for end users and interfaces used by administrators at the institution.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "REQU-03"
      , section = "REQU"
      , label = "Are you providing consulting services?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "REQU-04"
      , section = "REQU"
      , label = "Does your solution have AI features, or are there plans to implement AI features in the next 12 months?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "REQU-05"
      , section = "REQU"
      , label = "Does your solution process protected health information (PHI) or any data covered by the Health Insurance Portability and Accountability Act (HIPAA)?"
      , guidance = (Just "Answer \"yes\" if your solution handles personal health information (PHI), either directly or via a third party.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "REQU-06"
      , section = "REQU"
      , label = "Is the solution designed to process, store, or transmit credit card information?"
      , guidance = (Just "Answer yes if your solution handles PCI (credit card) information, either directly or via a third party.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "REQU-07"
      , section = "REQU"
      , label = "Does operating your solution require the institution to operate a physical or virtual appliance in their own environment or to provide inbound firewall exceptions to allow your employees to remotely administer systems in the institution's environment?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "REQU-08"
      , section = "REQU"
      , label = "Does your solution have access to personal or institutional data?"
      , guidance = (Just "This includes patient data, student data, employment data, human research data, financial data, etc.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "DOCU-01"
      , section = "DOCU"
      , label = "Do you have a well-documented business continuity plan (BCP), with a clear owner, that is tested annually?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "DOCU-02"
      , section = "DOCU"
      , label = "Do you have a well-documented disaster recovery plan (DRP), with a clear owner, that is tested annually?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "DOCU-03"
      , section = "DOCU"
      , label = "Have you undergone a SSAE 18/SOC 2 audit?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = True
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DOCU-04"
      , section = "DOCU"
      , label = "Do you conform with a specific industry standard security framework (e.g., NIST Cybersecurity Framework, CIS Controls, ISO 27001, etc.)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = True
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DOCU-05"
      , section = "DOCU"
      , label = "Can you provide overall system and/or application architecture diagrams, including a full description of the data flow for all components of the system?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = True
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DOCU-06"
      , section = "DOCU"
      , label = "Does your organization have a data privacy policy?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = True
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DOCU-07"
      , section = "DOCU"
      , label = "Do you have a documented, and currently implemented, employee onboarding and offboarding policy?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = True
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "ITAC-01"
      , section = "ITAC"
      , label = "Solution Provider Accessibility Contact Name"
      , guidance = Nothing
      , inputType = TextInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "ITAC-02"
      , section = "ITAC"
      , label = "Solution Provider Accessibility Contact Title"
      , guidance = Nothing
      , inputType = TextInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "ITAC-03"
      , section = "ITAC"
      , label = "Solution Provider Accessibility Contact Email"
      , guidance = Nothing
      , inputType = EmailInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "ITAC-04"
      , section = "ITAC"
      , label = "Solution Provider Accessibility Contact Phone Number"
      , guidance = Nothing
      , inputType = TelInput
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "ITAC-05"
      , section = "ITAC"
      , label = "Web Link to Accessibility Statement or VPAT"
      , guidance = (Just "VPAT can also be added as an attachment")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "ITAC-06"
      , section = "ITAC"
      , label = "Has a VPAT or ACR been created or updated for the solution and version under consideration within the past 12 months?"
      , guidance = (Just "If your answer is “I do not know,” select “no.” If the VPAT/ACR is for an older version of the product or has not been updated, its information does not accurately reflect the accessibility of the product under consideration and the response should be \"no.\" Provide a link or attachment to the most recent VPAT/ACR.")
      , inputType = RadioYesNo
      , hasAdditional = True
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "ITAC-07"
      , section = "ITAC"
      , label = "Will your company agree to meet your stated accessibility standard or WCAG 2.1 AA as part of your contractual agreement for the solution?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "ITAC-08"
      , section = "ITAC"
      , label = "Does the solution substantially conform to WCAG 2.1 AA?"
      , guidance = (Just "Solutions \"substantially conform\" if they entirely meet WCAG 2.1 AA or if almost all user and administrator features conform. Documentation about limitations and/or workarounds should be provided where WCAG conformance is not presently achieved. If the solution substantially conforms to a newer standard such as WCAG 2.2 AA, answer \"yes.\"")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "ITAC-09"
      , section = "ITAC"
      , label = "Do you have a documented and implemented process for reporting and tracking accessibility issues?"
      , guidance = (Just "Reporting and fixing accessibility issues is critical to a mature process. If the process for this question is merely a \"feature request\" and tracker, the answer to this question should be \"no.\"")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "ITAC-10"
      , section = "ITAC"
      , label = "Do you have documentation to support the accessibility features of your solution?"
      , guidance = (Just "If specific configurations, settings, themes, author guides, or instructions are needed to ensure accessibility, are instructions on how to do so provided for administrators and end users?")
      , inputType = RadioYesNo
      , hasAdditional = True
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "ITAC-11"
      , section = "ITAC"
      , label = "Has a third-party expert conducted an audit of the most recent version of your solution?"
      , guidance = (Just "Audit results, including VPAT/ACRs, are voluntary reports often generated by the creator of the product. Audits conducted and reports generated by expert third parties give greater confidence to customers.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "ITAC-12"
      , section = "ITAC"
      , label = "Do you have a documented and implemented process for verifying accessibility conformance?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "ITAC-13"
      , section = "ITAC"
      , label = "Have you adopted a technical or legal standard of conformance for the solution?"
      , guidance = (Just "Various federal and state governments in the United States and around the world have mandated accessibility technical requirements that should be considered and may be required when selling solutions to institutions in these jurisdictions.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "ITAC-14"
      , section = "ITAC"
      , label = "Can you provide a current, detailed accessibility roadmap with delivery timelines?"
      , guidance = (Just "A detailed accessibility roadmap should reference improvements and progress on known accessibility issues as appropriate but does not necessarily need to list unreleased product features.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "ITAC-15"
      , section = "ITAC"
      , label = "Do you expect your staff to maintain a current skill set in IT accessibility?"
      , guidance = (Just "How do you ensure that your professional staff keeps current with digital accessibility laws and best practices? Is your staff able to evaluate and test this product with assistive technologies such as a screen reader or alternative input devices? Examples of staff certification may include IAAP certifications <https://www.accessibilityassociation.org/s/professional-certifications> or §508 Trusted Tester <https://www.dhs.gov/trusted-tester>.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "ITAC-16"
      , section = "ITAC"
      , label = "Do you have documented processes and procedures for implementing accessibility into your development lifecycle?"
      , guidance = (Just "Describe where accessibility falls in the development and product lifecycle. Is it at the beginning of your project development or after the product is otherwise complete before launch? Do you incorporate accessibility in your development methods, such as Agile scrums? Does your customer-facing accessibility reporting match your development processes (i.e., Agile methods are best represented using a roadmap and timeline; revised VPAT/ACRs provide a snapshot in time of a given release)?")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "ITAC-17"
      , section = "ITAC"
      , label = "Can all functions of the application or service be performed using only the keyboard?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "ITAC-18"
      , section = "ITAC"
      , label = "Does your product rely on activating a special \"accessibility mode,\" a \"lite version,\" or using an alternate interface (including “overlay” or AI-based alternates)  for accessibility purposes?"
      , guidance = (Just "Third-party overlays or add-ons are not sufficient for products to conform with accessibility standards. If there is an accessibility mode, does it address a specific accessibility need? Are plans in place to remove the accessible version, and are these distinctions delineated on your roadmap and timeline?")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "THRD-01"
      , section = "THRD"
      , label = "Do you perform security assessments of third-party companies with which you share data (e.g., hosting providers, cloud services, PaaS, IaaS, SaaS)?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "THRD-02"
      , section = "THRD"
      , label = "Do you have contractual language in place with third parties governing access to institutional data?"
      , guidance = (Just "List each third party and why institutional data is shared with them. Format example: [Third Party Name] - Reason")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "THRD-03"
      , section = "THRD"
      , label = "Do the contracts in place with these third parties address liability in the event of a data breach?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "THRD-04"
      , section = "THRD"
      , label = "Do you have an implemented third-party management strategy?"
      , guidance = (Just "Robust answers from the solution provider improve the quality and efficiency of the security assessment process.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "THRD-05"
      , section = "THRD"
      , label = "Do you have a process and implemented procedures for managing your hardware supply chain (e.g., telecommunications equipment, export licensing, computing devices)?"
      , guidance = (Just "Make sure you address any national or regional regulations.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CONS-01"
      , section = "CONS"
      , label = "Will the consultant require access to the institution's network resources?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "CONS-02"
      , section = "CONS"
      , label = "Has the consultant received training on (sensitive, HIPAA, PCI, etc.) data handling?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "CONS-03"
      , section = "CONS"
      , label = "Is the data encrypted (at rest) while in the consultant's possession?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "CONS-04"
      , section = "CONS"
      , label = "Can access be restricted based on source IP address?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "CONS-05"
      , section = "CONS"
      , label = "Will the consulting take place on-premises?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "CONS-06"
      , section = "CONS"
      , label = "Will the consultant require access to hardware in the institution's data centers?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "CONS-07"
      , section = "CONS"
      , label = "Will the consultant require an account within the institution's domain (@*.edu)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "CONS-08"
      , section = "CONS"
      , label = "Will any data be transferred to the consultant's possession?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "CONS-09"
      , section = "CONS"
      , label = "Will the consultant need remote access to the institution's network or systems?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "APPL-01"
      , section = "APPL"
      , label = "Are access controls for institutional accounts based on structured rules, such as role-based access control (RBAC), attribute-based access control (ABAC), or policy-based access control (PBAC)?"
      , guidance = (Just "This includes end users, administrators, service accounts, etc. PBAC would include various dynamic controls such as conditional access, risk-based access, location-based access, or system activity–based access.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "APPL-02"
      , section = "APPL"
      , label = "Are you using a web application firewall (WAF)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "APPL-03"
      , section = "APPL"
      , label = "Are only currently supported operating system(s), software, and libraries leveraged by the system(s)/application(s) that will have access to institution's data?"
      , guidance = (Just "If the web application only works with a subset of modern supported browsers, please indicate that here.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "APPL-04"
      , section = "APPL"
      , label = "Does your application require access to location or GPS data?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "APPL-05"
      , section = "APPL"
      , label = "Does your application provide separation of duties between security administration, system administration, and standard user functions?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "APPL-06"
      , section = "APPL"
      , label = "Do you subject your code to static code analysis and/or static application security testing prior to release?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "APPL-07"
      , section = "APPL"
      , label = "Do you have software testing processes (dynamic or static) that are established and followed?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "APPL-08"
      , section = "APPL"
      , label = "Are access controls for staff within your organization based on structured rules, such as RBAC, ABAC, or PBAC?"
      , guidance = (Just "This includes system administrators and third-party personnel with access to the system. PBAC would include various dynamic controls such as conditional access, risk-based access, location-based access, or system activity–based access.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "APPL-09"
      , section = "APPL"
      , label = "Does the system provide data input validation and error messages?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "APPL-10"
      , section = "APPL"
      , label = "Do you have a process and implemented procedures for managing your software supply chain (e.g., libraries, repositories, frameworks, etc.)"
      , guidance = (Just "Include any in-house developed or contract development.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "APPL-11"
      , section = "APPL"
      , label = "Have your developers been trained in secure coding techniques?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "APPL-12"
      , section = "APPL"
      , label = "Was your application developed using secure coding techniques?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "APPL-13"
      , section = "APPL"
      , label = "If mobile, is the application available from a trusted source (e.g., App Store, Google Play Store)?"
      , guidance = (Just "Select N/A if there is no mobile version of your app.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "APPL-14"
      , section = "APPL"
      , label = "Do you have a fully implemented policy or procedure that details how your employees obtain administrator access to institutional instance of the application?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AAAI-01"
      , section = "AAAI"
      , label = "Does your solution support single sign-on (SSO) protocols for user and administrator authentication?"
      , guidance = (Just "Answer \"yes\" only if user AND administrator authentication is supported. If partially supported, answer \"no.\" Ensure you respond to any guidance in the Additional Information column.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AAAI-02"
      , section = "AAAI"
      , label = "For customers not using SSO, does your solution support local authentication protocols for user and administrator authentication?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AAAI-03"
      , section = "AAAI"
      , label = "For customers not using SSO, can you enforce password/passphrase complexity requirements (provided by the institution)?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AAAI-04"
      , section = "AAAI"
      , label = "For customers not using SSO, does the system have password complexity or length limitations and/or restrictions?"
      , guidance = (Just "Answer \"yes\" if your solution has internal limits to password complexity (max langth, certain special characters unsupported, etc.).")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "AAAI-05"
      , section = "AAAI"
      , label = "For customers not using SSO, do you have documented password/passphrase reset procedures that are currently implemented in the system and/or customer support?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AAAI-06"
      , section = "AAAI"
      , label = "Does your organization participate in InCommon or another eduGAIN-affiliated trust federation?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AAAI-07"
      , section = "AAAI"
      , label = "Are there any passwords/passphrases hard-coded into your systems or solutions?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "AAAI-08"
      , section = "AAAI"
      , label = "Are you storing any passwords in plaintext?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "AAAI-09"
      , section = "AAAI"
      , label = "Are audit logs available that include AT LEAST all of the following: login, logout, actions performed, and source IP address?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AAAI-10"
      , section = "AAAI"
      , label = "Describe or provide a reference to the (a) system capability to log security/authorization changes, as well as user and administrator security events (i.e., physical or electronic), such as login failures, access denied, changes accepted; and (b) all requirements necessary to implement logging and monitoring on the system. Include (c) information about SIEM/log collector usage."
      , guidance = (Just "Ensure that all elements of AAAI-10 are clearly stated in your response.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = True
      }
    , { id = "AAAI-11"
      , section = "AAAI"
      , label = "Can you provide the institution documentation regarding the retention period for those logs, how logs are protected, and whether they are accessible to the customer (and if so, how)?"
      , guidance = (Just "Ensure that all elements of AAAI-11 are clearly stated in your response.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AAAI-12"
      , section = "AAAI"
      , label = "For customers not using SSO, does your application support integration with other authentication and authorization systems?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AAAI-13"
      , section = "AAAI"
      , label = "Do you allow the customer to specify attribute mappings for any needed information beyond a user identifier? (e.g., Reference eduPerson, ePPA/ePPN/ePE)"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AAAI-14"
      , section = "AAAI"
      , label = "For customers not using SSO, does your application support directory integration for user accounts?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AAAI-15"
      , section = "AAAI"
      , label = "Does your solution support any of the following web SSO standards: SAML2 (with redirect flow), OIDC, CAS, or other?"
      , guidance = (Just "An answer of \"yes\" should be well-supported in the Additional Information column, and all elements of interest should be sufficiently addressed.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AAAI-16"
      , section = "AAAI"
      , label = "Do you support differentiation between email address and user identifier?"
      , guidance = Nothing
      , inputType = EmailInput
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AAAI-17"
      , section = "AAAI"
      , label = "For customers not using SSO, does your application and/or user frontend/portal support multifactor authentication (e.g., Duo, Google Authenticator, OTP, etc.)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AAAI-18"
      , section = "AAAI"
      , label = "Does your application automatically lock the session or log out an account after a period of inactivity?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-01"
      , section = "CHNG"
      , label = "Will the institution be notified of major changes to your environment that could impact the institution's security posture?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "CHNG-02"
      , section = "CHNG"
      , label = "Does the system support client customizations from one release to another?"
      , guidance = (Just "Ensure that all relevant details pertaining to CHNG-06 are clearly stated in your response.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "CHNG-03"
      , section = "CHNG"
      , label = "Do you have an implemented system configuration management process (e.g.,secure \"gold\" images, etc.)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "CHNG-04"
      , section = "CHNG"
      , label = "Do you have a documented change management process?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = True
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-05"
      , section = "CHNG"
      , label = "Does your change management process minimally include authorization, impact analysis, testing, and validation before moving changes to production?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-06"
      , section = "CHNG"
      , label = "Does your change management process verify that all required third-party libraries and dependencies are still supported with each major change?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-07"
      , section = "CHNG"
      , label = "Do you have policy and procedure, currently implemented, managing how critical patches are applied to all systems and applications?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-08"
      , section = "CHNG"
      , label = "Have you implemented policies and procedures that guide how security risks are mitigated until patches can be applied?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-09"
      , section = "CHNG"
      , label = "Do clients have the option to not participate in or postpone an upgrade to a new release?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-10"
      , section = "CHNG"
      , label = "Do you have a fully implemented solution support strategy that defines how many concurrent versions you support?"
      , guidance = (Just "List the current version you support and what percentage of customers are utilizing that version.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-11"
      , section = "CHNG"
      , label = "Do you have a release schedule for product updates?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-12"
      , section = "CHNG"
      , label = "Do you have a technology roadmap, for at least the next two years, for enhancements and bug fixes for the solution being assessed?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-13"
      , section = "CHNG"
      , label = "Can solution updates be completed without institutional involvement (i.e., technically or organizationally)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-14"
      , section = "CHNG"
      , label = "Are upgrades or system changes installed during off-peak hours or in a manner that does not impact the customer?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-15"
      , section = "CHNG"
      , label = "Do procedures exist to provide that emergency changes are documented and authorized (including after-the-fact approval)?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "CHNG-16"
      , section = "CHNG"
      , label = "Do you have a systems management and configuration strategy that encompasses servers, appliances, cloud services, applications, and mobile devices (company and employee owned)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-01"
      , section = "DATA"
      , label = "Will the institution's data be stored on any devices (database servers, file servers, SAN, NAS, etc.) configured with non-RFC 1918/4193 (i.e., publicly routable) IP addresses?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "DATA-02"
      , section = "DATA"
      , label = "Is the transport of sensitive data encrypted using security protocols/algorithms (e.g., system-to-client)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "DATA-03"
      , section = "DATA"
      , label = "Is the storage of sensitive data encrypted using security protocols/algorithms (e.g., disk encryption, at-rest, files, and within a running database)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "DATA-04"
      , section = "DATA"
      , label = "Do all cryptographic modules in use in your solution conform to the Federal Information Processing Standards (FIPS PUB 140-2 or 140-3)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "DATA-05"
      , section = "DATA"
      , label = "Will the institution's data be available within the system for a period of time at the completion of this contract?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "DATA-06"
      , section = "DATA"
      , label = "Are ownership rights to all data, inputs, outputs, and metadata retained even through a provider acquisition or bankruptcy event?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "DATA-07"
      , section = "DATA"
      , label = "Do backups containing the institution's data ever leave the institution's data zone either physically or via network routing?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "DATA-08"
      , section = "DATA"
      , label = "Is media used for long-term retention of business data and archival purposes stored in a secure, environmentally protected area?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "DATA-09"
      , section = "DATA"
      , label = "At the completion of this contract, will data be returned to the institution and/or deleted from all your systems and archives?"
      , guidance = (Just "Please specify if it will be returned, deleted, or both.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-10"
      , section = "DATA"
      , label = "Can the institution extract a full or partial backup of data?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-11"
      , section = "DATA"
      , label = "Do current backups include all operating system software, utilities, security software, application software, and data files necessary for recovery?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-12"
      , section = "DATA"
      , label = "Are you performing off-site backups (i.e., digitally moved off site)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-13"
      , section = "DATA"
      , label = "Are physical backups taken off-site (i.e., physically moved off site)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-14"
      , section = "DATA"
      , label = "Are data backups encrypted?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-15"
      , section = "DATA"
      , label = "Do you have a media handling process that is documented and currently implemented that meets established business needs and regulatory requirements, including end-of-life, repurposing, and data-sanitization procedures?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-16"
      , section = "DATA"
      , label = "Does the process described in DATA-15 adhere to DoD 5220.22-M and/or NIST SP 800-88 standards?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-17"
      , section = "DATA"
      , label = "Does your staff (or third party) have access to institutional data (e.g., financial, PHI, or other sensitive information) through any means?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "DATA-18"
      , section = "DATA"
      , label = "Do you have a documented and currently implemented strategy for securing employee workstations when they work remotely (i.e., not in a trusted computing environment)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-19"
      , section = "DATA"
      , label = "Does the environment provide for dedicated single-tenant capabilities? If not, describe how your solution or environment separates data from different customers (e.g., logically, physically, single tenancy, multi-tenancy)."
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-20"
      , section = "DATA"
      , label = "Are ownership rights to all data, inputs, outputs, and metadata retained by the institution?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-21"
      , section = "DATA"
      , label = "In the event of imminent bankruptcy, closing of business, or retirement of service, will you provide 90 days for customers to get their data out of the system and migrate applications?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-22"
      , section = "DATA"
      , label = "Are involatile backup copies made according to predefined schedules and securely stored and protected?"
      , guidance = (Just "Ensure that response addresses involatile storage and lists retention periods.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DATA-23"
      , section = "DATA"
      , label = "Do you have a cryptographic key management process (generation, exchange, storage, safeguards, use, vetting, and replacement) that is documented and currently implemented, for all system components (e.g., database, system, web, etc.)?"
      , guidance = (Just "Summarize your cryptographic key management process.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-01"
      , section = "DCTR"
      , label = "Select your hosting option."
      , guidance = (Just "If you are using an option not listed, or a combination of options, select \"Other.\" Your selection here will determine which questions below are required.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "DCTR-02"
      , section = "DCTR"
      , label = "Is a SOC 2 Type 2 report available for the hosting environment?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-03"
      , section = "DCTR"
      , label = "Are you generally able to accommodate storing each institution's data within its geographic region?"
      , guidance = (Just "Please indicate which geographic regions you can provide storage in the Additional Info column.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-04"
      , section = "DCTR"
      , label = "Are the data centers staffed 24 hours a day, seven days a week (i.e., 24 x 7 x 365)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-05"
      , section = "DCTR"
      , label = "Are your servers separated from other companies via a physical barrier, such as a cage or hard walls?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-06"
      , section = "DCTR"
      , label = "Does a physical barrier fully enclose the physical space, preventing unauthorized physical contact with any of your devices?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "DCTR-07"
      , section = "DCTR"
      , label = "Are your primary and secondary data centers geographically diverse?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-08"
      , section = "DCTR"
      , label = "Is the service hosted in a high-availability environment?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-09"
      , section = "DCTR"
      , label = "Is redundant power available for all data centers where institutional data will reside?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-10"
      , section = "DCTR"
      , label = "Are redundant power strategies tested?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "DCTR-11"
      , section = "DCTR"
      , label = "Does the center where the data will reside have cooling and fire-suppression systems that are active and regularly tested?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-12"
      , section = "DCTR"
      , label = "Do you have Internet Service Provider (ISP) redundancy?"
      , guidance = (Just "State the ISP provider(s) in addition to the number of ISPs that provide connectivity.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-13"
      , section = "DCTR"
      , label = "Does every data center where the institution's data will reside have multiple telephone company or network provider entrances to the facility?"
      , guidance = Nothing
      , inputType = TelInput
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-14"
      , section = "DCTR"
      , label = "Do you require multifactor authentication for all administrative accounts in your environment?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-15"
      , section = "DCTR"
      , label = "Are you using your cloud provider's available hardening tools or pre-hardened images?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DCTR-16"
      , section = "DCTR"
      , label = "Does your cloud solution provider have access to your encryption keys?"
      , guidance = (Just "Describe your key management practices.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "FIDP-01"
      , section = "FIDP"
      , label = "Are you utilizing a stateful packet inspection (SPI) firewall?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "FIDP-02"
      , section = "FIDP"
      , label = "Do you have a documented policy for firewall change requests?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "FIDP-03"
      , section = "FIDP"
      , label = "Have you implemented an intrusion detection system (network-based)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "FIDP-04"
      , section = "FIDP"
      , label = "Do you employ host-based intrusion detection?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "FIDP-05"
      , section = "FIDP"
      , label = "Are audit logs available for all changes to the network, firewall, IDS, and IPS systems?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "FIDP-06"
      , section = "FIDP"
      , label = "Is authority for firewall change approval documented? Please list approver names or titles in Additional Info."
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "FIDP-07"
      , section = "FIDP"
      , label = "Have you implemented an intrusion prevention system (network-based)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "FIDP-08"
      , section = "FIDP"
      , label = "Do you employ host-based intrusion prevention?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "FIDP-09"
      , section = "FIDP"
      , label = "Are you employing any next-generation persistent threat (NGPT) monitoring?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "FIDP-10"
      , section = "FIDP"
      , label = "Is intrusion monitoring performed internally or by a third-party service?"
      , guidance = (Just "In addition to stating your intrusion monitoring strategy, provide a brief summary of its implementation.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "FIDP-11"
      , section = "FIDP"
      , label = "Do you monitor for intrusions on a 24 x 7 x 365 basis?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-01"
      , section = "PPPR"
      , label = "Do you have a documented patch management process?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "PPPR-02"
      , section = "PPPR"
      , label = "Can your organization comply with institutional policies on privacy and data protection with regard to users of institutional systems, if required?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "PPPR-03"
      , section = "PPPR"
      , label = "Is your company subject to the institution's geographic region's laws and regulations?"
      , guidance = (Just "State the country that governs and regulates your company.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "PPPR-04"
      , section = "PPPR"
      , label = "Can you accommodate encryption requirements using open standards?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-05"
      , section = "PPPR"
      , label = "Do you have a documented systems development life cycle (SDLC)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-06"
      , section = "PPPR"
      , label = "Do you perform background screenings or multi-state background checks on all employees prior to their first day of work?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-07"
      , section = "PPPR"
      , label = "Do you require new employees to fill out agreements and review policies?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-08"
      , section = "PPPR"
      , label = "Do you have a documented information security policy?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-09"
      , section = "PPPR"
      , label = "Are information security principles designed into the product lifecycle?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-10"
      , section = "PPPR"
      , label = "Will you comply with applicable breach notification laws?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-11"
      , section = "PPPR"
      , label = "Do you have an information security awareness program?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-12"
      , section = "PPPR"
      , label = "Is security awareness training mandatory for all employees?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-13"
      , section = "PPPR"
      , label = "Do you have process and procedure(s) documented, and currently followed, that require a review and update of the access list(s) for privileged accounts?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-14"
      , section = "PPPR"
      , label = "Do you have documented, and currently implemented, internal audit processes and procedures?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PPPR-15"
      , section = "PPPR"
      , label = "Does your organization have physical security controls and policies in place?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HFIH-01"
      , section = "HFIH"
      , label = "Do you have a formal incident response plan?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HFIH-02"
      , section = "HFIH"
      , label = "Do you either have an internal incident response team or retain an external team?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HFIH-03"
      , section = "HFIH"
      , label = "Do you have the capability to respond to incidents on a 24 x 7 x 365 basis?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HFIH-04"
      , section = "HFIH"
      , label = "Do you carry cyber-risk insurance to protect against unforeseen service outages, data that is lost or stolen, and security incidents?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "VULN-01"
      , section = "VULN"
      , label = "Are your systems and applications scanned with an authenticated user account for vulnerabilities (that are remediated) prior to new releases?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "VULN-02"
      , section = "VULN"
      , label = "Will you provide results of application and system vulnerability scans to the institution?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "VULN-03"
      , section = "VULN"
      , label = "Will you allow the institution to perform its own vulnerability testing and/or scanning of your systems and/or application, provided that testing is performed at a mutually agreed upon time and date?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "VULN-04"
      , section = "VULN"
      , label = "Have your systems and applications had a third-party security assessment completed in the last year?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "VULN-05"
      , section = "VULN"
      , label = "Do you regularly scan for common web application security vulnerabilities (e.g., SQL injection, XSS, XSRF, etc.)?"
      , guidance = (Just "Ensure that all elements of VULN-05 are clearly stated in your response.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "VULN-06"
      , section = "VULN"
      , label = "Are your systems and applications regularly scanned externally for vulnerabilities?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-01"
      , section = "HIPA"
      , label = "Do your workforce members receive regular training related to the Health Insurance Portability and Accountability Act (HIPAA) Privacy and Security Rules and the HITECH Act?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "HIPA-02"
      , section = "HIPA"
      , label = "Have you identified areas of risk?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "HIPA-03"
      , section = "HIPA"
      , label = "Have the relevant policies/plans been tested?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "HIPA-04"
      , section = "HIPA"
      , label = "Have you entered into a Business Associate Agreements with all subcontractors who may have access to protected health information (PHI)?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "HIPA-05"
      , section = "HIPA"
      , label = "Do you monitor or receive information regarding changes in HIPAA regulations?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-06"
      , section = "HIPA"
      , label = "Has your organization designated HIPAA Privacy and Security officers as required by the rules?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-07"
      , section = "HIPA"
      , label = "Do you comply with the requirements of the Health Information Technology for Economic and Clinical Health Act (HITECH)?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-08"
      , section = "HIPA"
      , label = "Have you conducted a risk analysis as required under the HIPAA Security Rule?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-09"
      , section = "HIPA"
      , label = "Have you taken actions to mitigate the identified risks?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-10"
      , section = "HIPA"
      , label = "Does your application require user and system administrator password changes at a frequency no greater than 90 days?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-11"
      , section = "HIPA"
      , label = "Does your application require users to set their own password after an administrator reset or on first use of the account?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-12"
      , section = "HIPA"
      , label = "Does your application lock out an account after a number of failed login attempts?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-13"
      , section = "HIPA"
      , label = "Does your application automatically lock or log-out an account after a period of inactivity?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-14"
      , section = "HIPA"
      , label = "Are passwords visible in plain text, whether when stored or entered, including service level accounts (i.e., database accounts, etc.)?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "HIPA-15"
      , section = "HIPA"
      , label = "If the application is institution-hosted, can all service level and administrative account passwords be changed by the institution?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-16"
      , section = "HIPA"
      , label = "Does your application provide the ability to define user access levels?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-17"
      , section = "HIPA"
      , label = "Does your application support varying levels of access to administrative tasks defined individually per user?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-18"
      , section = "HIPA"
      , label = "Does your application support varying levels of access to records based on user ID?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "HIPA-19"
      , section = "HIPA"
      , label = "Is there a limit to the number of groups to which a user can be assigned?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-20"
      , section = "HIPA"
      , label = "Do accounts used for solution provider-supplied remote support abide by the same authentication policies and access logging as the rest of the system?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-21"
      , section = "HIPA"
      , label = "Does the application log record access including specific user, date/time of access, and originating IP or device?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-22"
      , section = "HIPA"
      , label = "Does the application log administrative activity, such as user account access changes and password changes, including specific user, date/time of changes, and originating IP or device?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-23"
      , section = "HIPA"
      , label = "Do you retain logs for at least as long as required by HIPAA regulations?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-24"
      , section = "HIPA"
      , label = "Can the application logs be archived?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-25"
      , section = "HIPA"
      , label = "Can the application logs be saved externally?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-26"
      , section = "HIPA"
      , label = "Do you have a disaster recovery plan and emergency mode operation plan?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-27"
      , section = "HIPA"
      , label = "Can you provide a HIPAA compliance attestation document?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-28"
      , section = "HIPA"
      , label = "Are you willing to enter into a Business Associate Agreement (BAA)?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "HIPA-29"
      , section = "HIPA"
      , label = "Do your data backup and retention policies and practices meet HIPAA requirements?"
      , guidance = (Just "Refer to HIPAA regulations documentation for supplemental guidance in this section.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PCID-01"
      , section = "PCID"
      , label = "Do you have a current, executed within the past year, Attestation of Compliance (AoC) or Report on Compliance (RoC)?"
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "PCID-02"
      , section = "PCID"
      , label = "Is the application listed as an approved Payment Application Data Security Standard (PA-DSS) application?"
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "PCID-03"
      , section = "PCID"
      , label = "Does the system or solutions use a third party to collect, store, process, or transmit cardholder (payment/credit/debt card) data?"
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "PCID-04"
      , section = "PCID"
      , label = "Do your systems or solutions store, process, or transmit cardholder (payment/credit/debt card) data?"
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PCID-05"
      , section = "PCID"
      , label = "Are you compliant with the Payment Card Industry Data Security Standard (PCI DSS)?"
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PCID-06"
      , section = "PCID"
      , label = "Are you classified as a service provider?"
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PCID-07"
      , section = "PCID"
      , label = "Are you on the list of Visa approved service providers?"
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PCID-08"
      , section = "PCID"
      , label = "Are you classified as a merchant? If so, what level (1, 2, 3, 4)?"
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PCID-09"
      , section = "PCID"
      , label = "Describe the architecture employed by the system to verify and authorize credit card transactions."
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "PCID-10"
      , section = "PCID"
      , label = "What payment processors/gateways does the system support?"
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "PCID-11"
      , section = "PCID"
      , label = "Can the application be installed in a PCI DSS–compliant manner?"
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PCID-12"
      , section = "PCID"
      , label = "Include documentation describing the system's abilities to comply with the PCI DSS and any features or capabilities of the system that must be added or changed in order to operate in compliance with the standards."
      , guidance = (Just "Refer to PCI DSS Security Standards for supplemental guidance in this section")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "OPEM-01"
      , section = "OPEM"
      , label = "Do you support role-based access control (RBAC) for system administrators?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "OPEM-02"
      , section = "OPEM"
      , label = "Can your employees access customer systems remotely?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "OPEM-03"
      , section = "OPEM"
      , label = "Can you provide overall system and/or application architecture diagrams including a full description of the data communications architecture for all components of the system?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "OPEM-04"
      , section = "OPEM"
      , label = "Do you require remote management of the system?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "OPEM-05"
      , section = "OPEM"
      , label = "If you answered \"yes\" to OPEM-04, are your remote actions and changes logged or otherwise visible to the campus?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "OPEM-06"
      , section = "OPEM"
      , label = "If you maintain remote access to the system, will you handle data in a FERPA-compliant manner?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "OPEM-07"
      , section = "OPEM"
      , label = "Do you support campus status monitoring through SNMPv3 or other means?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "OPEM-08"
      , section = "OPEM"
      , label = "Describe or provide a reference to any other safeguards used to monitor for malicious activity."
      , guidance = (Just "Please detail your monitoring strategy")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "OPEM-09"
      , section = "OPEM"
      , label = "Describe how long your organization has conducted business in this area."
      , guidance = (Just "Include the number of years and in what capacity.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "OPEM-10"
      , section = "OPEM"
      , label = "Do you have existing higher education customers?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PRGN-01"
      , section = "PRGN"
      , label = "Does your solution process FERPA-related data?"
      , guidance = (Just "FERPA-related data includes any data maintained by (or on behalf of) the institution that is directly related to an identifiable student.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "PRGN-02"
      , section = "PRGN"
      , label = "Does your solution process GDPR-related or PIPL-related data?"
      , guidance = (Just "GDPR data includes any data related to an identified or identifiable natural person physically located in the European Economic Area (EEA).")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "PRGN-03"
      , section = "PRGN"
      , label = "Does your solution process personal data regulated by state law(s) (e.g., CCPA)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "PRGN-04"
      , section = "PRGN"
      , label = "Does your solution process user-provided data that may contain regulated information?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "PRGN-05"
      , section = "PRGN"
      , label = "Web Link to Product/Service Privacy Notice"
      , guidance = (Just "If multiple notices are implicated, provide all that apply. If any other documents are incorporated by reference, provide them as well.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "PCOM-01"
      , section = "PCOM"
      , label = "Have you had a personal data breach in the past three years that involved reporting to a governmental agency, notice to individuals (including voluntary notice), or notice to another organization or institution?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "PCOM-02"
      , section = "PCOM"
      , label = "Use this area to share information about your privacy practices that will assist those who are assessing your company data privacy program."
      , guidance = (Just "Share any additional details that would help data privacy analysts assess your solution.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = True
      }
    , { id = "PCOM-03"
      , section = "PCOM"
      , label = "Have you had any violations of your internal privacy policies or violations of applicable privacy law in the past 36 months?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "PCOM-04"
      , section = "PCOM"
      , label = "Do you have a dedicated data privacy staff or office?"
      , guidance = (Just "This can include another office, such as information security, dedicated to privacy protection.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PDOC-01"
      , section = "PDOC"
      , label = "If you have completed a SOC 2 audit, does it include the Privacy Trust Service Principle?"
      , guidance = (Just "SOC 2 Type II audits can be conducted for any or all of five trust principles (confidentiality, integrity, availability, security, and privacy). Answer \"yes\" if your audit included the privacy principle.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "PDOC-02"
      , section = "PDOC"
      , label = "Do you conform with a specific industry-standard privacy framework (e.g., NIST Privacy Framework, GDPR, ISO 27701)?"
      , guidance = (Just "Standard privacy frameworks help organizations enhance data protection, mitigate privacy risks, and demonstrate compliance with appropriate industry and regulatory standards. This is particularly important when providing services in different jurisdictions.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "PDOC-03"
      , section = "PDOC"
      , label = "Does your employee onboarding and offboarding policy include training of employees on information security and data privacy?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PTHP-01"
      , section = "PTHP"
      , label = "Do you have contractual agreements with third parties that require them to maintain standards and to comply with all regulatory requirements?"
      , guidance = (Just "Inclusion of language in contractual agreements ensures third parties are aware of and have agreed to their obligations to maintain standards and comply with all regulatory requirements in regards to protection of personal data they handle on behalf of your organization.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "PTHP-02"
      , section = "PTHP"
      , label = "Do you perform privacy impact assesments of third parties that collect, process, or have access to personal data to ensure they meet industry and regulatory standards and to mitigate harmful, unethical, or discriminatory impacts on data subjects?"
      , guidance = (Just "Privacy impact assessments ensure that third-party collection, processing, or access to personal data aligns with and supports your organization's own efforts and commitments to clients. This is particularly important when a specific third party operates from or is subject to a jurisdiction different from that of your organization.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PCHG-01"
      , section = "PCHG"
      , label = "Does your change management process include privacy review and approval?"
      , guidance = (Just "The change management process minimizes disruption and maximizes benefits and should contain a privacy review process.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PCHG-02"
      , section = "PCHG"
      , label = "Do you have policy and procedure, currently implemented, guiding how privacy risks are mitigated until they can be resolved?"
      , guidance = (Just "Policy and procedure should include specific steps to take in the process of mitigating privacy risks.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PDAT-01"
      , section = "PDAT"
      , label = "Do you collect, process, or store demographic information?"
      , guidance = (Just "Demographic information is generally defined as the statistical characteristics of a population used to study and understand certain aspects of that population. It can include characteristics such as age, gender, ethnicity, education, religion, geolocation, and occupation. If the information being collected, processed, or stored falls under a particular regulation (or law), check that regulation for a specific definition of demographic information.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "PDAT-02"
      , section = "PDAT"
      , label = "Do you capture or create genetic, biometric, or behaviometric information (e.g., facial recognition or fingerprints)?"
      , guidance = (Just "Genetic information would include information about genetic tests, genetic tests of family members, actual manifestations of diseases, and family medical records. Biometric information includes elements such as facial recognition, fingerprints, and voice recognition.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "PDAT-03"
      , section = "PDAT"
      , label = "Do you combine institutional data (including \"de-identified,\" \"anonymized,\" or otherwise masked data) with personal data from any other sources?"
      , guidance = (Just "Institutional data is created, collected, maintained, transmitted, or stored by or for a college or university to conduct operations. Many institutions have their own specific definitions. Institutional data would include data such as financial information, student education records, faculty/staff/alumni data, research data, and data collected for government reporting purposes.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "PDAT-04"
      , section = "PDAT"
      , label = "Is institutional data coming into or going out of the United States at any point during collection, processing, storage, or archiving?"
      , guidance = (Just "Given the vast number of privacy regulations and laws throughout the world, it is important to know when, where, why, and how institutional data is being shared outside the United States. This information is necessary to ensure compliance and to protect the institutional data.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "PDAT-05"
      , section = "PDAT"
      , label = "Do you capture device information (e.g., IP address, MAC address)?"
      , guidance = (Just "Device information can be captured for a variety of reasons, from analytics to marketing to network management and security. It is important to know the details in order to be clear on the privacy implications.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "PDAT-06"
      , section = "PDAT"
      , label = "Does any part of this service/project involve a web/app tracking component (e.g., use of web-tracking pixels, cookies)?"
      , guidance = (Just "Web tracking can be used to identify users via their IP address, login information, browser information, etc.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "PDAT-07"
      , section = "PDAT"
      , label = "Does your staff (or a third party) have access to institutional data (e.g., financial, PHI, or other sensitive information) through any means?"
      , guidance = (Just "Accessing institutional data may be necessary for legitimate business purposes.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "PDAT-08"
      , section = "PDAT"
      , label = "Will you handle personal data in a manner compliant with all relevant laws, regulations, and applicable institution policies?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "PRPO-01"
      , section = "PRPO"
      , label = "Do you have a documented privacy management process?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PRPO-02"
      , section = "PRPO"
      , label = "Are privacy principles designed into the product lifecycle (i.e., privacy-by-design)?"
      , guidance = (Just "The question is assessing your compliance with Privacy by Design (PbD) principles. This concept, embedded in regulations such as GDPR (Article 25) and other global privacy laws, requires that privacy is not an afterthought—it must be part of the design and architecture of systems and processes from the outset.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PRPO-03"
      , section = "PRPO"
      , label = "Will you comply with applicable breach notification laws?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PRPO-04"
      , section = "PRPO"
      , label = "Will you comply with the institution's policies regarding user privacy and data protection?"
      , guidance = (Just "These policies may include specific user consent practices, data classification standards, and handling of sensitive information.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PRPO-05"
      , section = "PRPO"
      , label = "Is your company subject to the laws and regulations of the institution's geographic region?"
      , guidance = (Just "Indicates whether your organization is legally bound by state, federal, or local laws where the institution operates.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PRPO-06"
      , section = "PRPO"
      , label = "Do you have a privacy awareness/training program?"
      , guidance = (Just "Privacy awareness/training refers to the ongoing education provided to individuals who handle sensitive data to ensure they understand privacy obligations, data protection principles, and regulatory requirements (e.g., FERPA, HIPAA, GDPR).")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "PRPO-07"
      , section = "PRPO"
      , label = "Is privacy awareness training mandatory for all employees?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PRPO-08"
      , section = "PRPO"
      , label = "Is AI privacy and ethics awareness/training required for all employees who work with AI?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PRPO-09"
      , section = "PRPO"
      , label = "Do you have any decision-making processes that are completely automated (i.e., there is no human involvement)?"
      , guidance = (Just "Examples of such automated decisions could include automatically denying or approving user access requests, flagging or blocking transactions based on risk scores, or AI-driven decisions that affect user outcomes (e.g., eligibility, grading, pricing).")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "PRPO-10"
      , section = "PRPO"
      , label = "Do you have a documented process for managing automated processing, including validations, monitoring, and data subject requests?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PRPO-11"
      , section = "PRPO"
      , label = "Do you have a documented policy for sharing information with law enforcement?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "PRPO-12"
      , section = "PRPO"
      , label = "Do you share any institutional data with law enforcement without a valid warrant or subpoena?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "PRPO-13"
      , section = "PRPO"
      , label = "Does your incident response team include a privacy analyst/officer?"
      , guidance = (Just "Provide an overview of your incident response team membership and its charge, highlighting the privacy analyst/officer.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "INTL-01"
      , section = "INTL"
      , label = "Will data be collected from or processed in or stored in the European Economic Area (EEA)?"
      , guidance = (Just "See GDPR Chapter 1, Art. 4, for definitions.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "INTL-02"
      , section = "INTL"
      , label = "Do you have a data protection officer (DPO)?"
      , guidance = (Just "See GDPR Chapter 4, Section 4, for DPO information.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "INTL-03"
      , section = "INTL"
      , label = "Will you sign appropriate GDPR Standard Contractual Clauses (SCCs) with the institution?"
      , guidance = (Just "See GDPR Chapter 5, Art. 46, for SCC information.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "INTL-04"
      , section = "INTL"
      , label = "Will data be collected from or processed in or stored in China?"
      , guidance = (Just "See PIPL Chapter 1 for definitions.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "INTL-05"
      , section = "INTL"
      , label = "Do you comply with PIPL security, privacy, and data localization requirements?"
      , guidance = (Just "See PIPL Chapter 5 for requirements.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-01"
      , section = "DRPV"
      , label = "Have you performed a Data Privacy Impact Assesssment for the solution/project?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-02"
      , section = "DRPV"
      , label = "Do you provide an end-user privacy notice about privacy policies and procedures that identify the purpose(s) for which personal information is collected, used, retained, and disclosed?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-03"
      , section = "DRPV"
      , label = "Do you describe the choices available to the individual and obtain implicit or explicit consent with respect to the collection, use, and disclosure of personal information?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-04"
      , section = "DRPV"
      , label = "Do you collect personal information only for the purpose(s) identified in the agreement with an institution or, if there is none, the purpose(s) identified in the privacy notice?"
      , guidance = (Just "This includes quality assurance, marketing and advertising, etc.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-05"
      , section = "DRPV"
      , label = "Do you have a documented list of personal data your service maintains?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-06"
      , section = "DRPV"
      , label = "Do you retain personal information for only as long as necessary to fulfill the stated purpose(s) or as required by law or regulation and thereafter appropriately dispose of such information?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-07"
      , section = "DRPV"
      , label = "Do you provide individuals with access to their personal information for review and update (i.e., data subject rights)?"
      , guidance = (Just "Such processes would include descriptions of request processes individuals can follow to review thier information and written processes a data subject may use to ask for changes or corrections to data held about them.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-08"
      , section = "DRPV"
      , label = "Do you disclose personal information to third parties only for the purpose(s) identified in the privacy notice or with the implicit or explicit consent of the individual?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-09"
      , section = "DRPV"
      , label = "Do you protect personal information against unauthorized access (both physical and logical)?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-10"
      , section = "DRPV"
      , label = "Do you maintain accurate, complete, and relevant personal information for the purposes identified in the privacy notice?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-11"
      , section = "DRPV"
      , label = "Do you have procedures to address privacy-related noncompliance complaints and disputes?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-12"
      , section = "DRPV"
      , label = "Do you \"anonymize,\" \"de-identify,\" or otherwise mask personal data?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-13"
      , section = "DRPV"
      , label = "Do you or your subprocessors use or disclose \"anonymized,\" \"de-identified,\" or otherwise masked data for any purpose other than those identified in the agreement with an institution (e.g., sharing with ad networks or data brokers, marketing, creation of profiles, analytics unrelated to services provided to institution)?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "DRPV-14"
      , section = "DRPV"
      , label = "Do you certify stop-processing requests, including any data that is processed by a third party on your behalf?"
      , guidance = (Just "Provide evidence of existing processes or policies. The internal privacy policy should explain your organization's policies and practices regarding the collection of personal information and other data about individuals.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DRPV-15"
      , section = "DRPV"
      , label = "Do you have a process to review code for ethical considerations?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DPAI-01"
      , section = "DPAI"
      , label = "Does your service use AI for the processing of institutional data?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "DPAI-02"
      , section = "DPAI"
      , label = "Is any institutional data retained in AI processing?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "DPAI-03"
      , section = "DPAI"
      , label = "Do you have agreements in place with third parties or subprocessors regarding the protection of customer data and use of AI?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "DPAI-04"
      , section = "DPAI"
      , label = "Will institutional data be processed through a third party or subprocessor that also uses AI?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "DPAI-05"
      , section = "DPAI"
      , label = "Is AI processing limited to fully licensed commercial enterprise AI services?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DPAI-06"
      , section = "DPAI"
      , label = "Will institutional data be used or processed by any shared AI services?"
      , guidance = (Just "Provide detailed response to the type of data needed for the AI service to function appropriately, the sources of the data, and whether any data shared with the AI service comes from data sources outside the institution.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = False
      }
    , { id = "DPAI-07"
      , section = "DPAI"
      , label = "Do you have safeguards in place to protect institutional data and data privacy from unintended AI queries or processing?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "DPAI-08"
      , section = "DPAI"
      , label = "Do you provide choice to the user to opt out of AI use?"
      , guidance = Nothing
      , inputType = TextArea
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AIQU-01"
      , section = "AIQU"
      , label = "Does your solution leverage machine learning (ML) or do you plan to do so in the next 12 months?"
      , guidance = (Just "Answer \"yes\" even if you do not create your own machine learning solutions, and answer the questions as they apply to your contractual relationship with the third party you utilize.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "AIQU-02"
      , section = "AIQU"
      , label = "Does your solution leverage a large language model (LLM) or do you plan to do so in the next 12 months?"
      , guidance = (Just "Answer \"yes\" even if you do not train your own LLM models, and answer the questions as they apply to your contractual relationship with the third party you utilize.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "AIGN-01"
      , section = "AIGN"
      , label = "Does your solution have an AI risk model when developing or implementing your solution's AI model?"
      , guidance = (Just "Examples include NIST AI RMF, OWASP Top 10, RAFT, and MITRE ATLAS.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AIGN-02"
      , section = "AIGN"
      , label = "Can your solution's AI features be disabled by tenant and/or user?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AIGN-03"
      , section = "AIGN"
      , label = "Have your staff completed responsible AI training?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AIGN-04"
      , section = "AIGN"
      , label = "Please describe the capabilities of your solution's AI features."
      , guidance = (Just "Describe capabilities such as content (text, image, audio, speech, video, or code) generation, visual interpretation, and predictive analytics. This encompasses all AI implementations, including third-party AI geatures. Clarify use cases or limits of the model.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "AIGN-05"
      , section = "AIGN"
      , label = "Does your solution support business rules to protect sensitive data from being ingested by the AI model?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AIPL-01"
      , section = "AIPL"
      , label = "Are your AI developer's policies, processes, procedures, and practices across the organization related to the mapping, measuring, and managing of AI risks conspicuously posted, unambiguous, and implemented effectively?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AIPL-02"
      , section = "AIPL"
      , label = "Have you identified and measured AI risks?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AIPL-03"
      , section = "AIPL"
      , label = "In the event of an incident, can your solution's AI features be disabled in a timely manner?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AIPL-04"
      , section = "AIPL"
      , label = "If disabled because of an incident, can your solution's AI features be re-enabled in a timely manner?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AIPL-05"
      , section = "AIPL"
      , label = "Do you have documented technical and procedural processes to address potential negative impacts of AI as described by the AI Risk Management Framework (RMF)?"
      , guidance = (Just "Responsible AI development per NIST AI RMF, page 25.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AISC-01"
      , section = "AISC"
      , label = "If sensitive data is introduced to your solution's AI model, can the data be removed from the AI model by request?"
      , guidance = (Just "Please answer based on whether your AI model supports the removal or unlearning of sensitive data, whether it is introduced intentionally or unintentionally. Consider whether data can be traced and deleted from training sets, vector stores, memory, or other components of the AI system. This includes data removal in compliance with privacy regulations and customer requests.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AISC-02"
      , section = "AISC"
      , label = "Is user input data used to influence your solution's AI model?"
      , guidance = (Just "Please answer based on whether your solution uses user input data (e.g., prompts, uploads, queries) to fine-tune, train, or otherwise influence the behavior of your AI model. Consider any use of user data for model improvement, personalization, or aggregated learning.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "No")
      , isCritical = True
      }
    , { id = "AISC-03"
      , section = "AISC"
      , label = "Do you provide logging for your solution's AI feature(s) that includes user, date, and action taken?"
      , guidance = (Just "Please answer based on whether your AI features generate audit logs that record user identity, timestamp, and actions taken. Include log retention, immutability, access for administrators or auditors, and how logs support compliance and incident response.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AISC-04"
      , section = "AISC"
      , label = "Please describe how you validate user inputs."
      , guidance = (Just "Please describe how your solution validates user inputs, including detection of anomalies, malicious inputs, and sensitive data. Indicate where validation occurs and how it supports security and compliance.")
      , inputType = TextArea
      , hasAdditional = False
      , importance = Unscored
      , weight = 0
      , isScored = False
      , compliantResponse = Nothing
      , isCritical = False
      }
    , { id = "AISC-05"
      , section = "AISC"
      , label = "Do you plan for and mitigate supply-chain risk related to your AI features?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AIML-01"
      , section = "AIML"
      , label = "Do you separate ML training data from your ML solution data?"
      , guidance = (Just "Please answer based on whether training data is kept separate from production data to protect institutional information. Include how organizational data is segregated, anonymized, or excluded from training, and state whether institutions can opt out of data use for model improvement.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AIML-02"
      , section = "AIML"
      , label = "Do you authenticate and verify your ML model's feedback?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AIML-03"
      , section = "AIML"
      , label = "Is your ML training data vetted, validated, and verified before training the solution's AI model?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AIML-04"
      , section = "AIML"
      , label = "Is your ML training data monitored and audited?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AIML-05"
      , section = "AIML"
      , label = "Have you limited access to your ML training data to only staff with an explicit business need?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AIML-06"
      , section = "AIML"
      , label = "Have you implemented adversarial training or other model defense mechanisms to protect your ML-related features?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AIML-07"
      , section = "AIML"
      , label = "Do you make your ML model transparent through documentation and log inputs and outputs?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AIML-08"
      , section = "AIML"
      , label = "Do you watermark your ML training data?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AILM-01"
      , section = "AILM"
      , label = "Do you limit your solution's LLM privileges by default?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AILM-02"
      , section = "AILM"
      , label = "Is your LLM training data vetted, validated, and verified before training the solution's AI model?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AILM-03"
      , section = "AILM"
      , label = "Do any actions taken by your solution's LLM features or plugins require human intervention?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AILM-04"
      , section = "AILM"
      , label = "Do you limit multiple LLM model plugins being called as part of a single input?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Critical
      , weight = 20
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = True
      }
    , { id = "AILM-05"
      , section = "AILM"
      , label = "Do you limit your solution's LLM resource use per request, per step, and per action?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AILM-06"
      , section = "AILM"
      , label = "Do you leverage LLM model tuning or other model validation mechanisms?"
      , guidance = Nothing
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Standard
      , weight = 10
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    , { id = "AILM-07"
      , section = "AILM"
      , label = "Do you perform taint tracing or tracking on all plugin content related to the LLM?"
      , guidance = (Just "Looking for taint tracing or tracking of LLM plugins to mitigate malicious inputs tuning and prompt engineering.")
      , inputType = RadioYesNo
      , hasAdditional = False
      , importance = Minor
      , weight = 5
      , isScored = True
      , compliantResponse = (Just "Yes")
      , isCritical = False
      }
    ]