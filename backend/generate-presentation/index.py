import json
import base64
import os
import ssl
import copy
import urllib.request
import tempfile
from fpdf import FPDF


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Authorization",
}

# CDN fallback URLs for font downloads (used only if system/pip fonts not found)
FONT_REGULAR_URLS = [
    "https://github.com/google/fonts/raw/main/ofl/notosans/NotoSans%5Bwdth%2Cwght%5D.ttf",
    "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSans/hinted/ttf/NotoSans-Regular.ttf",
    "https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf",
]

FONT_BOLD_URLS = [
    "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSans/hinted/ttf/NotoSans-Bold.ttf",
    "https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSans/NotoSans-Bold.ttf",
]

# -------------------------------------------------------------------
# Hardcoded site content by section
# -------------------------------------------------------------------
SITE_CONTENT = {
    "hero": {
        "title": 'АО "КриптоСтройИнвест" (АО КСИ)',
        "subtitle": "Акционерное общество",
        "tagline": "Оператор интеллектуальной инфраструктуры для девелопмента",
        "description": "АО КСИ развивает внутренние службы и прикладные контуры, обеспечивающие создание виртуального девелопера. Ключевой проект компании — КриптоМетры, интеллектуальная система распределённого девелопмента.",
    },
    "about": {
        "title": "О компании",
        "facts": [
            "Год основания: 2023",
            "Правовая форма: АО",
            "Местонахождение: Москва",
            "4 внутренние службы",
            "Ключевой проект: КриптоМетры",
        ],
        "positioning": [
            "Оператор интеллектуальной инфраструктуры",
            "Проект виртуального девелопера",
            "Ключевой проект — КриптоМетры",
        ],
        "principles": [
            "Системность — каждое решение часть архитектуры",
            "Долгий горизонт — ценность в инфраструктуре и компетенциях",
            "Профессиональный стандарт — работа с участниками рынка",
            "Прозрачность стадии — без преувеличения готовности",
        ],
    },
    "cryptometry": {
        "title": "КриптоМетры",
        "subtitle": "Интеллектуальная система распределённого девелопмента",
        "description": "Ключевой проект АО КСИ. Единая среда, в которой задачи, компетенции, внутренние службы и прикладные контуры собираются в управляемую модель.",
        "features": [
            "Единая интеллектуальная система, а не набор разрозненных функций",
            "Распределённая логика девелопмента — задачи, активы, компетенции в одной среде",
            "Система решения задач, а не каталог услуг",
            "Развитие от стартовых контуров к целостной модели виртуального девелопера",
            "Прямая связь с управляющим и операторским контуром АО КСИ",
        ],
        "why": [
            "Снижение хаоса в девелоперских процессах",
            "Переход от разрозненных действий к единой интеллектуальной системе",
            "Интеграция аналитики, поиска, упаковки, сопровождения и реализации",
            "Накопление компетенций внутри одной среды",
            "Создание базы для будущего виртуального девелопера",
        ],
    },
    "services": {
        "title": "Внутренние службы АО КСИ",
        "items": [
            {
                "name": "Лаборатория ИИ",
                "role": "Технологическое ядро",
                "desc": "Интеллектуальная инфраструктура, настройка, обучение и развитие системы КриптоМетры. ИИ-решения для земельного рынка и девелопмента.",
            },
            {
                "name": "Центр реализации активов",
                "role": "Операторский контур",
                "desc": "Сопровождение и реализация активов в логике проекта. Упаковка, структурирование, интеграция исполнителей и логика вывода на рынок.",
            },
            {
                "name": "Служба земельного поиска",
                "role": "Земельный контур",
                "desc": "Поиск участков, анализ площадок и работа с земельно-имущественными задачами. Аналитический поиск и структуризация земельных активов.",
            },
            {
                "name": "Студия проектного креатива",
                "role": "Креативный контур",
                "desc": "Визуальная, концептуальная и презентационная упаковка решений, идей и материалов.",
            },
        ],
    },
    "architecture": {
        "title": "Архитектура проекта",
        "layers": [
            {"level": 1, "name": "АО КСИ", "desc": "Оператор интеллектуальной инфраструктуры для девелопмента"},
            {"level": 2, "name": "КриптоМетры", "desc": "Интеллектуальная система распределённого девелопмента"},
            {"level": 3, "name": "Лаборатория ИИ", "desc": "Интеллектуальная инфраструктура, обучение и развитие системы"},
            {"level": 4, "name": "Центр реализации активов", "desc": "Сопровождение и реализация активов в логике проекта"},
            {"level": 5, "name": "Служба земельного поиска", "desc": "Поиск, анализ площадок, земельно-имущественные задачи"},
            {"level": 6, "name": "Студия проектного креатива", "desc": "Визуальная, концептуальная и презентационная упаковка"},
        ],
        "principles": [
            "Единая система — каждая служба рабочий контур единой среды",
            "Обратная связь — данные и точность растут с каждым запросом",
            "Распределённая логика — задачи через подключение нужных контуров",
            "Гибридная модель — ИИ + методология + операторская верификация",
        ],
    },
    "roadmap": {
        "title": "Дорожная карта",
        "phases": [
            {
                "period": "2023 — 2024",
                "name": "Основание проекта",
                "items": [
                    "Регистрация АО КСИ, формирование структуры",
                    "Определение замысла: виртуальный девелопер",
                    "Запуск КриптоМетров как ключевого проекта",
                    "Формирование первых внутренних служб",
                    "Начало работы Лаборатории ИИ",
                ],
            },
            {
                "period": "2024 — 2025",
                "name": "Формирование контуров",
                "items": [
                    "Служба земельного поиска — стадия Beta",
                    "Лаборатория ИИ: R&D по интеллектуальной инфраструктуре",
                    "Центр реализации: первые пилотные задачи",
                    "КриптоМетры: отработка гибридной модели",
                    "Студия креатива: методология упаковки",
                ],
            },
            {
                "period": "2025 — 2026",
                "name": "Интеграция в систему",
                "items": [
                    "Интеграция служб в единый интерфейс КриптоМетров",
                    "LSS: переход из Beta в рабочий контур",
                    "Обучение контуров на реальных задачах",
                    "Запуск интеллектуального чата как интерфейса",
                    "Приглашение девелоперов к бета-тестированию",
                ],
            },
            {
                "period": "2026+",
                "name": "К виртуальному девелоперу",
                "items": [
                    "КриптоМетры как целостная система",
                    "Все контуры в единой среде с единым интерфейсом",
                    "Система накапливает компетенции с каждым запросом",
                    "АО КСИ — оператор инфраструктуры виртуального девелопера",
                ],
            },
        ],
    },
    "contacts": {
        "title": "Контакты",
        "lines": [
            'АО "КриптоСтройИнвест"',
            "",
            "Email: info@aoksi.ru",
            "",
            "Москва, Россия",
            "",
            "aoksi.ru",
        ],
    },
}

