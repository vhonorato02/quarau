# 0008 — Observabilidade com orçamento de 4 GB

- **Status:** aceita · **Data:** 2026-10-05

## Decisão
- Logs estruturados JSON (pino) com redação de dados pessoais; rotação via driver `json-file` (10 MB × 5).
- **OpenTelemetry** (`@vercel/otel`), exportado quando `OTEL_EXPORTER_OTLP_ENDPOINT` estiver definido.
- **Sentry SDK** ligado só se `SENTRY_DSN` existir — compatível com **GlitchTip**. O GlitchTip *não* sobe por
  padrão: ele usa ~600 MB+ (web + worker + redis), demais para a VPS de 4 GB com Coolify. Pode-se usar o plano
  gratuito do GlitchTip/Sentry ou subir o GlitchTip em outra máquina.
- **Uptime Kuma** (perfil `monitoring`) para verificação HTTP com alertas; `healthwatch.sh` a cada 5 min alerta via
  webhook sobre site fora, container não saudável, disco > 85% ou memória baixa.
