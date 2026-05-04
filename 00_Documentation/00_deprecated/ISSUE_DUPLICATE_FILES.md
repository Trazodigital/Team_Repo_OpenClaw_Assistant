# ⚠️ Duplicate Files and Directories — Review Required

After pulling the latest changes, the following duplications and conflicts were identified that need team alignment.

## 1. StrictDoc Configuration — Two Config Files

| File                                    | Format | Source Root                     | Notes                                          |
| --------------------------------------- | ------ | ------------------------------- | ---------------------------------------------- |
| `strictdoc.toml` (project root)         | TOML   | `.` (looks in `/requirements/`) | Added in `4b15d6a`                             |
| `docs/requirements/strictdoc_config.py` | Python | `../../` (project root)         | Added earlier, includes `exclude_source_paths` |

**Action needed:** Decide which config format and location to keep. StrictDoc v0.19 supports both TOML and Python, but Python is the recommended path forward (TOML is being deprecated in 2026-Q1). Only one should remain.

## 2. Requirements Documents — Two Index Files + Two Sets of Requirements

| File                                    | Content                                                      |
| --------------------------------------- | ------------------------------------------------------------ |
| `requirements/index.sdoc`               | Requirements index at project root                           |
| `docs/requirements/index.sdoc`          | Requirements index under `docs/`                             |
| `docs/requirements/requirements.sdoc`   | System requirements (functional, non-functional, tech stack) |
| `docs/requirements/HelloWorldTest.sdoc` | HelloWorldTest feature requirement                           |

**Action needed:** Decide on a single canonical location for `.sdoc` files:

- **Option A:** `requirements/` (root-level, referenced by `strictdoc.toml`)
- **Option B:** `docs/requirements/` (referenced by `strictdoc_config.py`)

The two `index.sdoc` files appear to have the same content and should be deduplicated.

## 3. Recommended Resolution

1. Choose **one directory** for all `.sdoc` requirement files
2. Choose **one StrictDoc config** (recommend `strictdoc_config.py` for future-proofing)
3. Remove the duplicate files
4. Update CI workflow if the StrictDoc export path changes
