## Sistema-de-Registro-de-Visitas

## Origen del Proyecto
El origen de este proyecto surge a partir de la necesidad de modernizar y optimizar el proceso de registro y control de visitantes dentro de la organización. Anteriormente, el control de accesos y la programación de citas se realizaban de manera manual. Este método destacaba la dificultad de mantener un control centralizado, la pérdida de información o deterioro de los registros, la falta de trazabilidad en las visitas y la imposibilidad de generar reportes de manera rápida y eficiente. 

Adicionalmente, con el crecimiento de la empresa y el aumento de visitantes, proveedores y personal externo, se hizo evidente la necesidad de contar con una herramienta digital que permitiera gestionar citas de manera más ágil, segura y accesible desde cualquier lugar. Fue así como surgió la propuesta de desarrollar una aplicación web y móvil que integrara en un solo sistema todas las funciones necesarias para administrar citas, visitantes y personal, garantizando además la seguridad de la información y mejorando la experiencia de los usuarios internos y externos.

## Contexto del Proyecto
El presente proyecto se desarrolla en el marco de las actividades de la empresa SecuriTI, dedicada a brindar soluciones de ciberseguridad y servicios de valor agregado en el ámbito de las tecnologías de la información. En su operación diaria, la organización recibe constantemente visitantes, proveedores, clientes y personal externo, lo que genera la necesidad de contar con un proceso estructurado para gestionar citas y controlar accesos.

Actualmente, estos procesos se realizan de manera manual o con herramientas no especializadas, lo que limita la eficiencia administrativa y dificulta el seguimiento oportuno de los registros. Además, la empresa busca alinearse con las tendencias tecnológicas actuales, adoptando soluciones digitales que garanticen seguridad, escalabilidad y accesibilidad.

En este escenario, el desarrollo de una aplicación web y móvil basada en React representa una solución estratégica, ya que permitirá a los asistentes administrativos y al personal encargado de la recepción contar con una herramienta moderna para el registro y gestión de visitantes, mientras que los administradores podrán obtener reportes, métricas y un mayor control sobre la operación.

El proyecto también se contextualiza en un entorno de transformación digital, donde las organizaciones requieren herramientas tecnológicas que optimicen recursos, reduzcan errores humanos y mejoren la experiencia tanto de los colaboradores como de los visitantes. Con esta iniciativa, la empresa no solo resuelve una problemática interna, sino que sienta las bases para ampliar su infraestructura digital y fortalecer sus procesos organizacionales.


## Objetivo del Proyecto

El objetivo principal de este proyecto es diseñar, desarrollar e implementar una aplicación web y móvil en React que funcione como un sistema integral de gestión de visitantes, citas y personal dentro de una organización. Esta herramienta busca optimizar los procesos administrativos relacionados con la programación de visitas, control de accesos y administración de agendas, brindando a los usuarios una solución moderna, segura y accesible desde cualquier lugar.

La aplicación permitirá a los asistentes administrativos (recepción) realizar funciones clave como:

- Iniciar sesión de manera segura.
- Registrar visitantes y agendar citas de manera ágil.
- Consultar, editar y cancelar citas previamente registradas.
- Mantener un historial de citas con fines de control y seguimiento.

Por su parte, los administradores del sistema contarán con funciones avanzadas, tales como:

- Supervisar y gestionar las agendas de citas de todo el personal.
- Controlar el acceso de visitantes mediante la verificación de datos registrados.
- Consultar, editar y cancelar citas previamente registradas.
- Mantener un historial de citas con fines de control y seguimiento.
- Administrar el personal interno y los invitados externos.
- Crear y gestionar cuentas de usuario con diferentes roles y permisos.
- Generar reportes y métricas para la toma de decisiones estratégicas.

Finalmente, el Usuario Final (Visitante) contará con funciones limitadas, tales como:

- Proporcionar sus datos personales al momento de agendar una cita o registrarse en recepción.
- Recibir confirmaciones y notificaciones automáticas sobre citas o eventos programados.
- Presentarse en la organización y registrar su entrada y salida.
- Consultar el detalle de sus citas (en caso de habilitarse un portal o acceso limitado)
La aplicación estará soportada por un esquema de autenticación basada en roles, lo que garantizará que cada usuario acceda únicamente a las funcionalidades que le corresponden, reforzando así la seguridad y la privacidad de los datos.

Además, se incluirá un sistema de notificaciones automáticas, mediante el cual se enviarán recordatorios y confirmaciones de citas, mejorando la comunicación con los usuarios y reduciendo el riesgo de inasistencias.

