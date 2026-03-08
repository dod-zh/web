---
type: "session"
sessionId: "talks/florian-mair"
---

As AI copilots and coding agents generate more of the code we ship, we can deliver software faster than we can understand it, leading to fragile behavior, missed edge cases, and failures that are hard to explain.

This talk’s guiding principle is simple: the faster you generate code, the more you need telemetry. We’ll connect observability fundamentals (signals, context propagation, debugging workflows) to the realities of AI-generated code, using OpenTelemetry as a vendor-neutral foundation for traces, metrics, and logs that reveal runtime truth.

You’ll see three practical approaches: prompt AI tools to emit instrumentation by default (using a reusable template), use auto-instrumentation for broad, fast coverage, and add manual spans/attributes where domain context matters most. To make this stick, we’ll introduce a simple team practice: require "observability present" in code review for AI-generated changes.
