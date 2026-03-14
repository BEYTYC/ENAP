import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Configuración de la API Key para Vite
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("⚠️ La API Key no se detectó. Revisa las variables de entorno en Vercel.");
}

// Inicializamos la instancia correctamente
const genAI = new GoogleGenerativeAI(apiKey || "");

export interface VerificationResult {
  item: string;
  status: 'present' | 'missing' | 'incomplete';
  foundValue: string;
  observations: string;
  pageRange?: string;
}

export interface AnalysisResponse {
  personName: string;
  academicProgram: string;
  checklist: VerificationResult[];
  additionalDocuments: string[];
}

export async function analyzeGraduationDocuments(pdfBase64: string): Promise<AnalysisResponse> {
  // Usamos genAI (que es la variable definida arriba) y el modelo flash
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest", // O prueba con "gemini-1.5-flash-001"
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          personName: { type: SchemaType.STRING },
          academicProgram: { type: SchemaType.STRING },
          checklist: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                item: { type: SchemaType.STRING },
                status: { type: SchemaType.STRING, enum: ["present", "missing", "incomplete"] },
                foundValue: { type: SchemaType.STRING },
                observations: { type: SchemaType.STRING },
                pageRange: { type: SchemaType.STRING }
              },
              required: ["item", "status", "foundValue", "observations"]
            }
          },
          additionalDocuments: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
          }
        },
        required: ["personName", "academicProgram", "checklist", "additionalDocuments"]
      }
    }
  });

  const prompt = `Analiza este PDF que contiene documentos de grado. Debes verificar la presencia y validez de los siguientes 12 requisitos en este orden específico:
1. Formato Verificación de requisitos y aprobación de grado
2. Documento de identidad
3. Comprobante de pago de los derechos de grado
4. Recibo de pago Estampilla Gobernación de Bolívar
5. Diploma o acta de grado
6. Certificado de promedio académico ponderado
7. Balance académico
8. Certificación de inglés
9. Resultados pruebas Saber Pro
10. Formato calificación de grado
11. Opción de grado presentada
12. Evaluación del trabajo de grado

Criterios de validación:
- Requisito 1: firmado por decano facultad ciencias navales, decano académico y director de la escuela.
- Requisito 3: valor $507.000.
- Requisito 4: valor $62.344.
- Requisito 5: Si es pregrado (Bachiller), si es posgrado (Pregrado).
- Requisito 6: firmado por Jefe de Estadística.
- Requisito 12: Firmado por Jefe de Programa y Decano.

Instrucciones de formato:
- personName: APELLIDOS Y NOMBRES.
- foundValue: Datos específicos encontrados (precios con $, promedios con PUNTO).
- pageRange: Rango de páginas (ej: "1-2").
- No uses la palabra "REVISIÓN".`;

  try {
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: pdfBase64,
        },
      },
      { text: prompt },
    ]);

    const response = result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}
