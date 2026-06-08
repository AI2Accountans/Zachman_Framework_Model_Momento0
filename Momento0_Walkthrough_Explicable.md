# Flujo de Explicabilidad y Auditoría por Diseño: "Momento 0"

Este documento detalla el recorrido **paso a paso** que realiza la información contable y legal durante el evento de constitución de la entidad (**Momento 0** / Asiento de Apertura), mapeándola en la matriz del **Enterprise Reference Atlas (Zachman + Tim Berners-Lee)** para nutrir el stack semántico.

---

## El Viaje del Dato Contable Semántico (Paso a Paso)

El siguiente flujo describe cómo un "estrechón de manos" corporativo se formaliza en un documento físico estructurado, se transforma en un modelo de grafos lógico, se valida bajo reglas ontológicas estrictas de contabilidad y se almacena en el libro de verdad inmutable:

```
[1. XML UBL (C4)]  ──(2. Ingesta (B4))──>  [data.csv (Intermedio)]
                                                  │
                                            (3. MapForce (B3))
                                                  │
                                                  ▼
[4. Taxonomías (C2)] ──(5. Esquema)─────>  [6. JSON-LD (C3)]
                                                  │
                                           (7. SHACL (A3))
                                                  │
                                                  ▼
                                           [8. TerminusDB (C6)]
                                                  │
                                           (9. Blockchain (C1))
```

### Paso 1: Origen y Documento Base (Físico - Fila 4 "Physical")
*   **Celda Atlas:** **[C4] UBL Documents / UBL XML / XBRL GL Instance**
*   **Qué sucede:** El contrato de constitución firmado en la Notaría se registra como una instancia física estándar de **XBRL GL** (o UBL/XML en transacciones subsecuentes). 
*   **Archivo en tu Stack:** [GS2XBRLGL2JSONLD.xbrl](file:///C:/Users/IPHIX/Documents/Projects/DFRNT/Momento0/Output/GS2XBRLGL2JSONLD.xbrl). Este archivo contiene de forma explícita las cuentas de Caja y Capital Social, y la asignación accionaria de los 4 socios fundadores (Socio A, B, C, D).

### Paso 2: Ejecución de Ingesta Operativa (Físico - Fila 4 "Physical")
*   **Celda Atlas:** **[B4] Ingest Programs (NoSQL DDBB & XQuery / Powershell)**
*   **Qué sucede:** Los clientes y scripts locales leen los archivos físicos, extrayendo los datos transaccionales clave a un almacenamiento intermedio semiestructurado (`data.csv`).
*   **Archivo en tu Stack:** [post_process_xbrl.py](file:///C:/Users/IPHIX/Documents/Projects/DFRNT/Momento0/Output/post_process_xbrl.py) coordina el tratamiento de la instancia XML para preparar su conversión semántica.

### Paso 3: Mapeo y Normalización Semántica (Lógico - Fila 3 "Logical")
*   **Celda Atlas:** **[B3] MapForce Mapping (XML/CSV to JSON-LD)**
*   **Qué sucede:** Mediante **Altova MapForce**, los datos planos se mapean visualmente a grafos en formato **JSON-LD**. Esto garantiza la desacoplabilidad del sistema: si el formato origen cambia (ej. de XML a JSON en otra jurisdicción), solo se edita el mapeador en MapForce; la base de datos semántica central no se inmuta.
*   **Visualización en tu Atlas:** Ver [Mapeo.jpg](file:///C:/Users/IPHIX/Documents/Projects/DFRNT/Zachman_Framework_Model_Momento0/Mapeo.jpg).

### Paso 4: Referencia Conceptual y Taxonomías (Conceptual - Fila 2 "Conceptual")
*   **Celda Atlas:** **[C2] XBRL/ESG Taxonomies**
*   **Qué sucede:** Se importan los diccionarios y taxonomías contables estándar globales de **XBRL GL** y ESG (como GRI, ISSB). Esto asegura que propiedades conceptuales como `accountMainID` o `debitCreditCode` sigan un estándar común mundial e interpretable por cualquier IA de auditoría.

### Paso 5: Construcción de Modelos de Grafos Vinculados (Lógico - Fila 3 "Logical")
*   **Celda Atlas:** **[C3] JSON-LD Models (Graph Document Schema)**
*   **Qué sucede:** Se genera el documento de grafo JSON-LD final que representa la realidad lógica del asiento. Cada cuenta, socio, documento y línea contable se instancia con identificadores de recurso uniformes (URIs/IRIs).
*   **Archivo en tu Stack:** [GS2XBRLGL2JSONLD.jsonld](file:///C:/Users/IPHIX/Documents/Projects/DFRNT/Momento0/Output/GS2XBRLGL2JSONLD.jsonld).

### Paso 6: Reglas de Gobernanza Contable y Validación (Lógico - Fila 3 "Logical")
*   **Celda Atlas:** **[A3] Data Integrity (SHACL Validation)**
*   **Qué sucede:** El motor de base de datos ejecuta las reglas **SHACL (Shapes Constraint Language)**. Actuando como la directriz contable definitiva, SHACL valida:
    1.  **Partida Doble:** Que el total de Débitos equivalga exactamente al total de Créditos en la misma divisa.
    2.  **Completitud de Contrato (Zachman):** Que el asiento referencie obligatoriamente al documento legal (`SourceDocument`) que ampara la transacción.
    3.  **Alineación ISO 21838:** Que los agentes contables hereden conceptualmente de Continuantes y los eventos de Procesos de BFO.
    Si alguna regla se viola, el motor de TerminusDB rechaza la escritura en el milisegundo de ingesta (Auditoría por Diseño).

### Paso 7: Consolidación del Libro Mayor en Grafos (Ejecutable - Fila 6 "Functioning")
*   **Celda Atlas:** **[C6] Graph Instances (Graph DDBB Instances)**
*   **Qué sucede:** Las instancias validadas se inyectan en TerminusDB, materializándose en el libro de verdad semántico contable. DFRNT expone los datos a través de APIs de WoQL y GraphQL para su explotación por tableros e IAs auditoras.

### Paso 8: Anclaje de Confianza y Trazabilidad (Contextual - Fila 1 "Trust")
*   **Celda Atlas:** **[C1] Blockchain Immutability & [A1] Auditor Trust**
*   **Qué sucede:** Para garantizar la inmutabilidad jurídica absoluta del Génesis corporativo, el hash criptográfico del "Momento 0" se ancla en Blockchain. Asimismo, la procedencia (`PROV-O`) documenta la cadena de linaje ininterrumpida de vuelta al XML UBL original para que un auditor humano o IA pueda realizar auditorías instantáneas con confianza matemática.

---

## Cómo nutrir tu Stack con esta Explicabilidad

Para que este proceso sea visible e interactivo en tu interfaz gráfica, hemos implementado un **Walkthrough Interactivo Paso a Paso** directamente en el Enterprise Reference Atlas. 

Este panel permite a desarrolladores, CFOs y auditores hacer clic en **"Start Flow Walkthrough"** para resaltar secuencialmente las celdas del Atlas involucradas en el Momento 0, visualizando de forma inmediata qué rol juega cada LEGO conceptual en la arquitectura de datos contables de la organización.
