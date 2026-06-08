document.addEventListener('DOMContentLoaded', () => {
    // ---- Modal & Zoom-In Logic ----
    const modal = document.getElementById('holon-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cells = document.querySelectorAll('.holon-cell');

    // Modal elements to update
    const modalTitle = document.getElementById('modal-title');
    const modalCell = document.getElementById('modal-cell');
    const modalLayer = document.getElementById('modal-layer');
    const modalCol = document.getElementById('modal-col');
    const modalDesc = document.getElementById('modal-desc');
    const modalCode = document.getElementById('modal-code');
    const modalImageContainer = document.getElementById('modal-image-container');

    // Mapping of mock data for deep dive
    const mockData = {
        'A1': {
            desc: "Fusión de 'Why' (Motivation) con 'Trust & UI' (Contextual). Representa la fe pública y la confianza del auditor a nivel atómico de datos. Realiza la visión de Data Level Assurance (DLA) de Eric Cohen, donde la confianza en la información se calcula como DT = f(DLA, PK, OF), permitiendo que el aseguramiento y la auditoría sean portables, independientes del sistema y continuos en tiempo real.",
            code: `// Data Level Assurance (DLA) Trust Assessment (A1)
{
  "assertion": "DataLevelAssurance",
  "trustFormula": "DT = f(DLA, PK, OF)",
  "metrics": {
    "dataQuality_DQ": "SHACL Validated (100%)",
    "provenanceQuality_MQ": "PROV-O Lineage Verified",
    "taxonomyQuality_TQ": "XBRL GL Ontological Compliance",
    "organizationQuality_OQ": "Algorand Anchored"
  },
  "assurorLevel": "Level 3 (Independent)",
  "nunavutMeter": 0.95,
  "status": "Verified / Trusted"
}`
        },
        'B1': {
            desc: "Fusión de 'How' (Process) con 'Trust & UI' (Contextual). Workflow del reporte contable final. Define los flujos de presentación visual y tableros interactivos para los tomadores de decisiones de negocio, asegurando que los reportes de alto nivel reflejen con veracidad los datos certificados de los eventos de negocio.",
            code: `// Report & Dashboard Presentation Workflow (B1)
{
  "reportID": "REP-GENESIS-001",
  "name": "Balance de Apertura e Incorporacion",
  "generatedBy": "System Admin",
  "date": "2005-06-01T09:00:00Z",
  "visualizationType": "Interactive Balance Sheet",
  "securityLevel": "Role-Based (C-Level / Audit)"
}`
        },
        'C1': {
            desc: "Fusión de 'What' (Data) con 'Trust & UI' (Contextual). Representa el anclaje criptográfico de inmutabilidad del Génesis (el 'Momento Cero' de la firma) y los contratos de negocio en la blockchain. Asegura la inalterabilidad histórica de la estructura del capital y los propietarios de acciones frente a cualquier auditoría o ente regulador.",
            code: `// Blockchain Genesis State Notarization (C1)
{
  "blockchain": "Algorand",
  "state": "Momento Cero (Genesis)",
  "contractType": "Escritura de Constitucion / Capital Inicial",
  "ipfsCID": "QmZtm7Y7gC6S284jJdnS375mU89aXzYJ1",
  "transactionHash": "ALGO-TX-2357911-FUSION-GENESIS",
  "timestamp": "2005-06-01T09:00:00Z",
  "anchoredData": {
    "entityName": "SOCIEDAD_GENESIS_LTDA",
    "capitalCOP": 10000000.00,
    "shares": 10000,
    "partnersCount": 4
  }
}`
        },
        'D1': {
            desc: "Fusión de 'Who' (People) con 'Trust & UI' (Contextual). Credenciales del personal certificado para operar la plataforma y avalar las transacciones (ej. firmas digitales del Notario, Representante Legal y Revisor Fiscal).",
            code: `// Certified Personnel Credentials (D1)
{
  "entity": "Notaria Veinticinco de Medellin",
  "notary": "Jorge Ivan Carvajal Sepulveda",
  "certificateID": "CERT-NOT-25-2005",
  "authority": "Superintendencia de Notariado y Registro",
  "status": "Active"
}`
        },
        'E1': {
            desc: "Fusión de 'Where' (Network) con 'Trust & UI' (Contextual). Perímetro de seguridad de la red organizacional y topología global. Asegura que los nodos de validación contable y bases de datos residan en entornos de comunicación de confianza certificados.",
            code: `// Enterprise Network Perimeter Trust (E1)
{
  "networkID": "NET-SECURE-001",
  "environment": "Production / Private Cloud",
  "accessControl": "Zero-Trust Network Access (ZTNA)",
  "encryption": "TLS 1.3 / AES-256",
  "nodes": ["medellin-genesis-01", "medellin-genesis-02"]
}`
        },
        'F1': {
            desc: "Fusión de 'When' (Time) con 'Trust & UI' (Contextual). Periodos fiscales inmutables definidos para la contabilidad en tiempo real. Establece los límites cronológicos auditables y las marcas de tiempo de los cierres periódicos autorizados.",
            code: `// Immutable Fiscal Period Configuration (F1)
{
  "fiscalYear": 2005,
  "periodStart": "2005-06-01T00:00:00Z",
  "periodEnd": "2005-12-31T23:59:59Z",
  "isClosed": false,
  "lastAuditDate": null
}`
        },
        'A2': {
            desc: "Fusión de 'Why' (Motivation) con 'Ontology (OWL)' (Conceptual). Expresa las reglas de negocio, directrices organizacionales y políticas corporativas de control interno como axiomas lógicos en ontologías formales. Esto formaliza explícitamente el conocimiento de control en el grafo (REA/Gist), previniendo desbalances estructurales en tiempo de diseño.",
            code: `<!-- Ontological Business Rule in OWL (A2) -->
<owl:Class rdf:about="&ex;ValidTransaction">
    <owl:equivalentClass>
        <owl:Restriction>
            <owl:onProperty rdf:resource="&ex;hasDuality"/>
            <owl:someValuesFrom rdf:resource="&ex;EconomicExchange"/>
        </owl:Restriction>
    </owl:equivalentClass>
</owl:Class>`
        },
        'B2': {
            desc: "Fusión de 'How' (Process) con 'Ontology (OWL)' (Conceptual). Mapeo conceptual de partida doble (Pacioli) adaptado al estándar. Distribuye aritméticamente los Débitos y Créditos para asegurar la integridad transaccional. Para entender cómo se estructura y automatiza la traducción de diarios contables bajo XBRL GL utilizando motores de mapeo (como Altova MapForce), ver los casos de estudio: (1) Caso de Estudio Altova Blog (https://www.altova.com/blog/2012/05/new-case-study-automating-xbrl-data-collection-and-processing) y (2) Caso de Estudio MACPA (https://www.altova.com/documents/macpa_casestudy.pdf).",
            code: `<!-- Regla Conceptual de Partida Doble en MapForce (B2) -->
<component name="if-else" library="core" uid="25" kind="4">
    <sources>
        <datapoint pos="0" key="debitCreditCode == 'D'"/>
        <datapoint pos="1" key="amountDecimal"/>
        <datapoint pos="2" key="decimalZero"/>
    </sources>
    <targets>
        <datapoint pos="0" key="MO_DEBITO"/>
    </targets>
</component>`
        },
        'C2': {
            desc: "Fusión de 'What' (Data) con 'Ontology (OWL)' (Conceptual). Capas conceptuales de la ontología contable multiestándar maestro. Hemos estructurado y enriquecido la ontología base uniendo: (1) ISO/IEC 21838-2 (BFO) como clases abstractas raíz (BFO_Entity, BFO_Continuant, BFO_Process); (2) FIBO (FIBO_StockCorporation, FIBO_IncorporationAgreement, FIBO_Shareholder) para modelar la constitución y propiedad accionaria; (3) ACTUS para estructurar contratos algorítmicos; y (4) Gist/REA como pegamento semántico contable (gist:Account, gist:Transaction).",
            code: `// Estructura de la Ontología Multiestándar en JSON-LD (C2)
{
  "@context": {
    "bfo": "http://purl.obolibrary.org/obo/",
    "fibo": "https://spec.edmcouncil.org/fibo/ontology/",
    "actus": "http://www.actusfrf.org/ontology#",
    "gist": "https://ontologies.semanticarts.com/gist/"
  },
  "@graph": [
    {
      "@id": "bfo:BFO_Entity",
      "@type": "owl:Class",
      "rdfs:label": "BFO Entity (ISO/IEC 21838-2)"
    },
    {
      "@id": "fibo:FIBO_StockCorporation",
      "@type": "owl:Class",
      "rdfs:subClassOf": ["gist:Organization", "fibo:FIBO_LegalEntity"],
      "rdfs:label": "Stock Corporation"
    },
    {
      "@id": "actus:ACTUS_StockContract",
      "@type": "owl:Class",
      "rdfs:subClassOf": "actus:ACTUS_Contract",
      "rdfs:label": "ACTUS Stock Contract (STK)"
    }
  ]
}`
        },
        'D2': {
            desc: "Fusión de 'Who' (People) con 'Ontology (OWL)' (Conceptual). Ontologías de roles y competencias (como 1edtech o FIBO). Mapea los roles del personal contable, auditores y firmas de control en un vocabulario estándar que describe los derechos de acceso y firma.",
            code: `<!-- OWL Ontological Competency Profile (D2) -->
<owl:Class rdf:about="&edtech;CertifiedAuditor">
    <rdfs:subClassOf rdf:resource="&edtech;ProfessionalRole"/>
    <rdfs:label>Certified Public Accountant (CPA)</rdfs:label>
</owl:Class>`
        },
        'E2': {
            desc: "Fusión de 'Where' (Network) con 'Ontology (OWL)' (Conceptual). Modelado de la red de nodos e infraestructura como recursos ontológicos. Define los servidores y servicios (Nginx, IPFS, TerminusDB) en el grafo de conocimiento para control y gobernanza.",
            code: `<!-- Ontological Infrastructure Node Definition (E2) -->
<owl:NamedIndividual rdf:about="&infra;DigitalOceanNode01">
    <rdf:type rdf:resource="&infra;ServerInstance"/>
    <infra;ipAddress rdf:datatype="&xsd;string">165.245.137.44</infra;ipAddress>
    <infra;runsService rdf:resource="&infra;IPFS_Swarm"/>
</owl:NamedIndividual>`
        },
        'F2': {
            desc: "Fusión de 'When' (Time) con 'Ontology (OWL)' (Conceptual). Modelado de la secuencia temporal de los eventos económicos de forma independiente de la estructura física de tablas. La aproximación de 'Timeless REA' permite registrar transacciones e historiales de estado como aserciones en el grafo sin requerir alteraciones al esquema o recompilaciones del software.",
            code: `<!-- Ontological Event Sequencing (F2) -->
<owl:ObjectProperty rdf:about="&gist;precedes">
    <rdfs:domain rdf:resource="&gist;Event"/>
    <rdfs:range rdf:resource="&gist;Event"/>
    <rdfs:comment>Define el orden cronologico inmutable de los hechos economicos</rdfs:comment>
</owl:ObjectProperty>`
        },
        'A3': {
            desc: "Fusión de 'Why' (Motivation) con 'RDF (Graph)' (Logical). Implementa la Gobernanza y Validación de datos en tiempo de ejecución. Las restricciones SHACL (Shapes Constraint Language) actúan como el equivalente de las 'Formula Linkbases' de XBRL en la base de datos de grafos de TerminusDB, forzando de manera inquebrantable la partida doble y la completitud dimensional en el milisegundo de la ingesta.",
            code: `// SHACL Shapes Validation Schema (A3)
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix ex: <http://example.org/accounting#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

ex:DoubleEntryShape a sh:NodeShape ;
  sh:targetClass ex:Transaction ;
  sh:property [
    sh:path ex:debitCreditBalance ;
    sh:datatype xsd:decimal ;
    sh:hasValue 0.00 ;
    sh:message "Error: Incumplimiento de Partida Doble. La suma neta de cargos debe ser cero." ;
  ] .`
        },
        'B3': {
            desc: "Fusión de 'How' (Process) con 'RDF (Graph)' (Logical). Mapeador semántico y canalización ETL (diseñado en Altova MapForce) que traduce de manera de forma determinista las estructuras físicas contables XML/CSV en grafos lógicos JSON-LD. En la última sesión, perfeccionamos el mapeo de los diarios en XBRL GL hacia JSON-LD, resolviendo los errores de cardinalidad de secuencias (ej. usando componentes 'first-items' para extraer un valor único de fecha 'postingDate' desde las líneas de detalle para la cabecera 'EntryHeader') y reestructurando las propiedades para mapear a los nodos hijos 'string' requeridos por la jerarquía semántica.",
            image: "Mapeo.jpg",
            code: `// Configuración Lógica del Mapeo ETL en MapForce (B3)
{
  "mappingSource": "gl-plt-all-2015-03-25 (XBRL GL)",
  "mappingTarget": "sunder_zachman_dfrnt_instances.schema.json",
  "etlEngine": "Altova MapForce Code Ingestion",
  "resolutions": {
    "cardinalityMismatches": "first-items components added for documentNumber, documentType, documentDate, postingDate",
    "structureHierarchy": "connections mapped to inner 'string' sub-keys of target properties"
  },
  "status": "Execution Successful - 0 errors"
}`
        },
        'C3': {
            desc: "Fusión de 'What' (Data) con 'RDF (Graph)' (Logical). Almacena y consolida los modelos lógicos de transacciones en la base de datos semántica Graph DDBB en formato de documentos JSON-LD vinculados. En la última sesión, actualizamos las instancias contables resultantes de la transformación de constitución para representar correctamente la clase 'FIBO_StockCorporation' enriquecida con sus identificadores institucionales obligatorios (NIT, código e identificador).",
            code: `// Representación Lógica del Grafo (C3) - Sociedad Mercantil (FIBO)
{
  "@context": "terminusdb:///schema#",
  "@id": "FIBO_StockCorporation/SOCIEDAD_GENESIS_LTDA",
  "@type": "FIBO_StockCorporation",
  "artifact_name": "SOCIEDAD_GENESIS_LTDA",
  "identifierCode": "SOCIEDAD_GENESIS_LTDA",
  "identifierDescription": "Sociedad Génesis Ltda.",
  "identifierType": "NIT",
  "nexus": [
    "SourceDocument/Escritura_Publica_25_2005"
  ]
}`
        },
        'D3': {
            desc: "Fusión de 'Who' (People) con 'RDF (Graph)' (Logical). Define la identidad de los agentes del negocio en el grafo lógico. De acuerdo con la ontología semántica, las identidades unifican a organizaciones y personas en relaciones reutilizables (evitando la duplicidad de tags planos).",
            code: `// RDF System Identity Profile (D3)
{
  "@context": "terminusdb:///schema#",
  "@id": "Agent/Socio_A",
  "@type": "Agent",
  "identifierCode": "Socio_A",
  "identifierDescription": "Socio Fundador A",
  "identifierType": "O"
}`
        },
        'E3': {
            desc: "Fusión de 'Where' (Network) con 'RDF (Graph)' (Logical). Puntos de acceso de API que sirven e interactúan con el grafo lógico (HTTP JSON-LD endpoints). Permiten consultas remotas seguras en SPARQL o WOQL para extraer los datos de la red.",
            code: `// API Endpoint Routing for RDF Graph (E3)
GET /api/v1/ledger/query?format=jsonld
{
  "query": "SELECT ?detail ?account ?amount WHERE { ?detail a ex:EntryDetail ; ex:account ?account ; ex:amount ?amount }",
  "auth": "Bearer token_ed25519_sig..."
}`
        },
        'F3': {
            desc: "Fusión de 'When' (Time) con 'RDF (Graph)' (Logical). Enlaces de series de tiempo lógicas entre eventos en el grafo RDF. Permite reconstruir linajes temporales usando triples RDF conectados secuencialmente.",
            code: `// Time-Series Graph Linkage (F3)
{
  "@id": "EntryDetail/Line_2",
  "ex:sequenceIndex": 2,
  "ex:nextEvent": "EntryDetail/Line_3",
  "ex:timestamp": {
    "@value": "2005-06-01T09:00:02Z",
    "@type": "xsd:dateTime"
  }
}`
        },
        'A4': {
            desc: "Fusión de 'Why' (Motivation) con 'XML & Namespaces' (Physical). Especificaciones de validación física para archivos XML contables. Define el esquema XSD que debe cumplir el archivo XBRL GL antes de ser procesado por la ingesta.",
            code: `<!-- XML XSD Validation Schema Reference (A4) -->
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           xmlns:gl-cor="http://www.xbrl.org/int/gl/cor/2006-10-25"
           targetNamespace="http://www.xbrl.org/int/gl/cor/2006-10-25"
           elementFormDefault="qualified">
    <xs:element name="debitCreditCode" type="gl-cor:DebitCreditCodeType"/>
</xs:schema>`
        },
        'B4': {
            desc: "Fusión de 'How' (Process) con 'XML & Namespaces' (Physical). El programa de ingesta y extracción que abre la base de datos transaccional NoSQL DDBB, escanea los documentos XML físicos y ejecuta consultas analíticas en XQuery para estructurar la información intermedia.",
            code: `(: Programa de Ingesta & Consulta Transaccional XQuery (B4) :)
for $doc in db:get("TRANSACTIONS")//(inv:Invoice | cac:Attachment/cac:ExternalReference)
let $IssueDate := $doc/cbc:IssueDate
let $NumeroFactura := $doc/cbc:ID
let $ASP_NIT := $doc/cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID
return
  <record>
    <entry name="Fecha">{data($IssueDate)}</entry>
    <entry name="Numero">{data($NumeroFactura)}</entry>
    <entry name="NIT">{data($ASP_NIT)}</entry>
  </record>`
        },
        'C4': {
            desc: "Fusión de 'What' (Data) con 'XML & Namespaces' (Physical). Representa el documento de origen físico en bruto, el cual puede ser un archivo XML de factura electrónica (UBL 2.1), un documento PDF digitalizado (como la Escritura de Constitución) o un archivo delimitado, constituyendo los soportes inalterables del ledger. Abajo se expone la línea de aporte de capital del Socio A del archivo físico de constitución XBRL GL (constitucion_xbrlgl.xbrl) con el bloque '<gl-bus:measurable>' para las acciones ordinarias.",
            code: `<!-- Aporte de Socio A en constitucion_xbrlgl.xbrl (C4) -->
<gl-cor:entryDetail>
    <gl-cor:lineNumberCounter unitRef="COP">2</gl-cor:lineNumberCounter>
    <gl-cor:account>
        <gl-cor:accountMainID>311505</gl-cor:accountMainID>
        <gl-cor:accountMainDescription>Capital Social - Cuotas</gl-cor:accountMainDescription>
    </gl-cor:account>
    <gl-cor:amount unitRef="COP">2500000.00</gl-cor:amount>
    <gl-cor:debitCreditCode>C</gl-cor:debitCreditCode>
    <gl-cor:postingDate>2005-06-01</gl-cor:postingDate>
    <gl-cor:identifierReference>
        <gl-cor:identifierCode>Socio_A</gl-cor:identifierCode>
        <gl-cor:identifierDescription>Socio Fundador A</gl-cor:identifierDescription>
        <gl-cor:identifierType>O</gl-cor:identifierType>
    </gl-cor:identifierReference>
    <gl-bus:measurable>
        <gl-bus:measurableCode>SP</gl-bus:measurableCode>
        <gl-bus:measurableID>Acciones Ordinarias</gl-bus:measurableID>
        <gl-bus:measurableDescription>Cuotas de interes social ordinarias</gl-bus:measurableDescription>
        <gl-bus:measurableQuantity unitRef="Shares">2500</gl-bus:measurableQuantity>
        <gl-bus:measurableUnitOfMeasure>Cuotas</gl-bus:measurableUnitOfMeasure>
        <gl-bus:measurableCostPerUnit unitRef="COP">1000.00</gl-bus:measurableCostPerUnit>
    </gl-bus:measurable>
</gl-cor:entryDetail>`
        },
        'D4': {
            desc: "Fusión de 'Who' (People) con 'XML & Namespaces' (Physical). Directorios y accesos de usuario a nivel de archivos físicos del repositorio local (Git) y claves de firma PGP que autentican las confirmaciones en el disco.",
            code: `# Git Config and GPG Physical Signing Configuration (D4)
[user]
	name = System Administrator
	email = admin@genesis.org
	signingkey = B4A3F6D2C1E9E4A1
[commit]
	gpgsign = true`
        },
        'E4': {
            desc: "Fusión de 'Where' (Network/Location) con 'XML & Namespaces' (Physical). Representa la infraestructura física de red y almacenamiento distribuido para resguardar archivos sensibles de auditoría sobre un nodo IPFS privado en DigitalOcean (Directorio '/var/lib/ipfs', con puertos del API en 5001 y Gateway en 8081). Se accede de forma segura mediante túneles SSH remotos desde Windows, sin exposición pública.",
            code: `// Configuración de red e infraestructura para IPFS Swarm (E4)
{
  "storage": {
    "repository_path": "/var/lib/ipfs",
    "type": "IPFS Private Swarm (Aislado)",
    "swarm_key": "/key/swarm/psk/1.0.0/ (Base16 Hex Secret)"
  },
  "networking": {
    "host_ip": "165.245.137.44",
    "api_bind_address": "127.0.0.1:5001",
    "gateway_bind_address": "127.0.0.1:8081",
    "ssh_tunneling_mapping": "ssh -N -L 5001:127.0.0.1:5001 -L 8080:127.0.0.1:8081 root@165.245.137.44"
  }
}`
        },
        'F4': {
            desc: "Fusión de 'When' (Time) con 'XML & Namespaces' (Physical). Atributos de marcas de tiempo en archivos XML/XBRL. Estos definen las fechas transaccionales exactas en el estándar ISO 8601.",
            code: `<!-- XML Schema DateTime representation (F4) -->
<creationDate contextRef="Now">2005-06-01</creationDate>
<postingDate contextRef="Now">2005-06-01</postingDate>`
        },
        'A5': {
            desc: "Fusión de 'Why' (Motivation) con 'URI / IRI' (Detailed). Banderas y códigos de contexto específicos direccionados mediante URIs en el motor contable para aplicar reglas de control fiscal locales.",
            code: `// Contextual rule redirection URIs (A5)
{
  "ruleContextURI": "http://example.org/rules/2005/colombia/munc/medellin",
  "ruleTarget": "accountMainID:311505",
  "validationStatus": "Mandatory"
}`
        },
        'B5': {
            desc: "Fusión de 'How' (Process) con 'URI / IRI' (Detailed). Microfunciones y scripts de transformación a nivel de línea contable individuales direccionables por URIs.",
            code: `// URI-addressable transform function (B5)
const convertToCOP = (amount, currency) => {
  if (currency === 'COP') return amount;
  return amount * getRateForDate(postingDate);
};`
        },
        'C5': {
            desc: "Fusión de 'What' (Data) con 'URI / IRI' (Detailed). Direcciones URI únicas de cada cuenta y concepto de la taxonomía contable en el grafo semántico global.",
            code: `// XBRL Concept URI Reference (C5)
{
  "conceptURI": "http://www.xbrl.org/int/gl/cor/2006-10-25#accountMainID",
  "type": "rdf:Property",
  "linkedLocalID": "accountMainID"
}`
        },
        'D5': {
            desc: "Fusión de 'Who' (People) con 'URI / IRI' (Detailed). Identificadores únicos descentralizados (DIDs) de las personas y entidades firmantes en el grafo.",
            code: `// Decentralized Identity (DID) URI (D5)
{
  "did": "did:ethr:0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "type": "EconomicAgent",
  "name": "Socio Fundador A"
}`
        },
        'E5': {
            desc: "Fusión de 'Where' (Network) con 'URI / IRI' (Detailed). Direcciones IP fijas y números de puertos internos resueltos como IRIs para el direccionamiento físico de red.",
            code: `// Network URI resolution (E5)
{
  "nginxProxy": "http://127.0.0.1:8080/static/",
  "terminusEndpoint": "http://127.0.0.1:6363/api/db/",
  "ipfsAPI": "http://127.0.0.1:5001/api/v0/"
}`
        },
        'F5': {
            desc: "Fusión de 'When' (Time) con 'URI / IRI' (Detailed). Constantes de marca de tiempo (Epochs Unix) y ticks UTC de resolución detallada para auditoría de alta frecuencia.",
            code: `// UNIX Epoch / Timestamp Constants (F5)
{
  "epochSecond": 1117616400,
  "humanUTC": "2005-06-01T09:00:00Z",
  "nanoseconds": 1117616400000000000
}`
        },
        'A6': {
            desc: "Fusión de 'Why' (Motivation) con 'Linked Data Assets' (Functioning). El valor de negocio materializado en la ejecución. Expresa el flujo acumulativo de recursos económicos y transacciones activas.",
            code: `// Realized Economic Exchanges (A6)
{
  "totalAssetsCOP": 10000000.00,
  "totalEquityCOP": 10000000.00,
  "netBalance": 0.00,
  "complianceRatio": 1.00
}`
        },
        'B6': {
            desc: "Fusión de 'How' (Process) con 'Linked Data Assets' (Functioning). Ejecución de procesos en tiempo real en los contenedores de Docker o servidores de producción de Nginx/TerminusDB.",
            code: `# Nginx Access Logs showing real-time transaction ingestion (B6)
127.0.0.1 - - [05/Jun/2026:09:51:39 -0500] "POST /api/document/import HTTP/1.1" 200 452`
        },
        'C6': {
            desc: "Fusión de 'What' (Data) con 'Linked Data Assets' (Functioning). Instancias contables reales y activas en ejecución y sincronizadas en la base de datos de grafos (TerminusDB/DFRNT). En la última sesión, completamos la ingesta del Momento 0 con un 100% de éxito, utilizando el método HTTP PUT para actualizar los documentos contables de constitución directamente en el Sandbox, quedando inmediatamente listos para flujos de auditoría por diseño y consultas de grafos.",
            code: `// Instancias Activas en el Sandbox de DFRNT (C6)
{
  "database": "sandbox",
  "organization": "d34817fa-402c-40a4-975e-c8381df4dc1d",
  "uploadStatus": "SUCCESS_200",
  "method": "HTTP PUT (In-place Update)",
  "ingestedInstances": [
    "FIBO_StockCorporation/SOCIEDAD_GENESIS_LTDA",
    "SourceDocument/Escritura_Publica_25_2005",
    "GistPerson/Socio_A", "GistPerson/Socio_B",
    "Account/110505", "Account/311505",
    "EntryHeader/Header_Genesis_1",
    "EntryDetail/Line_1", "EntryDetail/Line_2"
  ]
}`
        },
        'D6': {
            desc: "Fusión de 'Who' (People) con 'Linked Data Assets' (Functioning). Sesiones de usuarios y actores activos firmando digitalmente transacciones en la red operacional.",
            code: `// Active Authorized Audit Sessions (D6)
{
  "sessionID": "SESS-AUDIT-992B",
  "activeUser": "Agent/Socio_A",
  "loginTime": "2026-06-05T09:30:00Z",
  "signatureVerified": true
}`
        },
        'E6': {
            desc: "Fusión de 'Where' (Network) con 'Linked Data Assets' (Functioning). Enrutamiento y tráfico real de paquetes TCP/IP entre nodos distribuidos de la infraestructura.",
            code: `# Network routing stats (E6)
Active Connections: 14
Bytes Sent: 2.4 MB/s
Bytes Received: 1.8 MB/s
IPFS Node Peers Connected: 4`
        },
        'F6': {
            desc: "Fusión de 'When' (Time) con 'Linked Data Assets' (Functioning). Pistas de auditoría cronológicas y registros históricos operacionales de eventos contables y de seguridad.",
            code: `// Operational Audit Trail Logs (F6)
[
  { "time": "2005-06-01T09:00:00Z", "event": "Genesis Entity Born" },
  { "time": "2005-06-01T09:00:01Z", "event": "Capital Social Credited (4 Partners)" },
  { "time": "2005-06-01T09:00:02Z", "event": "Cash Inflow Debited ($10,000,000 COP)" }
]`
        },
        'default': {
            desc: "Visualización ampliada de este holón de la arquitectura empresarial. En este entorno, cada intersección Zachman/Fila Semántica representa una perspectiva formalizada y documentada de nuestro ecosistema.",
            code: `[ Estado del Sistema ]
Leyendo configuraciones ontológicas... OK
Validando reglas de correspondencia en el Grafo... OK
Nodos del Gemelo Digital Semántico activos.`
        }
    };

    // Open Modal
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const cellId = cell.getAttribute('data-cell');
            const title = cell.querySelector('.title').innerText;
            const subtext = cell.querySelector('.subtext').innerText;

            // Determine row and col tags based on classes
            let layerText = "Layer";
            if(cell.classList.contains('layer-trust')) layerText = "Trust & Contextual";
            if(cell.classList.contains('layer-onto')) layerText = "Ontology & Conceptual";
            if(cell.classList.contains('layer-rdf')) layerText = "RDF & Logical";
            if(cell.classList.contains('layer-xml')) layerText = "XML & Physical";
            if(cell.classList.contains('layer-uri')) layerText = "URI & Detailed";
            if(cell.classList.contains('layer-inst')) layerText = "Instances & Enterprise";

            let colText = "Aspect";
            if(cell.classList.contains('col-why')) colText = "Why (Motivation)";
            if(cell.classList.contains('col-how')) colText = "How (Process)";
            if(cell.classList.contains('col-what')) colText = "What (Data)";
            if(cell.classList.contains('col-who')) colText = "Who (People)";
            if(cell.classList.contains('col-where')) colText = "Where (Network)";
            if(cell.classList.contains('col-when')) colText = "When (Time)";

            // Update modal UI
            modalTitle.innerText = title + " (" + subtext + ")";
            modalCell.innerText = "Cell " + cellId;
            modalLayer.innerText = layerText;
            modalCol.innerText = colText;

            const data = mockData[cellId] || mockData['default'];
            modalDesc.innerText = data.desc;
            modalCode.innerText = data.code;

            if (data.image) {
                modalImageContainer.innerHTML = `<img src="${data.image}" style="max-width: 100%; border-radius: 6px; margin-top: 15px; border: 1px solid #ddd; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" />`;
            } else {
                modalImageContainer.innerHTML = '';
            }

            modal.style.display = 'block';
        });
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // ---- Sidebar Filtering Logic ----
    const layerFilters = document.querySelectorAll('#layer-filters li');
    const colFilters = document.querySelectorAll('#column-filters li');
    const allCells = document.querySelectorAll('.holon-cell, .header-cell');

    let currentLayer = 'all';
    let currentCol = 'all';

    function applyFilters() {
        allCells.forEach(cell => {
            // By default remove faded class
            cell.classList.remove('faded');

            // Skip the top-left corner
            if(cell.classList.contains('corner')) return;

            let matchesLayer = true;
            let matchesCol = true;

            // Check layer
            if (currentLayer !== 'all') {
                if (cell.classList.contains('row-header')) {
                    matchesLayer = cell.classList.contains(currentLayer);
                } else if (cell.classList.contains('header-cell')) {
                    matchesLayer = false; // Fade out column headers if filtering by row
                } else {
                    matchesLayer = cell.classList.contains(currentLayer);
                }
            }

            // Check column
            if (currentCol !== 'all') {
                if (cell.classList.contains('header-cell') && !cell.classList.contains('row-header')) {
                    matchesCol = cell.classList.contains(currentCol);
                } else if (cell.classList.contains('row-header')) {
                    matchesCol = false; // Fade out row headers if filtering by col
                } else {
                    matchesCol = cell.classList.contains(currentCol);
                }
            }

            // Apply fading if it doesn't match
            if (!matchesLayer || !matchesCol) {
                cell.classList.add('faded');
            }
        });
    }

    layerFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            layerFilters.forEach(f => f.classList.remove('active'));
            e.target.classList.add('active');
            currentLayer = e.target.getAttribute('data-layer');
            applyFilters();
        });
    });

    colFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            colFilters.forEach(f => f.classList.remove('active'));
            e.target.classList.add('active');
            currentCol = e.target.getAttribute('data-col');
            applyFilters();
        });
    });
});