# OpenClaw Setup Guide

Guía para instalar y configurar OpenClaw en el proyecto **Team_Repo_OpenClaw_Assistant**.

> **Última actualización:** 20 de abril de 2026
> **Probado en:** Windows 11, Node.js 22.x, 8 GB RAM
> **Autor:** Octavio Becerril

---

## Requisitos previos

- Node.js 22+ instalado
- PNPM instalado (`npm install -g pnpm`)
- El repositorio clonado: `git clone <repo-url> Team_Repo_OpenClaw_Assistant`
- Una cuenta en [OpenRouter](https://openrouter.ai) con crédito ($5 USD es suficiente para meses)

## 1. Instalar OpenClaw

```bash
npm install -g openclaw@latest
```

Verifica la instalación:

```bash
openclaw --version
```

### ⚠️ Nota sobre Windows

El onboard interactivo (`openclaw setup`) **no funciona** en Windows nativo — se queda cargando. La opción `--non-interactive` tampoco funciona porque detecta Windows y bloquea. La configuración se hace manualmente (paso 2).

## 2. Configurar el modelo

Crea o edita el archivo de configuración:

```bash
# Windows (PowerShell)
notepad "$env:USERPROFILE\.openclaw\openclaw.json"

# Linux / macOS
nano ~/.openclaw/openclaw.json
```

Pega esta configuración (reemplaza `TU_KEY_AQUI` con tu API key de OpenRouter):

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "openai/google/gemini-2.5-flash"
      }
    }
  },
  "models": {
    "providers": {
      "openai": {
        "baseUrl": "https://openrouter.ai/api/v1",
        "apiKey": "TU_KEY_AQUI",
        "models": [
          {
            "id": "google/gemini-2.5-flash",
            "name": "Gemini 2.5 Flash",
            "reasoning": false,
            "input": ["text"],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 1000000,
            "maxTokens": 8192
          }
        ]
      }
    },
    "mode": "merge"
  }
}
```

### ¿Por qué OpenRouter y no modelos locales?

| Opción                      | Problema                                                 |
| --------------------------- | -------------------------------------------------------- |
| Ollama (gemma4, llama3.2)   | Necesitan 11+ GB RAM, la máquina tiene 8 GB              |
| Groq (gratis)               | Límite de 6000 tokens/min, OpenClaw manda 18000 de golpe |
| Google AI Studio (gratis)   | 5 requests/min, OpenClaw gasta 5-10 solo al arrancar     |
| **OpenRouter ($5 crédito)** | **Funciona. ~$0.15/millón tokens con Gemini 2.5 Flash**  |

## 3. Configurar las skills (TOOLS.md)

Las skills personalizadas tienen un bug de descubrimiento — no se cargan automáticamente desde `~/.openclaw/workspace/skills/`. Como workaround, las instrucciones se colocan en `TOOLS.md`:

```bash
# Windows
notepad "$env:USERPROFILE\.openclaw\workspace\TOOLS.md"

# Linux / macOS
nano ~/.openclaw/workspace/TOOLS.md
```

Agrega las skills necesarias. Ejemplo de la skill hello-world:

```markdown
## Custom Skills

### hello-world

- Directorio del proyecto: <RUTA_A_TU_REPO>/Team_Repo_OpenClaw_Assistant
- Solo ejecutar esta skill cuando el usuario la pida explícitamente.

Cuando el usuario pida ejecutar la skill hello-world:

1. Cambiar al directorio del proyecto
2. Crear `hello-openclaw.txt` en la raíz del repo con:
   Hello from OpenClaw!
   Timestamp: <fecha y hora actual en formato ISO 8601>
3. Ejecutar `pnpm -r ls --depth 0` y mostrar los workspaces del monorepo
4. Confirmar al usuario que el archivo se creó y mostrar la lista de workspaces
```

> **Importante:** Cambia `<RUTA_A_TU_REPO>` por la ruta real en tu máquina.

## 4. Levantar el gateway

```bash
openclaw gateway --force
```

El gateway se queda corriendo en la terminal. No la cierres.

## 5. Acceder al Control UI

Abre en el navegador:

```
http://127.0.0.1:18789
```

Si pide token de autenticación, cópialo de la salida del gateway en la terminal.

## 6. Probar la skill

Escribe en el chat del Control UI:

> "Ejecuta la skill hello-world para probar la conexión con el monorepo"

Verifica que se cree el archivo y que liste los workspaces.

## Comandos de referencia

| Comando                    | Descripción                       |
| -------------------------- | --------------------------------- |
| `openclaw gateway --force` | Inicia el gateway                 |
| `openclaw dashboard`       | Abre el dashboard en el navegador |
| `openclaw skills list`     | Lista las skills cargadas         |
| `openclaw --version`       | Versión instalada                 |
| `openclaw update`          | Actualizar a la última versión    |

## Troubleshooting

**El gateway no arranca:**
Verifica que el `openclaw.json` tenga JSON válido. Usa un validador online si tienes dudas.

**El agente no responde:**
Revisa que tu API key de OpenRouter sea válida y tenga crédito.

**La skill no se ejecuta:**
Asegúrate de que las instrucciones estén en `TOOLS.md` (no en `skills/`). El descubrimiento automático de skills tiene un bug abierto.

**Quiero usar modelos locales:**
Necesitas mínimo 16 GB de RAM. Con eso puedes usar Ollama con modelos como `llama3.2:3b`.