# -------------------------------------------------------------------
# Theme definitions
# -------------------------------------------------------------------
THEMES = {
    "dark": {
        "bg": (10, 10, 15),          # #0a0a0f
        "text": (255, 255, 255),
        "text_secondary": (160, 165, 180),
        "accent1": (0, 212, 255),     # #00d4ff cyan
        "accent2": (123, 47, 255),    # #7b2fff purple
        "muted": (40, 42, 54),
        "card_bg": (18, 18, 28),
    },
    "light": {
        "bg": (255, 255, 255),
        "text": (26, 26, 46),         # #1a1a2e
        "text_secondary": (100, 100, 120),
        "accent1": (0, 102, 204),     # #0066cc
        "accent2": (85, 0, 204),      # #5500cc
        "muted": (235, 237, 242),
        "card_bg": (245, 246, 250),
    },
}


def make_response(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps(body, default=str, ensure_ascii=False),
    }


def parse_body(event: dict) -> dict:
    raw_body = event.get("body", "{}")
    if isinstance(raw_body, str):
        try:
            return json.loads(raw_body)
        except (json.JSONDecodeError, TypeError):
            return {}
    return raw_body or {}


def _download_font(url, local_path):
    """Try downloading a font from a single URL. Returns True on success."""
    try:
        # Try with default SSL context first
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) Python/3.11",
            "Accept": "*/*",
        })
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read()
            print("Downloaded {} bytes from {}".format(len(data), url))
            if len(data) < 10000:
                return False
            with open(local_path, "wb") as f:
                f.write(data)
            return True
    except Exception as exc:
        print("Font download (default SSL) from {} failed: {}".format(url, exc))

    # Retry with unverified SSL as fallback
    try:
        ctx = ssl._create_unverified_context()
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) Python/3.11",
            "Accept": "*/*",
        })
        with urllib.request.urlopen(req, timeout=20, context=ctx) as resp:
            data = resp.read()
            print("Downloaded (unverified) {} bytes from {}".format(len(data), url))
            if len(data) < 10000:
                return False
            with open(local_path, "wb") as f:
                f.write(data)
            return True
    except Exception as exc:
        print("Font download (unverified SSL) from {} failed: {}".format(url, exc))
        return False


