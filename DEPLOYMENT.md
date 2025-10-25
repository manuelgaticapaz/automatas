# 🚀 Guía de Despliegue en GitHub Pages

Esta guía te ayudará a publicar tu simulador de autómatas en GitHub Pages paso a paso.

## 📋 Requisitos Previos

- Una cuenta de GitHub
- Git instalado en tu computadora (opcional, puedes usar la interfaz web)

## 🎯 Método 1: Usando la Interfaz Web de GitHub (Más Fácil)

### Paso 1: Crear un Repositorio

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón verde **"New"** o **"+"** → **"New repository"**
3. Nombra tu repositorio (ej: `automatas-simulator`)
4. Marca la casilla **"Add a README file"**
5. Haz clic en **"Create repository"**

### Paso 2: Subir los Archivos

1. En tu nuevo repositorio, haz clic en **"uploading an existing file"**
2. Arrastra y suelta todos los archivos del proyecto:
   - `index.html`
   - `script.js`
   - `styles.css`
   - `automatas_ejemplo.txt`
   - `README.md`
   - `package.json`
   - `LICENSE`
3. Escribe un mensaje de commit como "Agregar simulador de autómatas"
4. Haz clic en **"Commit changes"**

### Paso 3: Habilitar GitHub Pages

1. Ve a la pestaña **"Settings"** de tu repositorio
2. Desplázate hacia abajo hasta la sección **"Pages"**
3. En **"Source"**, selecciona **"Deploy from a branch"**
4. En **"Branch"**, selecciona **"main"**
5. Deja **"/ (root)"** seleccionado
6. Haz clic en **"Save"**

### Paso 4: Acceder a tu Aplicación

1. Espera unos minutos (2-5 minutos)
2. Regresa a la sección **"Pages"** en Settings
3. Verás un mensaje verde con la URL de tu sitio:
   ```
   Your site is published at https://tu-usuario.github.io/automatas-simulator
   ```
4. ¡Haz clic en el enlace para ver tu aplicación en vivo!

## 🛠️ Método 2: Usando Git (Para Usuarios Avanzados)

### Paso 1: Clonar y Configurar

```bash
# Crear un nuevo repositorio en GitHub primero, luego:
git clone https://github.com/tu-usuario/automatas-simulator.git
cd automatas-simulator

# Copiar todos los archivos del proyecto a esta carpeta
# Luego:
git add .
git commit -m "Agregar simulador de autómatas"
git push origin main
```

### Paso 2: Habilitar Pages

Sigue los pasos 3-4 del Método 1.

## 🔧 Personalización

### Cambiar el Título

Edita el archivo `index.html` y modifica:
```html
<title>Tu Título Personalizado</title>
<h1>🤖 Tu Título Personalizado</h1>
```

### Agregar más Autómatas de Ejemplo

Edita el archivo `automatas_ejemplo.txt` y agrega más autómatas siguiendo el formato.

### Modificar Estilos

Edita `styles.css` para cambiar colores, fuentes, etc.

## 🐛 Solución de Problemas

### La página no carga
- Espera 5-10 minutos después de habilitar Pages
- Verifica que el archivo `index.html` esté en la raíz del repositorio
- Asegúrate de que el repositorio sea público

### Los archivos no se actualizan
- Haz un "hard refresh" (Ctrl+F5 en Windows, Cmd+Shift+R en Mac)
- Espera unos minutos para que GitHub Pages se actualice

### Error 404
- Verifica que la URL sea correcta: `https://tu-usuario.github.io/nombre-repositorio`
- Asegúrate de que GitHub Pages esté habilitado

## 📱 Verificar que Funciona

1. Abre tu sitio web
2. Descarga el archivo de ejemplo desde la aplicación
3. Carga el archivo descargado
4. Selecciona un autómata (ej: AF04)
5. Prueba con la palabra "a" (debería ser aceptada)
6. Prueba con la palabra "b" (debería ser rechazada)

## 🎉 ¡Listo!

Tu simulador de autómatas ya está publicado y accesible desde cualquier parte del mundo. Puedes compartir la URL con tus compañeros o profesores.

### URLs de Ejemplo:
- `https://manuel123.github.io/automatas-simulator`
- `https://estudiante.github.io/mi-simulador`
- `https://usuario.github.io/dfa-project`

## 📞 Soporte

Si tienes problemas:
1. Revisa esta guía paso a paso
2. Consulta la [documentación de GitHub Pages](https://docs.github.com/en/pages)
3. Verifica que todos los archivos estén en el repositorio
