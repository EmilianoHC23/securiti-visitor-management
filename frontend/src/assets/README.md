# Assets del Proyecto SecuriTI

Esta carpeta contiene todos los recursos visuales del proyecto.

## Estructura:

### `/src/assets/` - Assets importados en componentes
- **`/images/`** - Imágenes generales (fondos, ilustraciones, etc.)
- **`/logos/`** - Logos de SecuriTI y empresas asociadas
- **`/icons/`** - Íconos SVG y archivos de iconos

### `/public/assets/` - Assets públicos accesibles directamente
- **`/images/`** - Imágenes públicas para referencias directas
- **`/logos/`** - Logos accesibles vía URL directa

## Formatos Recomendados:

### Logos:
- **PNG** - Con transparencia para uso general
- **SVG** - Vectorial para escalabilidad
- **WebP** - Optimizado para web

### Imágenes:
- **JPG/JPEG** - Fotografías y imágenes complejas
- **PNG** - Imágenes con transparencia
- **WebP** - Formato moderno optimizado
- **SVG** - Íconos e ilustraciones vectoriales

## Nombrado de Archivos:
- Usar kebab-case: `logo-securiti.png`
- Incluir dimensiones si es necesario: `logo-securiti-128x128.png`
- Versiones: `logo-securiti-dark.png`, `logo-securiti-light.png`

## Ejemplos de Uso:

### Import en componentes:
```jsx
import logoSecuriTI from '../assets/logos/logo-securiti.png'
```

### Referencia directa (public):
```jsx
<img src="/assets/logos/logo-securiti.png" alt="SecuriTI" />
```