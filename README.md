# HeCCA

Versión Actual: 2.0 

El desarrollo de esta **Herramienta de Cálculo de Caudal Ambiental** (HeCCA) se ha llevado a cabo por estudiantes de la Universidad Nacional de Colombia para facilitar una herramienta para Calcular Caudal Ambiental a partir de los datos abiertos del **Instituto de Hidrología, Meteorología y Estudios Ambientales** (IDEAM), siguiendo el método descrito por dicha entidad y el **Ministerio de Medio Ambiente y Desarrollo Sostenible** (MADS) de la Republica de Colombia.

El cálculo de Caudal Ambiental se realiza para dimensionar los caudales de aprovechamiento necesarios para conservar los servicios ecosistemicos brindados por un cauce de agua. En otras palabras nos responde a la pregunta: ¿Qué tanta agua podemos sacarle un rio sin acabar con el rio?

Con esta versión se hace disponible una aplicación web que tiene como principal objetivo convertirse en una herramienta de analisis hidrologico sencilla de usar y con resultados fiables para mejorar la gestión hidrica desde la población general.

## Sobre esta versión

Utiliza la metodologia definida por el Ministerio Colombiano de Ambiente y Desarrollo Sostenible (MinAmbiente) disponible [aquí](https://www.minambiente.gov.co/gestion-integral-del-recurso-hidrico/caudal-ambiental/).

Su frontend está desarrollado en React y su backend en Python.

Debido al tamaño de los archivos de entrada, estos se suben temporalmente a una base de datos en la plataforma Firebase de Google.


## Desarrollo.

### Primeros pasos en el repositorio.

Si recien llegas al equipo o al proyecto, tendrás que descargar este repositorio. 

1. **Descarga el Repositorio:** Copia en tu terminal el comando `gh repo clone hidrourbana/HeCCA_2.0`.

2. **Instala las dependencias:** Abre la carpeta `HeCCA_2.0` en el editor de código de tu preferencia. Copia en la terminal el comando `npm i`.

3. **Corre el proyecto:** Copia en la terminal el comando `npm run start`. Esto abrirá el navegador y te mostrará el proyecto que se corre en un servidor local. 

### Errores Comunes


**Error** 

`gh : El término 'gh' no se reconoce como nombre de un cmdlet, función, archivo de script o programa ejecutable.` 

**Problema**

GitHub CLI no está correctamente instalado. 

**Solución** 

Puedes descargarlo desde [aquí](https://cli.github.com/) y seguir los pasos de instalación. Para verificar que esté correctamente instalado puedes escribir en la terminal `gh version`. 


**Error** 

`git : El término 'git' no se reconoce como nombre de un cmdlet, función, archivo de script o programa ejecutable.`
**Problema**

Git no está correctamente instalado. 

**Solución** 

Puedes descargarlo desde [aquí](https://git-scm.com/downloads) y seguir los pasos de instalación. Para verificar que esté correctamente instalado puedes escribir en la terminal `git version`. 


**Error** 

`npm : El término 'npm' no se reconoce como nombre de un cmdlet, función, archivo de script o programa ejecutable.`

**Problema**

NodeJS no está correctamente instalado. 

**Solución** 

Puedes descargarlo desde [aquí](https://nodejs.org/en) y seguir los pasos de instalación. Para verificar que esté correctamente instalado puedes escribir en la terminal `node -v` y `npm -v` . 


**Error** 

`Proxy error: Could not proxy request /api/post from localhost:3000 to http://127.0.0.1:8000/.`. 

**Problema**

Si solo estás trabajando con este módulo, te mostrará un error porque falla el intento de establecer comunuicación con el backend. 

**Solución** 

Una solución puede ser correr el [backend](https://github.com/hidrourbana/HeCCA-2.0-Backend) en el puerto `http://127.0.0.1:8000/` 

Sin embargo no deberia haber mayor problema para correr el proyecto si esto aparece.

Tienes algún otro inconveniente? Puedes comunicarte via email con  hidrourbana_bog@unal.edu.co


## Notas FrontEnd

La aplicación se compone de 3 partes.
- Header
- Content
- Footer