import os
import chardet

# ========== настройки ==========

# Папки, которые нужно исключить
EXCLUDED_DIRS = {
    ".git", "node_modules", "__pycache__", "venv", ".idea", ".vscode",
    "dist", "build", ".next", ".turbo", ".expo", ".pytest_cache"
}

# Типы файлов, которые пропускаем
BINARY_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".ico",
    ".pdf", ".zip", ".tar", ".gz", ".7z", ".exe", ".dll",
    ".ttf", ".otf", ".woff", ".woff2", ".mp3", ".mp4", ".mov",
}

OUTPUT_FILENAME = "project_full_dump.md"

# ==================================


def is_binary_file(file_path):
    """Определяет бинарные файлы по расширению или содержимому."""
    _, ext = os.path.splitext(file_path)
    if ext.lower() in BINARY_EXTENSIONS:
        return True

    try:
        with open(file_path, "rb") as f:
            chunk = f.read(1024)
            if b"\0" in chunk:
                return True
    except:
        return True

    return False


def read_text_file(file_path):
    """Определяем кодировку и читаем текст."""
    try:
        with open(file_path, "rb") as f:
            raw = f.read()

        encoding = chardet.detect(raw)["encoding"] or "utf-8"

        return raw.decode(encoding, errors="replace")
    except Exception as e:
        return f"<<Ошибка чтения файла: {e}>>"


def export_project(root_folder):
    with open(OUTPUT_FILENAME, "w", encoding="utf-8") as out:
        out.write(f"# 📦 Полный дамп проекта: `{root_folder}`\n\n")

        for dirpath, dirnames, filenames in os.walk(root_folder):
            # Убираем из обхода исключённые папки
            dirnames[:] = [d for d in dirnames if d not in EXCLUDED_DIRS]

            for filename in filenames:
                full_path = os.path.join(dirpath, filename)
                rel_path = os.path.relpath(full_path, root_folder)

                if is_binary_file(full_path):
                    out.write(f"## 🚫 {rel_path} (бинарный файл — пропущен)\n\n")
                    continue

                out.write(f"## 📄 {rel_path}\n\n")
                out.write("```text\n")
                out.write(read_text_file(full_path))
                out.write("\n```\n\n")

    print(f"✅ Готово! Файл '{OUTPUT_FILENAME}' создан.")


if __name__ == "__main__":
    project_root = os.getcwd()
    export_project(project_root)