Otro aspecto fundamental del proyecto es que la aplicación será multiplataforma y accesible desde diferentes dispositivos, lo que permitirá a los usuarios consultar, registrar y gestionar citas desde cualquier lugar con conexión a internet. Esto otorga flexibilidad y garantiza la continuidad de los procesos administrativos sin importar la ubicación física del personal.

En conjunto, este proyecto no solo busca desarrollar una aplicación funcional, sino también aportar eficiencia operativa, reducción de errores y una mejor experiencia de usuario.

## Problema
El proceso tradicional de registro de visitas mediante papel y lápiz presentaba múltiples limitaciones que afectan la eficiencia, seguridad y trazabilidad dentro de la organización. 

- Falta de precisión y legibilidad: Los registros manuales eran propensos a errores humanos, escritura ilegible o datos incompletos.
- Pérdida de información: Al no contar con respaldo digital, los registros podrían extraviarse, deteriorarse o ser manipulados sin control.
- Dificultad para generar reportes: La recopilación de estadísticas o métricas requería revisar físicamente los registros, lo que implicaba tiempo y esfuerzo excesivo.
- Acceso limitado a la información: Solo el personal presente podía consultar los registros, lo que dificulta la coordinación entre áreas.
- Falta de seguridad y control de acceso: No existía un sistema confiable para verificar la identidad de los visitantes ni para restringir el acceso según roles o permisos.

**Propósito General**
Sistema integral para la gestión de visitantes, citas y personal en una organización, que incluye:

- Registro y control de acceso de visitantes.
- Gestión de agendas y citas.
- Administración de personal e invitados.
- Generaación de reportes y métricas.
- Sistema de autenticación y roles.

**Módulos Principales**
- **Dashboard:** Vista general con métricas y resumen de actividades.
- **Autenticación:** Sistema de login y control de acceso.
- **Gestión de Citas:** Creación, edición y visualización de agendas.
- **Calendario:** Vista mensual de todas las citas programadas.
- **Gestión de Invitados:** Registro y administración de empleados de la organización.
- **Gestión de Personal:** Administración de empleados de la organización.
- **Recepción:** Módulo principal para registro de llegadas/salidas.
- **Reportes:** Métricas y estadísticas del sistema.


## Características principales

- Registro e inicio de sesión de usuarios.
- Creación, consulta, edición y cancelación de citas.
- Panel de administración para gestión de citas.
- Envío de notificaciones automáticas como recordatorio.
- Interfaz responsiva y amigable (adaptada a web y dispositivos móviles).
- Seguridad mediante autenticación y control de acceso.

## Tecnologías utilizadas

- **Frontend:** React.js  
- **Backend:** Node.js con Express (propuesto)  
- **Base de datos:** MySQL / PostgreSQL (según implementación final)  
- **Control de versiones:** Git y GitHub  
- **Entorno de trabajo:** Visual Studio Code 

## Requerimientos del sistema

- **Sistema operativo compatible:** Windows 10/11, Linux o macOS.
- **Entorno de desarrollo:** Visual Studio Code (u otro editor de codigo).
- **Lenguaje de programación:** JavaScript/TypeScript.
- **Framework fronted:** React(SPA y PWA para soporte móvil).
- **Framework backend:** Node.js con Express (API REST)
- **Base de datos:** MySQL o PostgreSQL.
- **Control de versiones:** Git (GitHub, GitLab o Bitbucket).
- **Navegadores compatibles:** Google Chrome, Mozilla Firefox, Microsoft Edge.
- **Herramientas de prueba:** Postman para API, Jest/Mocha (opcional para pruebas unitarias).

## Requerimientos de Hardware (minimos) para el desarrollo

- **Procesador:** Intel i5 o equivalente.
- **Memoria RAM:** 8GB minimo.
- **Almacenamietno:** 250GB libres.
- **Conexión a internet estable.**

## Requerimientos No funcionales del sistema

- **Seguridad:** Autenticación de usuarios, control de roles y cifrado de datos sensibles.
- **Usabilidad:** Interfaz intuitiva para usuarios y administradores.
- **Escalabilidad:** Permitir añadir nuevas funciones en el futuro.
 - **Disponibilidad:** Acceso 24/7 desde navegadores web y dispositivos móviles.
 - **Compatibilidad:** Funcionar con el sistema Windows, Linux y dispositivos móviles vía PWA.

 ## Estructura del repositorio

 ### Documentación
 - Diagramas de Flujo: [Diagramas](docs/diagramas-de-flujo)
 - Casos de Uso: [Diagramas](docs/diagramas-caso-de-uso/Casos-de-uso.png)
