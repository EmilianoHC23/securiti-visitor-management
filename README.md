# 🏢 SecuriTI - Sistema de Gestión de Visitas

> Sistema profesional de gestión y control de visitas empresariales con arquitectura moderna y escalable.

## 📋 Descripción del Proyecto

**SecuriTI** es un sistema integral de gestión de visitas diseñado para empresas que necesitan controlar y monitorear el acceso de visitantes a sus instalaciones. El sistema ofrece una solución completa desde el registro hasta el seguimiento de visitas, con diferentes niveles de acceso según el rol del usuario.

## 🎯 Objetivos y Propósito

### ¿Por qué SecuriTI?
- **Seguridad Empresarial**: Control total sobre quién ingresa y sale de las instalaciones
- **Trazabilidad**: Registro completo de todas las visitas con timestamps
- **Eficiencia**: Automatización del proceso de registro y gestión de visitantes  
- **Compliance**: Cumplimiento de normativas de seguridad empresarial
- **Experiencia Usuario**: Interface moderna y intuitiva para todos los usuarios

### Casos de Uso
- Oficinas corporativas con múltiples departamentos
- Empresas de tecnología con políticas de seguridad estrictas
- Centros de negocios que reciben visitantes frecuentemente
- Organizaciones que necesitan reportes de acceso detallados

## 🏗️ Arquitectura del Sistema

### Estructura del Proyecto
```
sec-visitas/
├── 🔙 backend/                    # API REST - Servidor Principal
│   ├── middleware/               # Autenticación y validaciones
│   ├── models/                  # Esquemas de base de datos
│   ├── routes/                  # Endpoints de la API
│   ├── scripts/                 # Utilidades y migraciones
│   └── server.js               # Punto de entrada del servidor
│
├── 🎨 frontend/                   # Aplicación Web - Interface Usuario
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pages/             # Páginas principales
│   │   ├── contexts/          # Manejo de estado global
│   │   └── assets/           # Recursos estáticos
│   └── vite.config.js        # Configuración del bundler
│
├── 📚 docs/                      # Documentación técnica
├── 🚀 deploy/                    # Scripts de despliegue
└── 📋 README.md                 # Documentación principal
```

## 🛠️ Stack Tecnológico

### **Backend - API REST**

#### **Node.js v22.19.0**
- **¿Por qué?** Runtime JavaScript de alto rendimiento, ideal para APIs REST
- **Ventaja:** Ecosistema npm extenso, desarrollo rápido, comunidad activa
- **Uso en proyecto:** Servidor principal que maneja toda la lógica de negocio

#### **Express.js v4.18.2**  
- **¿Por qué?** Framework web minimalista y flexible para Node.js
- **Ventaja:** Rápido de implementar, middleware potente, excelente para APIs
- **Uso en proyecto:** Manejo de rutas, middleware de autenticación, CORS

#### **MongoDB Atlas + Mongoose v7.0.3**
- **¿Por qué MongoDB?** Base de datos NoSQL, flexible para esquemas cambiantes
- **¿Por qué Atlas?** Hosting en la nube, escalabilidad automática, backups
- **¿Por qué Mongoose?** ODM que facilita validaciones y relaciones
- **Uso en proyecto:** Almacenamiento de usuarios, visitas, empresas, blacklist

#### **JWT (jsonwebtoken v9.0.0)**
- **¿Por qué?** Autenticación stateless, segura y escalable
- **Ventaja:** No requiere almacenamiento de sesiones en servidor
- **Uso en proyecto:** Autenticación de usuarios, control de acceso por roles

#### **bcryptjs v2.4.3**
- **¿Por qué?** Hash seguro de contraseñas con salt
- **Ventaja:** Protección contra ataques de fuerza bruta
- **Uso en proyecto:** Encriptación de contraseñas de usuarios

### **Frontend - Aplicación Web**

#### **React 18.2.0**
- **¿Por qué?** Librería líder para interfaces de usuario
- **Ventaja:** Componentes reutilizables, virtual DOM, ecosistema maduro  
- **Uso en proyecto:** Construcción de toda la interfaz de usuario

#### **Vite 4.2.0**
- **¿Por qué?** Build tool ultrarrápido con HMR instantáneo
- **Ventaja:** Tiempo de desarrollo optimizado, bundle eficiente
- **Uso en proyecto:** Servidor de desarrollo y build de producción

#### **React Router v6.8.0**
- **¿Por qué?** Navegación SPA estándar para React
- **Ventaja:** Rutas anidadas, navegación programática, guards de ruta
- **Uso en proyecto:** Navegación entre Login, Dashboard y diferentes secciones

#### **Axios v1.3.0**
- **¿Por qué?** Cliente HTTP con interceptors y mejor manejo de errores
- **Ventaja:** Interceptors para tokens, mejor debugging que fetch
- **Uso en proyecto:** Comunicación con API backend, manejo de autenticación

