port module Main exposing (main)

import Browser
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode
import Json.Encode as Encode
import Set exposing (Set)
import Questions exposing (..)


port downloadJson : String -> Cmd msg


port generateXlsx : Encode.Value -> Cmd msg


port requestImport : () -> Cmd msg


port importLoaded : (String -> msg) -> Sub msg



-- MODEL


type alias Finding =
    { id : String
    , label : String
    , importance : Importance
    , answer : String
    , expected : String
    }


type alias SectionScore =
    { name : String
    , actual : Int
    , potential : Int
    , nonCompliant : List Finding
    , unanswered : Int
    }


type alias Scores =
    { totalActual : Int
    , totalPotential : Int
    , critActual : Int
    , critPotential : Int
    , overallPct : Int
    , critPct : Int
    , bySection : Dict String SectionScore
    , nonCompliant : List Finding
    , unansweredCritical : List String
    , answeredCount : Int
    }


type alias Model =
    { responses : Dict String String
    , collapsed : Set String
    , reportOpen : Bool
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { responses = Dict.empty
      , collapsed = Set.empty
      , reportOpen = False
      }
    , Cmd.none
    )



-- MSG


type Msg
    = SetResponse String String
    | ToggleSection String
    | OpenReport
    | CloseReport
    | ExportJson
    | ExportXlsx
    | RequestImport
    | ImportLoaded String



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetResponse qid val ->
            ( { model | responses = Dict.insert qid val model.responses }
            , Cmd.none
            )

        ToggleSection code ->
            let
                collapsed =
                    if Set.member code model.collapsed then
                        Set.remove code model.collapsed

                    else
                        Set.insert code model.collapsed
            in
            ( { model | collapsed = collapsed }, Cmd.none )

        OpenReport ->
            ( { model | reportOpen = True }, Cmd.none )

        CloseReport ->
            ( { model | reportOpen = False }, Cmd.none )

        ExportJson ->
            ( model, downloadJson (encodeResponses model.responses) )

        ExportXlsx ->
            ( model, generateXlsx (Encode.dict identity Encode.string model.responses) )

        RequestImport ->
            ( model, requestImport () )

        ImportLoaded raw ->
            case Decode.decodeString decodeResponses raw of
                Ok newResponses ->
                    ( { model | responses = newResponses }, Cmd.none )

                Err _ ->
                    ( model, Cmd.none )



-- SCORING


type alias QuestionResult =
    { q : Question
    , answer : String
    , isNA : Bool
    , isAnswered : Bool
    , isCompliant : Bool
    , points : Int
    , potential : Int
    }


computeScores : Dict String String -> Scores
computeScores responses =
    let
        scored =
            List.filter .isScored questions

        toResult : Question -> QuestionResult
        toResult q =
            let
                answer =
                    Dict.get q.id responses |> Maybe.withDefault ""

                isNA =
                    String.toLower answer == "n/a"

                isAnswered =
                    answer /= ""

                isCompliant =
                    case q.compliantResponse of
                        Just cr ->
                            String.toLower answer == String.toLower cr

                        Nothing ->
                            False

                points =
                    if isCompliant && not isNA then
                        q.weight

                    else
                        0

                potential =
                    if isNA then
                        0

                    else
                        q.weight
            in
            { q = q
            , answer = answer
            , isNA = isNA
            , isAnswered = isAnswered
            , isCompliant = isCompliant
            , points = points
            , potential = potential
            }

        results =
            List.map toResult scored

        totalActual =
            List.sum (List.map .points results)

        totalPotential =
            List.sum (List.map .potential results)

        critResults =
            List.filter (.isCritical << .q) results

        critActual =
            List.sum (List.map .points critResults)

        critPotential =
            List.sum (List.map .potential critResults)

        overallPct =
            if totalPotential == 0 then
                0

            else
                round (toFloat totalActual / toFloat totalPotential * 100)

        critPct =
            if critPotential == 0 then
                0

            else
                round (toFloat critActual / toFloat critPotential * 100)

        toFinding : QuestionResult -> Finding
        toFinding r =
            { id = r.q.id
            , label = r.q.label
            , importance = r.q.importance
            , answer = r.answer
            , expected = Maybe.withDefault "" r.q.compliantResponse
            }

        nonCompliant =
            results
                |> List.filter (\r -> r.isAnswered && not r.isCompliant && not r.isNA)
                |> List.map toFinding

        unansweredCritical =
            results
                |> List.filter (\r -> r.q.isCritical && not r.isAnswered)
                |> List.map (.id << .q)

        answeredCount =
            List.length (List.filter (\q -> Dict.member q.id responses) questions)

        buildSectionScore : String -> SectionScore
        buildSectionScore code =
            let
                sectionResults =
                    List.filter (\r -> r.q.section == code) results

                sAct =
                    List.sum (List.map .points sectionResults)

                sPot =
                    List.sum (List.map .potential sectionResults)

                sNonCompliant =
                    sectionResults
                        |> List.filter (\r -> r.isAnswered && not r.isCompliant && not r.isNA)
                        |> List.map toFinding

                sUnanswered =
                    List.length (List.filter (\r -> r.q.isCritical && not r.isAnswered) sectionResults)
            in
            { name = sectionName code
            , actual = sAct
            , potential = sPot
            , nonCompliant = sNonCompliant
            , unanswered = sUnanswered
            }

        bySection =
            List.foldl
                (\( code, _ ) acc ->
                    Dict.insert code (buildSectionScore code) acc
                )
                Dict.empty
                sections
    in
    { totalActual = totalActual
    , totalPotential = totalPotential
    , critActual = critActual
    , critPotential = critPotential
    , overallPct = overallPct
    , critPct = critPct
    , bySection = bySection
    , nonCompliant = nonCompliant
    , unansweredCritical = unansweredCritical
    , answeredCount = answeredCount
    }



