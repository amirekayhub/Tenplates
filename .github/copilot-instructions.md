# Copilot Instructions

This file defines custom guidance for GitHub Copilot in this repository.  
Rules are grouped into concise best‑practice headings for efficiency.

---

## Token Discipline
- Output must end with "Task completed" + max 5 bullets.  
- Input must be summarized before sending to the model.  
- Copilot should avoid verbose completions, repeated suggestions, or unnecessary commentary.  
- Premium models only when explicitly requested.  
- Chat history limited to last 2–3 turns unless user asks for full context.

---

## File & Project Context
- Include only the specific function, class, or section referenced.  
- Prefer smaller, modular files over long ones.  
- Exclude repo metadata/config files unless explicitly relevant.  
- Use project structure diagrams to determine relevant files.  
- Provide only one solution unless alternatives are requested.

---

## Project Diagrams
- Always generate and maintain a project file structure diagram.  
- Update automatically when files are added or modified.  
- Each file listed with a one‑sentence definition.  
- Default format: Markdown lists; use ASCII tree or Mermaid only if requested.  
- Keep diagrams concise and token‑efficient.

---

## Habit Rule
- Copilot must internalize all rules in this file and apply them consistently.  
- Copilot should not re‑read or re‑expand the full instructions on every prompt.  
- Treat these rules as persistent habits rather than repeated context.  
- Apply rules silently to prioritize efficiency.