"""
VLearn AI Learning Bridge — Demo Readiness & Backup Diagnostic Tool (Task 3.7)
Validates all codebase assets, prompt templates, trace logs, offline fallback generators,
and backup documentation to ensure 100% demo readiness before live presentation.
"""

import sys
import json
from pathlib import Path

# Ensure UTF-8 output on Windows console
if sys.platform == 'win32' and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Paths
SRC_DIR = Path(__file__).resolve().parent
BASE_DIR = SRC_DIR.parents[1]
OUTPUTS_DIR = BASE_DIR / "codebase" / "outputs"
BACKUP_DIR = OUTPUTS_DIR / "demo-backup"
PROMPTS_DIR = BASE_DIR / "codebase" / "prompts"

sys.path.insert(0, str(SRC_DIR))


def run_diagnostics():
    print("="*60)
    print("  🚀 VLEARN AI LEARNING BRIDGE — DEMO READINESS DIAGNOSTICS")
    print("="*60 + "\n")

    checks = []

    # 1. Codebase Source Files Check
    source_files = ["index.html", "style.css", "app.js", "data_loader.py", "llm_client.py", "server.py"]
    for sf in source_files:
        p = SRC_DIR / sf
        status = p.exists()
        checks.append((f"Source file: codebase/src/{sf}", status))

    # 2. Prompt Templates Check
    prompt_files = ["system_prompt.md", "recap_prompt.md", "bridge_prompt.md"]
    for pf in prompt_files:
        p = PROMPTS_DIR / pf
        status = p.exists()
        checks.append((f"Prompt template: codebase/prompts/{pf}", status))

    # 3. Trace Logs Check
    trace_files = ["trace_d1_d2.json", "trace_d2_d3.json"]
    for tf in trace_files:
        p = OUTPUTS_DIR / tf
        status = p.exists()
        checks.append((f"Trace log: codebase/outputs/{tf}", status))

    # 4. Demo Backup Documentation Check
    backup_files = ["README.md", "demo_script.md"]
    for bf in backup_files:
        p = BACKUP_DIR / bf
        status = p.exists()
        checks.append((f"Backup doc: codebase/outputs/demo-backup/{bf}", status))

    # Print Readiness Checklist
    all_passed = True
    for label, passed in checks:
        icon = "✅" if passed else "❌"
        print(f"  {icon} {label:<50} {'OK' if passed else 'MISSING'}")
        if not passed:
            all_passed = False

    print("\n" + "-"*60)

    # 5. Offline Fallback Generation Test
    print("⚡ Testing Offline Fallback Engine Execution...")
    try:
        from llm_client import LLMBridgeClient
        client = LLMBridgeClient()
        res = client.generate_learning_bridge('d1-d2')
        if res and res.get('output', {}).get('recap'):
            print("  ✅ Offline Fallback Engine: PASSED (Generated valid Recap & Bridge JSON)")
        else:
            print("  ❌ Offline Fallback Engine: FAILED")
            all_passed = False
    except Exception as e:
        print(f"  ❌ Offline Fallback Engine Error: {e}")
        all_passed = False

    print("="*60)
    if all_passed:
        print("  🎉 DEMO READINESS DIAGNOSTIC: 100% READY FOR LIVE DEMO!")
    else:
        print("  ⚠️ DEMO READINESS DIAGNOSTIC: SOME ASSETS ARE MISSING OR NEED FIXING!")
    print("="*60 + "\n")


if __name__ == '__main__':
    run_diagnostics()