-- JSON ENCODE/DECODE


encodeResponses : Dict String String -> String
encodeResponses responses =
    Dict.toList responses
        |> List.map (\( k, v ) -> ( k, Encode.string v ))
        |> Encode.object
        |> Encode.encode 2


decodeResponses : Decode.Decoder (Dict String String)
decodeResponses =
    Decode.dict Decode.string



-- VIEW


scoreClass : Int -> String
scoreClass pct =
    if pct >= 80 then
        "good"

    else if pct >= 50 then
        "warn"

    else
        "bad"


pctStr : Int -> String
pctStr pct =
    String.fromInt pct ++ "%"


importanceBadge : Importance -> Html Msg
importanceBadge imp =
    case imp of
        Critical ->
            span [ class "badge badge-critical" ] [ text "Critical" ]

        Standard ->
            span [ class "badge badge-standard" ] [ text "Standard" ]

        Minor ->
            span [ class "badge badge-minor" ] [ text "Minor" ]

        Unscored ->
            text ""


viewQuestion : Dict String String -> Question -> Html Msg
viewQuestion responses q =
    let
        answer =
            Dict.get q.id responses |> Maybe.withDefault ""

        isCompliant =
            case q.compliantResponse of
                Just cr ->
                    String.toLower answer == String.toLower cr && answer /= ""

                Nothing ->
                    False

        isNonCompliant =
            answer /= "" && not isCompliant && String.toLower answer /= "n/a"

        cardClass =
            if isCompliant then
                "question-card compliant"

            else if isNonCompliant then
                "question-card non-compliant"

            else
                "question-card"

        complianceDot =
            if isCompliant then
                span [ class "compliance-dot yes" ] []

            else if isNonCompliant then
                span [ class "compliance-dot no" ] []

            else
                text ""

        guidanceEl =
            case q.guidance of
                Just g ->
                    p [ class "guidance" ] [ text g ]

                Nothing ->
                    text ""

        inputEl =
            case q.inputType of
                RadioYesNo ->
                    div [ class "radio-group" ]
                        (List.map
                            (\opt ->
                                label [ class "radio-label" ]
                                    [ input
                                        [ type_ "radio"
                                        , name q.id
                                        , value opt
                                        , checked (answer == opt)
                                        , onInput (SetResponse q.id)
                                        ]
                                        []
                                    , text opt
                                    ]
                            )
                            [ "Yes", "No", "N/A" ]
                        )

                TextInput ->
                    input
                        [ type_ "text"
                        , value answer
                        , onInput (SetResponse q.id)
                        ]
                        []

                EmailInput ->
                    input
                        [ type_ "email"
                        , value answer
                        , onInput (SetResponse q.id)
                        ]
                        []

                TelInput ->
                    input
                        [ type_ "tel"
                        , value answer
                        , onInput (SetResponse q.id)
                        ]
                        []

                TextArea ->
                    textarea
                        [ rows 3
                        , value answer
                        , onInput (SetResponse q.id)
                        ]
                        []

        additionalEl =
            if q.hasAdditional then
                let
                    addId =
                        q.id ++ "_add"

                    addAnswer =
                        Dict.get addId responses |> Maybe.withDefault ""
                in
                div [ class "additional-info" ]
                    [ label [] [ text "Additional Information" ]
                    , textarea
                        [ rows 2
                        , value addAnswer
                        , onInput (SetResponse addId)
                        ]
                        []
                    ]

            else
                text ""

        critStar =
            if q.isCritical then
                span [ class "crit-star" ] [ text " ★" ]

            else
                text ""
    in
    div [ class cardClass, id ("q-" ++ q.id) ]
        [ div [ class "question-header" ]
            [ span [ class "question-id" ] [ text q.id ]
            , importanceBadge q.importance
            , critStar
            , complianceDot
            ]
        , label [ class "question-label" ] [ text q.label ]
        , guidanceEl
        , inputEl
        , additionalEl
        ]


