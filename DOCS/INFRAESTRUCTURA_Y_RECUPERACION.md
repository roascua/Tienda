# Infraestructura y Recuperación del Proyecto Tienda

## Arquitectura actual

```text
Windows 11
│
├── VS Code
├── Vue 3 + TypeScript + Vite
│
└── Máquina Virtual Ubuntu
     │
     ├── Docker
     │    ├── Directus
     │    └── PostgreSQL
     │
     └── IP local (puede cambiar)
```

---

# Regla número 1

Si el frontend muestra:

```text
Error conectando con Directus
```

Lo primero que hay que verificar es:

1. ¿La máquina virtual está encendida?
2. ¿Docker está funcionando?
3. ¿Directus está funcionando?
4. ¿Cambió la IP de Ubuntu?

NO empezar revisando Vue.

---

# Verificar Docker

Mostrar contenedores activos:

```bash
docker ps
```

Resultado esperado:

```text
directus_cms
directus_postgres
```

---

# Verificar Directus

Desde Ubuntu:

```bash
curl http://127.0.0.1:8055/server/health
```

Resultado esperado:

```json
{
  "status": "ok"
}
```

Respuesta completa saludable:

```json
{
  "status": "ok",
  "checks": {
    "pg:responseTime": { "status": "ok" },
    "storage:local:responseTime": { "status": "ok" },
    "email:connection": { "status": "ok" }
  }
}
```

---

# Ver IP actual de Ubuntu

```bash
ip addr show enp0s3
```

Buscar:

```text
inet 192.168.x.x/24
```

Ejemplo:

```text
inet 192.168.1.4/24
```

---

# Ver tabla de rutas

```bash
ip route
```

Ejemplo:

```text
default via 192.168.0.1 dev enp0s3
```

---

# Probar Internet

```bash
ping 8.8.8.8
```

y

```bash
ping google.com
```

---

# Verificar conexión desde Windows

PowerShell:

```powershell
Test-NetConnection 192.168.X.X -Port 8055
```

Resultado esperado:

```text
TcpTestSucceeded : True
```

---

# Recuperar contraseña de Directus

Mostrar variables ADMIN:

```bash
docker inspect directus_cms | grep ADMIN
```

También:

```bash
docker exec directus_cms env | grep ADMIN
```

Puede mostrar:

```text
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

---

# Entrar a un contenedor

```bash
docker exec -it directus_cms sh
```

---

# Ver logs de Directus

```bash
docker logs directus_cms
```

Últimas líneas:

```bash
docker logs directus_cms --tail 50
```

---

# Reiniciar Directus

```bash
docker restart directus_cms
```

---

# Reiniciar PostgreSQL

```bash
docker restart directus_postgres
```

---

# Reiniciar todo

```bash
docker restart directus_cms directus_postgres
```

---

# Variables de entorno Vue

Archivo:

```text
.env
```

Ejemplo:

```env
VITE_DIRECTUS_URL=http://192.168.1.4:8055
```

Plantilla:

```text
.env.example
```

---

# Configuración Directus recomendada

```ts
const directusUrl =
  import.meta.env.VITE_DIRECTUS_URL ||
  'http://192.168.1.4:8055'
```

Así el proyecto sigue funcionando aunque falle el .env.

---

# Error: Failed to construct URL

Ejemplo:

```text
Failed to construct 'URL': Invalid URL
```

Causa:

```ts
import.meta.env.VITE_DIRECTUS_URL
```

es undefined.

Verificar:

```ts
console.log(import.meta.env.VITE_DIRECTUS_URL)
```

---

# Error: Error conectando con Directus

Posibles causas:

* VM apagada
* Docker apagado
* Directus detenido
* IP cambiada
* URL incorrecta

Verificar:

```bash
docker ps
curl http://127.0.0.1:8055/server/health
ip addr show enp0s3
```

---

# Git

Estado:

```bash
git status
```

Agregar cambios:

```bash
git add .
```

Commit:

```bash
git commit -m "mensaje"
```

Subir:

```bash
git push
```

Descargar:

```bash
git pull
```

---

# Vue

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

Compilar:

```bash
npm run build
```

---

# Lecciones aprendidas

## Problema real del 19/06/2026

Síntoma:

```text
Error conectando con Directus
```

Causa:

```text
Máquina virtual Ubuntu apagada
```

Consecuencia:

```text
Directus no estaba funcionando
```

---

## Segundo problema

La IP cambió:

```text
Antes:
192.168.0.107

Después:
192.168.1.4
```

Consecuencia:

```text
URLs antiguas dejaron de funcionar
```

Solución:

Actualizar:

```env
VITE_DIRECTUS_URL=http://192.168.1.4:8055
```

---

# Checklist antes de programar

1. Encender Ubuntu.
2. Verificar Docker:

```bash
docker ps
```

3. Verificar Directus:

```bash
curl http://127.0.0.1:8055/server/health
```

4. Verificar IP:

```bash
ip addr show enp0s3
```

5. Abrir Directus:

```text
http://IP_ACTUAL:8055
```

6. Ejecutar frontend:

```bash
npm run dev
```

Si todo eso funciona, el entorno está listo para trabajar.