#### **CSS3 Moderno**
- **¿Por qué?** Control total sobre el diseño, sin dependencias externas
- **Ventaja:** Rendimiento óptimo, customización completa
- **Uso en proyecto:** Diseño responsivo, componentes con líneas inferiores

## 🔧 Funcionalidades Implementadas

### **Fase 1 - Sistema de Autenticación ✅**

#### **Modelos de Datos:**
- **👥 User Model**: Usuarios del sistema con roles (admin, recepción, host)
- **🏢 Company Model**: Empresas que pueden recibir visitas 
- **📝 Visit Model**: Registro completo de visitas con estados
- **🚫 Blacklist Model**: Lista de visitantes bloqueados

#### **Sistema de Autenticación:**
- Login con email y contraseña
- Tokens JWT con expiración
- Validación de credenciales
- Manejo de sesiones seguro
- Mensajes de error específicos (correo vs contraseña incorrecta)

#### **Interface de Usuario:**
- **Login moderno** con íconos y efectos visuales
- **Campos con líneas inferiores** que se iluminan al hacer focus
- **Botón mostrar/ocultar contraseña** con íconos dinámicos
- **Diseño responsivo** para móvil, tablet y desktop
- **Logo SecuriTI integrado** en cabecera

#### **Roles y Permisos:**
- **Admin**: Acceso total al sistema
- **Recepción**: Gestión de visitas y registros
- **Host**: Visualización de sus propias visitas

## 🚀 Cómo Ejecutar el Proyecto

### **Prerrequisitos**
- Node.js v18+ instalado
- MongoDB Atlas cuenta configurada
- Git para clonar el repositorio

### **Instalación Paso a Paso**

```bash
# 1. Clonar el repositorio
git clone https://github.com/EmilianoHC23/securiti-visitor-management.git
cd securiti-visitor-management

# 2. Instalar dependencias del proyecto
npm install

# 3. Configurar Backend
cd backend
npm install

# Crear archivo .env con tus credenciales:
# MONGODB_URI=tu_string_de_conexion_mongodb
# JWT_SECRET=tu_clave_secreta_jwt
# PORT=5000

# 4. Configurar Frontend  
cd ../frontend
npm install

# 5. Inicializar base de datos (solo la primera vez)
cd ../backend
npm run init-db

# 6. Ejecutar en desarrollo
# Terminal 1 - Backend:
cd backend && npm start

# Terminal 2 - Frontend:
cd frontend && npm run dev
```

### **URLs de Acceso**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Documentación API:** http://localhost:5000/api-docs (próximamente)

### **Usuarios de Prueba**
```javascript
// Admin
email: admin@securiti.co
password: admin123

// Recepcionista  
email: recepcion@securiti.co
password: recepcion123

// Host
email: host@securiti.co  
password: host123
```

## 🔮 Roadmap del Proyecto

### **Fase 2 - Gestión de Visitas (Próximo)**
- [ ] Registro de nuevas visitas
- [ ] QR codes para empresas
- [ ] Check-in/Check-out de visitantes
- [ ] Notificaciones en tiempo real
- [ ] Panel de visitas activas

### **Fase 3 - Reportes y Analytics**  
- [ ] Dashboard con métricas
- [ ] Reportes de visitas por periodo
- [ ] Exportación de datos
- [ ] Gráficos de estadísticas
- [ ] Alertas de seguridad

### **Fase 4 - Funciones Avanzadas**
- [ ] Integración con cámaras
- [ ] Reconocimiento facial
- [ ] App móvil para visitantes
- [ ] API webhooks para integraciones
- [ ] Sistema de badges digitales

## 🤝 Colaboración y Desarrollo

### **Flujo de Trabajo Git**
```bash
# 1. Obtener últimos cambios
git pull origin main

# 2. Crear rama para nueva característica  
git checkout -b feature/nombre-caracteristica

# 3. Realizar cambios y commits
git add .
git commit -m "feat: descripción del cambio"

# 4. Subir rama y crear Pull Request
git push origin feature/nombre-caracteristica
```

### **Convención de Commits**
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs  
- `docs:` Actualización de documentación
- `style:` Cambios de diseño/CSS
- `refactor:` Refactorización de código
- `test:` Añadir o corregir tests

### **Para Contribuidores**
1. Fork del repositorio
2. Crear rama con nombre descriptivo
3. Seguir convenciones de código existentes
4. Escribir commits claros y descriptivos
5. Crear Pull Request con descripción detallada

## 📞 Soporte y Contacto

- **Repositorio:** https://github.com/EmilianoHC23/securiti-visitor-management  
- **Issues:** Reportar bugs o solicitar características
- **Wiki:** Documentación técnica detallada (próximamente)

---

### 📈 Estado del Proyecto

**Versión Actual:** v1.0.0 - Phase 1 Complete  
**Estado:** ✅ Estable para desarrollo  
**Última actualización:** Septiembre 2025

**Próximos Milestones:**
- Fase 2: Gestión completa de visitas
- Despliegue en producción  
- Documentación API completa