viewSection : Model -> Scores -> ( String, String ) -> Html Msg
viewSection model scores ( code, name ) =
    let
        sectionQs =
            List.filter (\q -> q.section == code) questions

        isCollapsed =
            Set.member code model.collapsed

        headerClass =
            if isCollapsed then
                "section-header collapsed"

            else
                "section-header"

        ss =
            Dict.get code scores.bySection

        scoreBadge =
            case ss of
                Just s ->
                    if s.potential == 0 then
                        span [ class "section-score-badge na" ] [ text "N/A" ]

                    else
                        let
                            pct =
                                round (toFloat s.actual / toFloat s.potential * 100)

                            cls =
                                "section-score-badge " ++ scoreClass pct
                        in
                        span [ class cls ] [ text (pctStr pct) ]

                Nothing ->
                    text ""

        bodyClass =
            if isCollapsed then
                "section-body hidden"

            else
                "section-body"
    in
    div [ class "form-section", id ("section-" ++ code) ]
        [ div [ class headerClass, onClick (ToggleSection code) ]
            [ div [ class "section-title-row" ]
                [ span [ class "section-code" ] [ text code ]
                , span [ class "section-title" ] [ text name ]
                , span [ class "section-count" ]
                    [ text (" · " ++ String.fromInt (List.length sectionQs) ++ " questions") ]
                , scoreBadge
                ]
            , span [ class "section-chevron" ] [ text "▾" ]
            ]
        , div [ class bodyClass ]
            (List.map (viewQuestion model.responses) sectionQs)
        ]


viewSidebarItem : Model -> Scores -> ( String, String ) -> Html Msg
viewSidebarItem model scores ( code, name ) =
    let
        ss =
            Dict.get code scores.bySection

        scoreEl =
            case ss of
                Just s ->
                    if s.potential == 0 then
                        text ""

                    else
                        let
                            pct =
                                round (toFloat s.actual / toFloat s.potential * 100)

                            cls =
                                "nav-score " ++ scoreClass pct
                        in
                        span [ class cls ] [ text (pctStr pct) ]

                Nothing ->
                    text ""
    in
    button
        [ class "nav-item"
        , onClick (ToggleSection code)
        , attribute "data-section" code
        ]
        [ span [ class "nav-code" ] [ text code ]
        , span [ class "nav-label" ] [ text name ]
        , scoreEl
        ]


viewFinding : Finding -> Html Msg
viewFinding f =
    let
        tagCls =
            case f.importance of
                Critical ->
                    "finding-tag critical"

                _ ->
                    "finding-tag"

        tagText =
            case f.importance of
                Critical ->
                    "Critical"

                Standard ->
                    "Standard"

                Minor ->
                    "Minor"

                Unscored ->
                    ""
    in
    div [ class "finding fail" ]
        [ div [ class "finding-id" ] [ text f.id ]
        , div [ class "finding-text" ]
            [ text f.label
            , span [ class tagCls ] [ text tagText ]
            ]
        ]


