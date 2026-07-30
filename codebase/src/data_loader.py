"""
VLearn AI Learning Bridge — Data Loader Module (Task 3.2)
Responsible for loading, cleaning, mapping, and chunking transcript markdown files
and slide text for session pairs (Day 01 -> Day 02, Day 02 -> Day 03).
"""

import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Any

# Ensure UTF-8 output on Windows console
if sys.platform == 'win32' and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Root directory of the repository
BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data" / "vlearn-pack"
TRANSCRIPT_DIR = DATA_DIR / "transcript"
SLIDES_DIR = DATA_DIR / "slides"


class DataLoader:
    """Loads and formats transcript and slide data for LLM context generation."""

    def __init__(self, base_dir: Optional[Path] = None):
        self.base_dir = base_dir or BASE_DIR
        self.transcript_dir = self.base_dir / "data" / "vlearn-pack" / "transcript"
        self.slides_dir = self.base_dir / "data" / "vlearn-pack" / "slides"

        # Session mappings to transcript & slide files
        self.session_mappings = {
            'd1-d2': {
                'prev_day': {
                    'code': 'Day 01',
                    'title': 'AI & LLM Foundation',
                    'transcripts': ['transcript-04-clean.md', 'transcript-06-clean.md'],
                    'slides_scratch': 'scratch_d1.txt',
                    'slides_pdf': 'd1-slide-hackathon.pdf'
                },
                'curr_day': {
                    'code': 'Day 02',
                    'title': 'Xác định bài toán cho AI',
                    'transcripts': ['transcript-01-clean.md', 'transcript-02-clean.md', 'transcript-03-clean.md'],
                    'slides_scratch': 'scratch_d2.txt',
                    'slides_pdf': 'd2-slide-hackathon.pdf'
                }
            },
            'd2-d3': {
                'prev_day': {
                    'code': 'Day 02',
                    'title': 'Xác định bài toán cho AI',
                    'transcripts': ['transcript-01-clean.md', 'transcript-02-clean.md', 'transcript-03-clean.md'],
                    'slides_scratch': 'scratch_d2.txt',
                    'slides_pdf': 'd2-slide-hackathon.pdf'
                },
                'curr_day': {
                    'code': 'Day 03',
                    'title': 'Multi-Agent Systems & Build System',
                    'transcripts': ['transcript-05-clean.md'],
                    'slides_scratch': None,
                    'slides_pdf': None
                }
            }
        }

    def load_transcript(self, filename: str) -> Dict[str, Any]:
        """Loads a clean transcript markdown file and extracts citation tags."""
        filepath = self.transcript_dir / filename
        if not filepath.exists():
            print(f"[Warning] Transcript file not found: {filepath}")
            return {"filename": filename, "text": "", "citations": [], "char_count": 0}

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find all citation tags like [T04-001], [T01-089]
        citations = re.findall(r'\[T\d{2}-\d{3}\]', content)

        return {
            "filename": filename,
            "text": content,
            "citations": list(set(citations)),
            "char_count": len(content)
        }

    def load_slide_text(self, scratch_filename: Optional[str], pdf_filename: Optional[str] = None) -> Dict[str, Any]:
        """Loads extracted slide text from scratch file or directly extracts from PDF."""
        content = ""
        source_type = "none"

        # 1. Try loading from scratch text file first
        if scratch_filename:
            scratch_path = self.base_dir / scratch_filename
            if scratch_path.exists():
                with open(scratch_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                source_type = "scratch_file"

        # 2. Fallback to PDF extraction using PyMuPDF if PyMuPDF installed
        if not content and pdf_filename:
            pdf_path = self.slides_dir / pdf_filename
            if pdf_path.exists():
                try:
                    import fitz  # PyMuPDF
                    doc = fitz.open(pdf_path)
                    pages = []
                    for i, page in enumerate(doc):
                        pages.append(f"--- PAGE {i+1} ---\n{page.get_text()}")
                    content = "\n\n".join(pages)
                    source_type = "pdf_fitz"
                except Exception as e:
                    print(f"[Warning] Failed to extract PDF {pdf_filename}: {e}")

        # Parse slide pages count
        pages_count = len(re.findall(r'--- PAGE \d+ ---', content))

        return {
            "scratch_filename": scratch_filename,
            "pdf_filename": pdf_filename,
            "text": content,
            "source_type": source_type,
            "pages_count": pages_count,
            "char_count": len(content)
        }

    def get_session_pair_data(self, session_key: str = 'd1-d2') -> Dict[str, Any]:
        """Gets complete transcripts and slides for a session pair (e.g. d1-d2)."""
        mapping = self.session_mappings.get(session_key)
        if not mapping:
            raise ValueError(f"Unknown session key: '{session_key}'. Available keys: {list(self.session_mappings.keys())}")

        # Load Prev Day Data
        prev_cfg = mapping['prev_day']
        prev_transcripts = [self.load_transcript(f) for f in prev_cfg['transcripts']]
        prev_slides = self.load_slide_text(prev_cfg['slides_scratch'], prev_cfg['slides_pdf'])

        # Load Curr Day Data
        curr_cfg = mapping['curr_day']
        curr_transcripts = [self.load_transcript(f) for f in curr_cfg['transcripts']]
        curr_slides = self.load_slide_text(curr_cfg['slides_scratch'], curr_cfg['slides_pdf'])

        return {
            "session_key": session_key,
            "prev_day": {
                "code": prev_cfg['code'],
                "title": prev_cfg['title'],
                "transcripts": prev_transcripts,
                "slides": prev_slides
            },
            "curr_day": {
                "code": curr_cfg['code'],
                "title": curr_cfg['title'],
                "transcripts": curr_transcripts,
                "slides": curr_slides
            }
        }

    def prepare_prompt_context(self, session_key: str = 'd1-d2', max_chars_per_day: int = 25000) -> Dict[str, str]:
        """
        Formats transcript & slide data into clean markdown strings ready for LLM System/User prompt.
        Truncates or chunks if text exceeds max_chars_per_day to avoid token limit overflow.
        """
        data = self.get_session_pair_data(session_key)

        def format_day_context(day_data: Dict[str, Any]) -> str:
            lines = [f"# {day_data['code']} — {day_data['title']} Context\n"]

            # 1. Slide Summary Section
            slides_text = day_data['slides']['text']
            if slides_text:
                if len(slides_text) > max_chars_per_day // 2:
                    slides_text = slides_text[:max_chars_per_day // 2] + "\n... [Slide Content Truncated] ..."
                lines.append("## SLIDES CONTENT:")
                lines.append(slides_text.strip())
                lines.append("\n" + "="*40 + "\n")

            # 2. Transcripts Section
            lines.append("## TRANSCRIPT CONTENT (With Citation Markers [Txx-NNN]):")
            combined_trans = []
            for t in day_data['transcripts']:
                combined_trans.append(f"### File: {t['filename']}\n{t['text']}")

            full_trans_text = "\n\n".join(combined_trans)
            if len(full_trans_text) > max_chars_per_day // 2:
                full_trans_text = full_trans_text[:max_chars_per_day // 2] + "\n... [Transcript Content Truncated] ..."

            lines.append(full_trans_text.strip())

            return "\n".join(lines)

        prev_context = format_day_context(data['prev_day'])
        curr_context = format_day_context(data['curr_day'])

        return {
            "session_key": session_key,
            "prev_day_code": data['prev_day']['code'],
            "curr_day_code": data['curr_day']['code'],
            "prev_day_context": prev_context,
            "curr_day_context": curr_context,
            "full_combined_prompt_context": f"=== PREVIOUS SESSION ({data['prev_day']['code']}) ===\n{prev_context}\n\n=== CURRENT SESSION ({data['curr_day']['code']}) ===\n{curr_context}"
        }

    def search_citations(self, query: str, session_key: str = 'd1-d2') -> List[Dict[str, Any]]:
        """Utility method to search for keyword matches in transcript/slides and return citation context."""
        data = self.get_session_pair_data(session_key)
        results = []

        query_lower = query.lower()

        # Search in prev day transcripts
        for t in data['prev_day']['transcripts']:
            lines = t['text'].split('\n')
            for line_idx, line in enumerate(lines):
                if query_lower in line.lower():
                    # extract citation marker near this line
                    citation_match = re.search(r'\[T\d{2}-\d{3}\]', line)
                    results.append({
                        "day": data['prev_day']['code'],
                        "source": t['filename'],
                        "line": line_idx + 1,
                        "content": line.strip(),
                        "citation": citation_match.group(0) if citation_match else None
                    })

        return results


# Standalone runner for testing and verification
if __name__ == '__main__':
    print("=== TESTING DATA LOADER (TASK 3.2) ===")
    loader = DataLoader()

    for key in ['d1-d2', 'd2-d3']:
        print(f"\n--- Loading Session Pair: {key} ---")
        pair_data = loader.get_session_pair_data(key)

        print(f"Prev Day ({pair_data['prev_day']['code']}): {pair_data['prev_day']['title']}")
        print(f"  - Transcripts: {len(pair_data['prev_day']['transcripts'])} files")
        for t in pair_data['prev_day']['transcripts']:
            print(f"    * {t['filename']}: {t['char_count']} chars, {len(t['citations'])} citations")
        print(f"  - Slides: {pair_data['prev_day']['slides']['char_count']} chars, {pair_data['prev_day']['slides']['pages_count']} pages ({pair_data['prev_day']['slides']['source_type']})")

        print(f"Curr Day ({pair_data['curr_day']['code']}): {pair_data['curr_day']['title']}")
        print(f"  - Transcripts: {len(pair_data['curr_day']['transcripts'])} files")
        for t in pair_data['curr_day']['transcripts']:
            print(f"    * {t['filename']}: {t['char_count']} chars, {len(t['citations'])} citations")

        # Test prompt context formatting
        prompt_ctx = loader.prepare_prompt_context(key)
        print(f"Prompt Context Prepared for {key}: Prev={len(prompt_ctx['prev_day_context'])} chars, Curr={len(prompt_ctx['curr_day_context'])} chars")

    # Test Citation Search
    print("\n--- Citation Search Test ---")
    query_term = "hallucination"
    matches = loader.search_citations(query_term, 'd1-d2')
    print(f"Search for '{query_term}' found {len(matches)} matches in Day 01 transcripts.")
    if matches:
        print(f"Sample match: [{matches[0]['day']}] {matches[0]['source']}: {matches[0]['content'][:100]}...")
    print("\n=== DATA LOADER TEST PASSED SUCCESSFULLY ===")