def find_font_by_name(font_filename):
    """Find a font file by filename using multiple strategies."""

    # 0. Check next to our own code
    own_dir = os.path.dirname(os.path.abspath(__file__))
    candidate = os.path.join(own_dir, font_filename)
    if os.path.isfile(candidate):
        print("Found font next to code: {}".format(candidate))
        return candidate

    # 0b. Check fpdf2 font directory (fpdf2 bundles some fonts)
    try:
        import fpdf
        fpdf_dir = os.path.dirname(fpdf.__file__)
        for sub in ["fonts", "font", ""]:
            d = os.path.join(fpdf_dir, sub) if sub else fpdf_dir
            if os.path.isdir(d):
                for f in os.listdir(d):
                    if f.lower() == font_filename.lower():
                        found = os.path.join(d, f)
                        print("Found font in fpdf2: {}".format(found))
                        return found
    except Exception as exc:
        print("fpdf2 font scan: {}".format(exc))

    # 0c. Scan entire python path for the font
    try:
        import sys
        for p in sys.path:
            if not os.path.isdir(p):
                continue
            for root, dirs, files in os.walk(p):
                for f in files:
                    if f.lower() == font_filename.lower():
                        found = os.path.join(root, f)
                        print("Found font in sys.path: {}".format(found))
                        return found
                if root.count(os.sep) - p.count(os.sep) > 5:
                    dirs.clear()
    except Exception as exc:
        print("sys.path font scan: {}".format(exc))

    # 1. Check explicit system paths
    system_dirs = [
        "/usr/share/fonts/truetype/dejavu",
        "/usr/share/fonts/dejavu",
        "/usr/share/fonts/TTF",
        "/usr/share/fonts/truetype",
        "/usr/local/share/fonts",
    ]
    for d in system_dirs:
        candidate = os.path.join(d, font_filename)
        if os.path.isfile(candidate):
            print("Found font at system path: {}".format(candidate))
            return candidate

    # 1b. Check fpdf2 package directory for bundled fonts
    try:
        import fpdf
        fpdf_dir = os.path.dirname(fpdf.__file__)
        for sub in ["", "fonts", "font"]:
            candidate = os.path.join(fpdf_dir, sub, font_filename) if sub else os.path.join(fpdf_dir, font_filename)
            if os.path.isfile(candidate):
                print("Found font in fpdf2 package: {}".format(candidate))
                return candidate
    except Exception as exc:
        print("fpdf2 font lookup error: {}".format(exc))

    # 2. Check matplotlib's bundled fonts (most reliable in pip-based envs)
    try:
        import matplotlib
        mpl_data = os.path.join(os.path.dirname(matplotlib.__file__), "mpl-data", "fonts", "ttf")
        candidate = os.path.join(mpl_data, font_filename)
        if os.path.isfile(candidate):
            print("Found font in matplotlib: {}".format(candidate))
            return candidate
        # Also scan the directory for similar names
        if os.path.isdir(mpl_data):
            for f in os.listdir(mpl_data):
                if f == font_filename:
                    found = os.path.join(mpl_data, f)
                    print("Found font in matplotlib dir: {}".format(found))
                    return found
    except ImportError:
        print("matplotlib not available for font lookup")
    except Exception as exc:
        print("matplotlib font lookup error: {}".format(exc))

    # 3. Scan site-packages
    try:
        import site
        for sp in site.getsitepackages():
            for root, dirs, files in os.walk(sp):
                if font_filename in files:
                    found = os.path.join(root, font_filename)
                    print("Found font in site-packages: {}".format(found))
                    return found
                # Limit depth to avoid very long scans
                if root.count(os.sep) - sp.count(os.sep) > 4:
                    dirs.clear()
    except Exception as exc:
        print("site-packages font scan error: {}".format(exc))

    # 4. Try downloading as last resort
    is_bold = "Bold" in font_filename or "bold" in font_filename
    download_urls = FONT_BOLD_URLS if is_bold else FONT_REGULAR_URLS
    tmp_dir = tempfile.gettempdir()
    local_path = os.path.join(tmp_dir, "ksi_font_bold.ttf" if is_bold else "ksi_font_regular.ttf")

    if os.path.isfile(local_path) and os.path.getsize(local_path) > 10000:
        print("Using cached font: {}".format(local_path))
        return local_path

    for url in download_urls:
        print("Trying to download font from: {}".format(url))
        if _download_font(url, local_path):
            return local_path

    return None