viewReport : Model -> Scores -> Html Msg
viewReport model scores =
    let
        vendorName =
            Dict.get "GNRL-01" model.responses |> Maybe.withDefault "Untitled Assessment"

        sectionScoreCards =
            sections
                |> List.filterMap
                    (\( code, name ) ->
                        Dict.get code scores.bySection
                            |> Maybe.andThen
                                (\ss ->
                                    if ss.potential == 0 then
                                        Nothing

                                    else
                                        let
                                            pct =
                                                round (toFloat ss.actual / toFloat ss.potential * 100)

                                            fillCls =
                                                "score-card-fill " ++ scoreClass pct
                                        in
                                        Just
                                            (div [ class "score-card" ]
                                                [ div [ class "score-card-name" ] [ text name ]
                                                , div [ class "score-card-bar" ]
                                                    [ div
                                                        [ class fillCls
                                                        , style "width" (pctStr pct)
                                                        ]
                                                        []
                                                    ]
                                                , div [ class "score-card-pct" ] [ text (pctStr pct) ]
                                                ]
                                            )
                                )
                    )

        critFindings =
            List.filter (\f -> f.importance == Critical) scores.nonCompliant

        otherFindings =
            List.filter (\f -> f.importance /= Critical) scores.nonCompliant
                |> List.take 40

        unansweredEls =
            scores.unansweredCritical
                |> List.map
                    (\qid ->
                        div [ class "finding warn" ]
                            [ div [ class "finding-id" ] [ text qid ]
                            , div [ class "finding-text" ]
                                [ text (questionLabel qid) ]
                            ]
                    )

        findingsEl =
            if List.isEmpty critFindings then
                div [ class "empty-findings" ] [ text "No critical findings" ]

            else
                div [ class "findings-list" ] (List.map viewFinding critFindings)

        otherEl =
            if List.isEmpty otherFindings then
                div [ class "empty-findings" ] [ text "No other non-compliant answers" ]

            else
                div [ class "findings-list" ] (List.map viewFinding otherFindings)

        unansweredEl =
            if List.isEmpty unansweredEls then
                div [ class "empty-findings" ] [ text "All critical questions answered" ]

            else
                div [ class "findings-list" ] unansweredEls

        overallPct =
            scores.overallPct

        critPct =
            scores.critPct

        scoreFill =
            pctStr overallPct
    in
    div [ class "modal-backdrop visible", onClick CloseReport ]
        [ div
            [ class "report-modal"
            , stopPropagationOn "click" (Decode.succeed ( CloseReport, False ))
            ]
            [ div [ class "report-header" ]
                [ div [ class "report-header-top" ]
                    [ div []
                        [ h2 [] [ text "Security Assessment Report" ]
                        , div [ class "report-sub" ] [ text vendorName ]
                        ]
                    , div [ class "report-header-btns" ]
                        [ button [ class "btn-ghost-inv", onClick CloseReport ] [ text "Close" ]
                        , button [ class "btn-ghost-inv", onClick ExportJson ] [ text "⬇ JSON" ]
                        , button [ class "btn-ghost-inv", onClick ExportXlsx ] [ text "⬇ xlsx" ]
                        ]
                    ]
                , div [ class "report-meta" ]
                    [ div [ class "report-meta-item" ]
                        [ span [ class "val" ] [ text (pctStr overallPct) ]
                        , span [ class "lbl" ] [ text "Overall" ]
                        ]
                    , div [ class "report-meta-item" ]
                        [ span [ class "val" ] [ text (pctStr critPct) ]
                        , span [ class "lbl" ] [ text "Critical" ]
                        ]
                    , div [ class "report-meta-item" ]
                        [ span [ class "val" ] [ text (String.fromInt scores.totalActual) ]
                        , span [ class "lbl" ] [ text "Points Earned" ]
                        ]
                    , div [ class "report-meta-item" ]
                        [ span [ class "val" ] [ text (String.fromInt scores.totalPotential) ]
                        , span [ class "lbl" ] [ text "Points Possible" ]
                        ]
                    , div [ class "report-meta-item" ]
                        [ span [ class "val" ] [ text (String.fromInt (List.length scores.nonCompliant)) ]
                        , span [ class "lbl" ] [ text "Non-Compliant" ]
                        ]
                    , div [ class "report-meta-item" ]
                        [ span [ class "val" ] [ text (String.fromInt (List.length scores.unansweredCritical)) ]
                        , span [ class "lbl" ] [ text "Unanswered Critical" ]
                        ]
                    ]
                ]
            , div [ class "report-body" ]
                [ div [ class "report-section-title" ] [ text "Section Scores" ]
                , div [ class "score-grid" ] sectionScoreCards
                , div [ class "report-section-title" ] [ text "Critical Findings" ]
                , findingsEl
                , div [ class "report-section-title" ] [ text "Unanswered Critical Questions" ]
                , unansweredEl
                , div [ class "report-section-title" ] [ text "Other Non-Compliant" ]
                , otherEl
                ]
            , div [ class "report-footer" ]
                [ button [ class "btn btn-ghost", onClick CloseReport ] [ text "Close" ]
                , button [ class "btn btn-ghost", onClick ExportJson ] [ text "⬇ Export JSON" ]
                , button [ class "btn btn-accent", onClick ExportXlsx ] [ text "⬇ Export xlsx" ]
                ]
            ]
        ]


