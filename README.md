## Configuración del proyecto

```bash
$ npm install
```

## Configuración de entorno

La aplicación requiere variables de entorno específicas configuradas en un archivo `.env` en la raíz del proyecto. Crea este archivo con las siguientes variables:

```bash
# Configuración general
PORT=3000                        # Puerto donde se ejecutará la aplicación (predeterminado: 3000)
NODE_ENV=development             # Entorno (development, production)
ALLOWED_ORIGINS=example.com,app.example.com   # Orígenes permitidos separados por comas en producción

# Configuración de API Superlikers
SUPERLIKERS_URL=https://api.example.com       # URL base de la API Superlikers
VERYFI_BASE_URL=https://api.veryfi.com        # URL base de la API Veryfi
VERYFI_VALIDATE_URL=https://api.veryfi.com/validate  # Endpoint de validación de Veryfi

# Configuración de campaña TENA
TENA_CAMPAIGN_ID=sz              # ID de campaña para TENA
TENA_API_KEY=your_api_key        # Clave API para campaña TENA
TENA_VERYFI_CLIENT_ID=your_client_id          # ID de cliente Veryfi para TENA
TENA_VERYFI_CLIENT_SECRET=your_client_secret  # Secreto de cliente Veryfi para TENA
TENA_VERYFI_API_KEY=your_api_key              # Clave API Veryfi para TENA
TENA_VERYFI_USERNAME=your_username            # Usuario Veryfi para TENA

# Configuración de campaña SABA
SABA_CAMPAIGN_ID=ua              # ID de campaña para SABA
SABA_API_KEY=your_api_key        # Clave API para campaña SABA
SABA_VERYFI_CLIENT_ID=your_client_id          # ID de cliente Veryfi para SABA
SABA_VERYFI_CLIENT_SECRET=your_client_secret  # Secreto de cliente Veryfi para SABA
SABA_VERYFI_API_KEY=your_api_key              # Clave API Veryfi para SABA
SABA_VERYFI_USERNAME=your_username            # Usuario Veryfi para SABA
```

### Agregar una nueva campaña/programa

Para agregar una nueva campaña o programa al sistema:

1. Actualiza el `MICROSITE_CONFIG` en `/src/core/constants/campaigns.constants.ts` agregando tu configuración de campaña:

```typescript
newCampaign: {
  name: 'CAMPAIGN_NAME',
  url: 'https://campaign-website.com/',
  uid: 'identifier-field', // Campo usado para identificar usuarios (ej., 'email', 'nickname')
  additionalProductsFields: {
    provider: 'PROVIDER_NAME',
    line: 'PRODUCT_LINE',
  },
  tags: [
    // Agrega etiquetas de validación
    'NO_PRODUCT_FOUND',
    'DUPLICATED',
    // ...
  ],
  validationMessages: {
    // Agrega mensajes de validación personalizados
    NO_PRODUCT_FOUND: 'Mensaje personalizado aquí',
    // ...
  },
  category: 'category_type',
}
```

2. Agrega las variables de entorno correspondientes a tu archivo `.env`:
```
CAMPAIGN_NAME_CAMPAIGN_ID=your_campaign_id
CAMPAIGN_NAME_API_KEY=your_api_key
CAMPAIGN_NAME_VERYFI_CLIENT_ID=your_client_id
CAMPAIGN_NAME_VERYFI_CLIENT_SECRET=your_client_secret
CAMPAIGN_NAME_VERYFI_API_KEY=your_api_key
CAMPAIGN_NAME_VERYFI_USERNAME=your_username
```

## Cómo funciona el sistema

Esta aplicación backend sirve como puente entre la plataforma de fidelización Superlikers y la API de procesamiento de documentos Veryfi, diseñada específicamente para campañas de validación de recibos y facturas.

### Componentes clave:

1. **Gestión de campañas**: Cada campaña (TENA, SABA, etc.) tiene su propia configuración que define reglas de validación, identificación de productos y métodos de identificación de usuarios.

2. **Flujo de procesamiento de recibos**:
   - Los usuarios cargan recibos/facturas desde la aplicación frontend
   - El backend envía el documento a Veryfi para procesamiento y extracción de datos
   - El sistema valida los datos extraídos contra reglas específicas de la campaña
   - Según los resultados de la validación, el recibo puede ser:
     - Aprobado y se otorgan puntos a través de la API de Superlikers
     - Rechazado con mensajes de validación específicos
     - Marcado para revisión manual

3. **Reglas de validación**: El sistema verifica:
   - Presencia de productos específicos en el recibo
   - Envíos de recibos duplicados
   - Fechas válidas de recibo
   - Información válida del vendedor
   - Posibles patrones de fraude

4. **Puntos de integración**:
   - **API de Veryfi**: Para extracción de datos de recibos
   - **API de Superlikers**: Para gestión de usuarios y manejo de puntos/recompensas

### Endpoints de API

La aplicación expone endpoints de API RESTful con el prefijo `/api`. Consulta los archivos de controlador para documentación específica de endpoints.

## Compilar y ejecutar el proyecto

```bash
$ npm run start:dev
```

## Ejecutar pruebas

```bash
# pruebas unitarias
$ npm run test

# pruebas e2e
$ npm run test:e2e

# cobertura de pruebas
$ npm run test:cov
```