# ===================================================================
# PDF Builder
# ===================================================================

class PresentationPDF(FPDF):
    """Custom FPDF subclass for presentation generation."""

    def __init__(self, orientation, page_w, page_h, theme_name, company_name, tagline):
        super().__init__(orientation="P", unit="mm", format=(page_w, page_h))
        self.page_w = page_w
        self.page_h = page_h
        self.is_landscape = orientation == "landscape"
        self.theme_name = theme_name
        self.theme = THEMES[theme_name]
        self.company_name = company_name
        self.tagline = tagline
        self.set_auto_page_break(auto=False)

        # Load fonts
        font_regular = find_font_by_name("DejaVuSans.ttf")
        font_bold = find_font_by_name("DejaVuSans-Bold.ttf")

        print("Font regular: {}".format(font_regular))
        print("Font bold: {}".format(font_bold))

        if font_regular:
            self.add_font("DejaVu", "", font_regular)
            # If bold not available, register regular as bold too
            if font_bold:
                self.add_font("DejaVu", "B", font_bold)
            else:
                self.add_font("DejaVu", "B", font_regular)
            self.has_dejavu = True
        else:
            self.has_dejavu = False

        self.font_family_name = "DejaVu" if self.has_dejavu else "Helvetica"

        if not self.has_dejavu:
            print("WARNING: DejaVuSans not found, Cyrillic may not render correctly. Using Helvetica fallback.")

    # -- Drawing helpers -----------------------------------------------

    def _fill_bg(self):
        bg = self.theme["bg"]
        self.set_fill_color(*bg)
        self.rect(0, 0, self.page_w, self.page_h, "F")

    def _draw_accent_line(self, x1, y1, x2, y2, color_key="accent1", width=0.6):
        c = self.theme[color_key]
        self.set_draw_color(*c)
        self.set_line_width(width)
        self.line(x1, y1, x2, y2)

    def _draw_accent_rect(self, x, y, w, h, color_key="accent1", corner=False):
        c = self.theme[color_key]
        self.set_draw_color(*c)
        self.set_line_width(0.4)
        self.rect(x, y, w, h, "D")

    def _draw_filled_rect(self, x, y, w, h, color):
        self.set_fill_color(*color)
        self.rect(x, y, w, h, "F")

    def _draw_circle(self, cx, cy, r, color_key="accent1"):
        c = self.theme[color_key]
        self.set_fill_color(*c)
        self.ellipse(cx - r, cy - r, 2 * r, 2 * r, "F")

    def _set_text_color(self, color_key="text"):
        self.set_text_color(*self.theme[color_key])

    def _font(self, style="", size=10):
        self.set_font(self.font_family_name, style, size)

    # -- Geometric decorations -----------------------------------------

    def _decor_top_bar(self):
        """Thin accent bar at top of page."""
        self._draw_filled_rect(0, 0, self.page_w, 2.5, self.theme["accent1"])

    def _decor_corner_lines(self):
        """Subtle corner geometric lines."""
        margin = 12
        length = 20
        # top-left
        self._draw_accent_line(margin, margin, margin + length, margin, "accent1", 0.3)
        self._draw_accent_line(margin, margin, margin, margin + length, "accent1", 0.3)
        # bottom-right
        bx = self.page_w - margin
        by = self.page_h - margin
        self._draw_accent_line(bx - length, by, bx, by, "accent2", 0.3)
        self._draw_accent_line(bx, by - length, bx, by, "accent2", 0.3)

    def _decor_side_stripe(self):
        """Vertical accent stripe on left side."""
        self._draw_filled_rect(0, 0, 3, self.page_h, self.theme["accent1"])

    def _decor_bottom_bar(self):
        """Thin bar at the bottom."""
        self._draw_filled_rect(0, self.page_h - 1.5, self.page_w, 1.5, self.theme["accent2"])

    def _page_number_footer(self, num):
        """Draw page number at bottom-right."""
        self._set_text_color("text_secondary")
        self._font("", 7)
        self.set_xy(self.page_w - 25, self.page_h - 8)
        self.cell(20, 5, str(num), align="R")

    # -- Content margins -----------------------------------------------

    @property
    def _margin_x(self):
        return 24 if self.is_landscape else 20

    @property
    def _content_w(self):
        return self.page_w - 2 * self._margin_x

    # -- Section renderers (landscape = 1 section per page) ------------

    def add_section_page(self, section_id, page_num):
        """Add a new page and render the section."""
        self.add_page()
        self._fill_bg()

        renderer = getattr(self, "_render_{}".format(section_id), None)
        if renderer is None:
            return False

        renderer()

        # Decorations (skip heavy decor on hero — it has its own)
        if section_id != "hero":
            self._decor_top_bar()
            self._decor_corner_lines()
            self._decor_bottom_bar()

        self._page_number_footer(page_num)
        return True

    # -- HERO ----------------------------------------------------------

    def _render_hero(self):
        pw, ph = self.page_w, self.page_h

        # Background gradient-like effect with colored rectangles
        self._draw_filled_rect(0, 0, pw, ph, self.theme["bg"])

        # Large diagonal accent block
        a1 = self.theme["accent1"]
        a2 = self.theme["accent2"]
        faded1 = tuple(min(255, int(c * 0.15)) if self.theme_name == "dark" else min(255, int(c * 0.08 + 240)) for c in a1)
        faded2 = tuple(min(255, int(c * 0.12)) if self.theme_name == "dark" else min(255, int(c * 0.06 + 242)) for c in a2)

        self._draw_filled_rect(pw * 0.6, 0, pw * 0.4, ph, faded2)
        self._draw_filled_rect(0, ph * 0.75, pw, ph * 0.25, faded1)

        # Geometric accent elements
        self._draw_accent_line(pw * 0.08, ph * 0.18, pw * 0.08, ph * 0.82, "accent1", 1.2)
        self._draw_accent_line(pw * 0.08, ph * 0.18, pw * 0.18, ph * 0.18, "accent1", 1.2)

        # Small decorative circles
        self._draw_circle(pw * 0.92, ph * 0.12, 3, "accent1")
        self._draw_circle(pw * 0.88, ph * 0.18, 1.5, "accent2")

        # Company name — large
        self._set_text_color("text")
        title_size = 28 if self.is_landscape else 24
        self._font("B", title_size)
        self.set_xy(self._margin_x + 10, ph * 0.28)
        self.multi_cell(self._content_w * 0.7, title_size * 0.5, self.company_name, align="L")

        # Subtitle
        self._set_text_color("text_secondary")
        self._font("", 11)
        subtitle = getattr(self, 'site_content', SITE_CONTENT)["hero"]["subtitle"]
        self.set_xy(self._margin_x + 10, ph * 0.50)
        self.multi_cell(self._content_w * 0.7, 6, subtitle, align="L")

        # Tagline with accent color
        self._set_text_color("accent1")
        self._font("B", 13)
        self.set_xy(self._margin_x + 10, ph * 0.62)
        self.multi_cell(self._content_w * 0.7, 7, self.tagline, align="L")

        # Bottom stripe
        self._draw_filled_rect(0, ph - 3, pw, 3, self.theme["accent1"])

    # -- ABOUT ---------------------------------------------------------

    def _render_about(self):
        data = getattr(self, 'site_content', SITE_CONTENT)["about"]
        mx = self._margin_x
        cw = self._content_w
        y_start = 22

        # Section title
        self._set_text_color("accent1")
        self._font("B", 20)
        self.set_xy(mx, y_start)
        self.cell(cw, 10, data["title"], align="L")

        # Divider line
        y = y_start + 16
        self._draw_accent_line(mx, y, mx + 60, y, "accent1", 0.8)
        y += 8

        # Key facts
        self._set_text_color("text")
        self._font("B", 12)
        self.set_xy(mx, y)
        self.cell(cw, 7, "Ключевые факты")
        y += 12

        self._font("", 10)
        for fact in data["facts"]:
            self._set_text_color("accent1")
            self._font("B", 10)
            self.set_xy(mx + 4, y)
            self.cell(5, 5, "\u2022")
            self._set_text_color("text")
            self._font("", 10)
            self.set_xy(mx + 10, y)
            self.cell(cw - 10, 5, fact)
            y += 8

        y += 6

        # Positioning
        self._set_text_color("text")
        self._font("B", 12)
        self.set_xy(mx, y)
        self.cell(cw, 7, "Позиционирование")
        y += 12

        self._font("", 10)
        for item in data["positioning"]:
            self._draw_filled_rect(mx + 4, y + 1.5, 2.5, 2.5, self.theme["accent2"])
            self._set_text_color("text")
            self._font("", 10)
            self.set_xy(mx + 10, y)
            self.cell(cw - 10, 5, item)
            y += 8

    # -- CRYPTOMETRY ---------------------------------------------------

    def _render_cryptometry(self):
        data = getattr(self, 'site_content', SITE_CONTENT)["cryptometry"]
        mx = self._margin_x
        cw = self._content_w
        y = 22

        # Title
        self._set_text_color("accent1")
        self._font("B", 20)
        self.set_xy(mx, y)
        self.cell(cw, 10, data["title"], align="L")
        y += 16

        # Subtitle
        self._set_text_color("text")
        self._font("", 11)
        self.set_xy(mx, y)
        self.multi_cell(cw * 0.8, 6, data["subtitle"])
        y += 16

        self._draw_accent_line(mx, y, mx + 80, y, "accent2", 0.8)
        y += 10

        # Features
        self._font("B", 12)
        self._set_text_color("text")
        self.set_xy(mx, y)
        self.cell(cw, 7, "Ключевые характеристики")
        y += 14

        for idx, feat in enumerate(data["features"]):
            # Number circle
            num_x = mx + 6
            num_y = y + 3
            self._draw_circle(num_x, num_y, 4, "accent1" if idx % 2 == 0 else "accent2")
            self._set_text_color("bg" if self.theme_name == "dark" else "bg")
            # Number on circle
            self.set_text_color(255, 255, 255) if self.theme_name == "dark" else self.set_text_color(255, 255, 255)
            self._font("B", 8)
            self.set_xy(num_x - 3, num_y - 2.5)
            self.cell(6, 5, str(idx + 1), align="C")

            # Feature text
            self._set_text_color("text")
            self._font("", 10)
            self.set_xy(mx + 14, y)
            self.cell(cw - 14, 6, feat)
            y += 12

    # -- SERVICES ------------------------------------------------------

    def _render_services(self):
        data = getattr(self, 'site_content', SITE_CONTENT)["services"]
        mx = self._margin_x
        cw = self._content_w
        y = 22

        # Title
        self._set_text_color("accent1")
        self._font("B", 20)
        self.set_xy(mx, y)
        self.cell(cw, 10, data["title"], align="L")
        y += 18

        card_w = (cw - 8) / 2 if self.is_landscape else cw
        card_h = 50 if self.is_landscape else 42

        for idx, svc in enumerate(data["items"]):
            if self.is_landscape:
                col = idx % 2
                row = idx // 2
                cx = mx + col * (card_w + 8)
                cy = y + row * (card_h + 8)
            else:
                cx = mx
                cy = y + idx * (card_h + 6)

            # Card background
            self._draw_filled_rect(cx, cy, card_w, card_h, self.theme["card_bg"])

            # Left accent bar on card
            accent_key = "accent1" if idx % 2 == 0 else "accent2"
            self._draw_filled_rect(cx, cy, 3, card_h, self.theme[accent_key])

            # Service name
            self._set_text_color("text")
            self._font("B", 11)
            self.set_xy(cx + 8, cy + 6)
            self.cell(card_w - 12, 6, svc["name"])

            # Role badge
            self._set_text_color(accent_key)
            self._font("B", 8)
            self.set_xy(cx + 8, cy + 14)
            self.cell(card_w - 12, 5, svc["role"])

            # Description
            self._set_text_color("text_secondary")
            self._font("", 8)
            self.set_xy(cx + 8, cy + 23)
            self.multi_cell(card_w - 14, 4.5, svc["desc"])

    # -- ARCHITECTURE --------------------------------------------------

    def _render_architecture(self):
        data = getattr(self, 'site_content', SITE_CONTENT)["architecture"]
        mx = self._margin_x
        cw = self._content_w
        y = 22

        # Title
        self._set_text_color("accent1")
        self._font("B", 20)
        self.set_xy(mx, y)
        self.cell(cw, 10, data["title"], align="L")
        y += 20

        layer_h = 16 if self.is_landscape else 18
        max_w = cw * 0.85
        center_x = self.page_w / 2

        for idx, layer in enumerate(data["layers"]):
            # Each layer is wider than the previous (pyramid effect inverted — top is narrow)
            fraction = 0.4 + 0.1 * idx
            w = max_w * fraction
            lx = center_x - w / 2

            # Gradient-like color: interpolate between accent1 and accent2
            t = idx / max(len(data["layers"]) - 1, 1)
            a1 = self.theme["accent1"]
            a2 = self.theme["accent2"]
            fill = tuple(int(a1[i] * (1 - t) + a2[i] * t) for i in range(3))
            # Make it subtle for background
            bg = self.theme["bg"]
            subtle = tuple(int(bg[i] * 0.7 + fill[i] * 0.3) for i in range(3))

            self._draw_filled_rect(lx, y, w, layer_h - 2, subtle)

            # Border
            self.set_draw_color(*fill)
            self.set_line_width(0.4)
            self.rect(lx, y, w, layer_h - 2, "D")

            # Level number
            self.set_text_color(*fill)
            self._font("B", 9)
            self.set_xy(lx + 4, y + 2)
            self.cell(10, layer_h - 6, str(layer["level"]), align="C")

            # Name
            self._set_text_color("text")
            self._font("B", 10)
            self.set_xy(lx + 16, y + 1)
            self.cell(w * 0.4, (layer_h - 2) / 2, layer["name"], align="L")

            # Desc
            self._set_text_color("text_secondary")
            self._font("", 8)
            self.set_xy(lx + 16, y + (layer_h - 2) / 2)
            self.cell(w * 0.7, (layer_h - 2) / 2, layer["desc"], align="L")

            # Connector line
            if idx < len(data["layers"]) - 1:
                self._draw_accent_line(center_x, y + layer_h - 2, center_x, y + layer_h, "accent1", 0.3)

            y += layer_h

    # -- ROADMAP -------------------------------------------------------

    def _render_roadmap(self):
        data = getattr(self, 'site_content', SITE_CONTENT)["roadmap"]
        mx = self._margin_x
        cw = self._content_w
        y = 22

        # Title
        self._set_text_color("accent1")
        self._font("B", 20)
        self.set_xy(mx, y)
        self.cell(cw, 10, data["title"], align="L")
        y += 18

        if self.is_landscape:
            # Horizontal layout: 4 columns
            col_w = (cw - 18) / 4
            col_gap = 6

            # Timeline line
            line_y = y + 6
            self._draw_accent_line(mx, line_y, mx + cw, line_y, "accent1", 0.6)

            for idx, phase in enumerate(data["phases"]):
                px = mx + idx * (col_w + col_gap)

                # Timeline dot
                dot_color = "accent1" if idx % 2 == 0 else "accent2"
                self._draw_circle(px + col_w / 2, line_y, 3, dot_color)

                # Period
                self._set_text_color(dot_color)
                self._font("B", 9)
                self.set_xy(px, line_y + 8)
                self.cell(col_w, 5, phase["period"], align="C")

                # Phase name
                self._set_text_color("text")
                self._font("B", 11)
                self.set_xy(px, line_y + 16)
                self.cell(col_w, 6, phase["name"], align="C")

                # Items
                iy = line_y + 26
                self._set_text_color("text_secondary")
                self._font("", 7.5)
                for item in phase["items"]:
                    self.set_xy(px + 2, iy)
                    self.multi_cell(col_w - 4, 4, "- {}".format(item), align="L")
                    iy += 9
        else:
            # Vertical layout for portrait
            for idx, phase in enumerate(data["phases"]):
                # Vertical line
                line_x = mx + 8
                self._draw_accent_line(line_x, y, line_x, y + 50, "accent1" if idx % 2 == 0 else "accent2", 0.5)

                # Dot
                self._draw_circle(line_x, y + 4, 3, "accent1" if idx % 2 == 0 else "accent2")

                # Period + name
                self._set_text_color("accent1" if idx % 2 == 0 else "accent2")
                self._font("B", 9)
                self.set_xy(mx + 18, y)
                self.cell(cw - 18, 5, phase["period"])

                self._set_text_color("text")
                self._font("B", 11)
                self.set_xy(mx + 18, y + 7)
                self.cell(cw - 18, 6, phase["name"])

                iy = y + 16
                self._set_text_color("text_secondary")
                self._font("", 8)
                for item in phase["items"]:
                    self.set_xy(mx + 20, iy)
                    self.cell(cw - 20, 5, "- {}".format(item))
                    iy += 6

                y += 56

    # -- CONTACTS ------------------------------------------------------

    def _render_contacts(self):
        data = getattr(self, 'site_content', SITE_CONTENT)["contacts"]
        mx = self._margin_x
        cw = self._content_w
        ph = self.page_h

        # Center vertically
        block_h = 80
        y_start = (ph - block_h) / 2

        # Decorative large accent rect in background
        rect_w = cw * 0.6
        rect_h = block_h + 30
        rect_x = (self.page_w - rect_w) / 2
        rect_y = y_start - 15
        card_bg = self.theme["card_bg"]
        self._draw_filled_rect(rect_x, rect_y, rect_w, rect_h, card_bg)
        self._draw_accent_rect(rect_x, rect_y, rect_w, rect_h, "accent1")

        # Title
        self._set_text_color("accent1")
        self._font("B", 20)
        self.set_xy(mx, y_start)
        self.cell(cw, 10, data["title"], align="C")
        y = y_start + 18

        self._draw_accent_line(self.page_w / 2 - 30, y, self.page_w / 2 + 30, y, "accent1", 0.6)
        y += 10

        # Contact lines
        self._font("", 10)
        for line in data["lines"]:
            if not line:
                y += 4
                continue
            self._set_text_color("text")
            self._font("", 10)
            self.set_xy(mx, y)
            self.cell(cw, 6, line, align="C")
            y += 8

    # -- Portrait continuous mode (sections flow on pages) -------------

    def render_portrait_continuous(self, sections):
        """For portrait mode, render sections flowing continuously on A4 pages."""
        # In portrait mode we still use one section per page for cleanliness
        page_num = 0
        for section_id in sections:
            if section_id not in getattr(self, 'site_content', SITE_CONTENT):
                continue
            page_num += 1
            self.add_section_page(section_id, page_num)