questionLabel : String -> String
questionLabel qid =
    questions
        |> List.filter (\q -> q.id == qid)
        |> List.head
        |> Maybe.map .label
        |> Maybe.withDefault qid


view : Model -> Html Msg
view model =
    let
        scores =
            computeScores model.responses

        vendorName =
            Dict.get "GNRL-01" model.responses |> Maybe.withDefault "Untitled Assessment"

        totalQs =
            List.length questions

        answeredCount =
            scores.answeredCount

        progressPct =
            if totalQs == 0 then
                0

            else
                round (toFloat answeredCount / toFloat totalQs * 100)

        overallPct =
            scores.overallPct

        critPct =
            scores.critPct

        showReport =
            scores.answeredCount > 0

        scoreFillStyle =
            style "width" (pctStr overallPct)

        progressFillStyle =
            style "width" (pctStr progressPct)

        scoreBarClass =
            "score-bar-fill " ++ scoreClass overallPct
    in
    div []
        [ header [ class "page-header" ]
            [ div [ class "header-top" ]
                [ div [ class "header-left" ]
                    [ div [ class "header-meta" ] [ text "EDUCAUSE · HECVAT 4.14 · Solution Provider Assessment" ]
                    , div [ class "header-title" ] [ text vendorName ]
                    ]
                , div [ class "score-summary" ]
                    [ div [ class "score-pill overall" ]
                        [ span [ class "score-value" ]
                            [ text
                                (if scores.totalPotential == 0 then
                                    "--%"

                                 else
                                    pctStr overallPct
                                )
                            ]
                        , span [ class "score-label" ] [ text "Overall" ]
                        ]
                    , div [ class "score-pill" ]
                        [ span [ class "score-value" ]
                            [ text
                                (if scores.critPotential == 0 then
                                    "--%"

                                 else
                                    pctStr critPct
                                )
                            ]
                        , span [ class "score-label" ] [ text "Critical" ]
                        ]
                    , div [ class "score-pill" ]
                        [ span [ class "score-value" ] [ text (String.fromInt answeredCount) ]
                        , span [ class "score-label" ] [ text "Answered" ]
                        ]
                    , if showReport then
                        button [ class "btn-report-header", onClick OpenReport ] [ text "⎷ View Report" ]

                      else
                        text ""
                    ]
                ]
            , div [ class "score-bar-wrap" ]
                [ div [ class scoreBarClass, scoreFillStyle ] [] ]
            , div [ class "progress-wrap" ]
                [ div [ class "progress-fill", progressFillStyle ] [] ]
            , div [ class "header-stats" ]
                [ span []
                    [ text
                        (String.fromInt answeredCount
                            ++ " of "
                            ++ String.fromInt totalQs
                            ++ " answered"
                        )
                    ]
                , span []
                    [ text
                        ("Score: "
                            ++ String.fromInt scores.totalActual
                            ++ " / "
                            ++ String.fromInt scores.totalPotential
                        )
                    ]
                , span []
                    [ text
                        ("Critical: "
                            ++ String.fromInt scores.critActual
                            ++ " / "
                            ++ String.fromInt scores.critPotential
                        )
                    ]
                , span []
                    [ text
                        (String.fromInt (List.length scores.nonCompliant)
                            ++ " non-compliant"
                        )
                    ]
                ]
            ]
        , div [ class "layout" ]
            [ nav [ class "sidebar" ]
                ([ div [ class "sidebar-title" ] [ text "Sections" ] ]
                    ++ List.map (viewSidebarItem model scores) sections
                )
            , div [ class "form-area" ]
                ([ div [ class "action-bar" ]
                    [ div [ class "action-group" ]
                        [ button [ class "btn btn-ghost", onClick RequestImport ] [ text "⬆ Import JSON" ]
                        , button [ class "btn btn-ghost", onClick ExportJson ] [ text "⬇ Export JSON" ]
                        , button [ class "btn btn-ghost", onClick ExportXlsx ] [ text "⬇ Export xlsx" ]
                        ]
                    , div [ class "action-group" ]
                        [ if showReport then
                            button [ class "btn btn-accent", onClick OpenReport ] [ text "⎷ View Report" ]

                          else
                            text ""
                        ]
                    ]
                 ]
                    ++ List.map (viewSection model scores) sections
                )
            ]
        , if model.reportOpen then
            viewReport model scores

          else
            text ""
        ]



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> importLoaded ImportLoaded
        }
