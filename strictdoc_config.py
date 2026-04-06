from strictdoc.core.project_config import ProjectConfig


def create_config() -> ProjectConfig:
    config = ProjectConfig(
        project_title="OpenClaw Assistant - Requirements",
        project_features=[
            "REQUIREMENT_TO_SOURCE_TRACEABILITY",
            "TRACEABILITY_SCREEN",
            "SEARCH",
        ],
        source_root_path="../../",
        include_doc_paths=[
            "/**/*.sdoc",
        ],
        exclude_source_paths=[
            "/.git/**",
            "/.venv/**",
            "/node_modules/**",
            "/output/**",
            "/reports/**",
        ],
    )
    return config