def build_pdf(fmt, theme, sections, company_name, tagline, content=None):
    """Build the PDF and return bytes."""
    use_content = content or SITE_CONTENT
    if fmt == "landscape":
        pw, ph = 338.67, 190.5
    else:
        pw, ph = 210, 297

    pdf = PresentationPDF(
        orientation=fmt,
        page_w=pw,
        page_h=ph,
        theme_name=theme,
        company_name=company_name,
        tagline=tagline,
    )
    pdf.site_content = use_content

    page_num = 0
    for section_id in sections:
        if section_id not in use_content:
            continue
        page_num += 1
        pdf.add_section_page(section_id, page_num)

    if page_num == 0:
        return None

    return pdf.output()


# ===================================================================
# Handler
# ===================================================================

def handler(event: dict, context) -> dict:
    """Generate PDF presentation from site content.

    POST / — generate presentation
    OPTIONS / — CORS preflight
    """
    method = event.get("httpMethod", event.get("method", ""))

    if method == "OPTIONS":
        return make_response(200, {})

    if method != "POST":
        return make_response(405, {"error": "Method not allowed"})

    body = parse_body(event)

    fmt = body.get("format", "landscape")
    if fmt not in ("landscape", "portrait"):
        fmt = "landscape"

    theme = body.get("theme", "dark")
    if theme not in ("dark", "light"):
        theme = "dark"

    sections = body.get("sections", [])
    if not isinstance(sections, list) or len(sections) == 0:
        return make_response(400, {"error": "Parameter 'sections' must be a non-empty array"})

    content_override = body.get("content_override", {})
    if isinstance(content_override, dict):
        working_content = copy.deepcopy(SITE_CONTENT)
        for sec_id, sec_data in content_override.items():
            if isinstance(sec_data, dict) and sec_id in working_content:
                working_content[sec_id].update(sec_data)
    else:
        working_content = SITE_CONTENT

    company_name = body.get("company_name", "")
    if not company_name:
        company_name = working_content["hero"]["title"]

    tagline = body.get("tagline", "")
    if not tagline:
        tagline = working_content["hero"]["tagline"]

    try:
        pdf_bytes = build_pdf(fmt, theme, sections, company_name, tagline, working_content)
    except Exception as exc:
        print("PDF generation error: {}".format(exc))
        return make_response(500, {"error": "Failed to generate PDF: {}".format(str(exc))})

    if pdf_bytes is None:
        return make_response(400, {"error": "No valid sections to render"})

    pdf_base64 = base64.b64encode(pdf_bytes).decode("ascii")

    return make_response(200, {
        "pdf_base64": pdf_base64,
        "filename": "KSI_Presentation_2026.pdf",
    })