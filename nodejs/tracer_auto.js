"use strict";

// opentelemetry packages used to create tracer provider, instrumentation, and exporter for application
const opentelemetry = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { Resource } = require("@opentelemetry/resources");
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");

const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");

module.exports = (serviceName) => {
  const resources = new Resource({
    "service.name": serviceName,
  });

  const provider = new NodeTracerProvider({ resource: resources });

  const exporterOptions = {
    url: "<Sumo Logic HTTP Traces URL>",
  };

  const exporter = new OTLPTraceExporter(exporterOptions);
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  provider.register();

  registerInstrumentations({
    instrumentations: [
      getNodeAutoInstrumentations({
        "@opentelemetry/instrumentation-http": {},
      }),
    ],
  });

  return opentelemetry.trace.getTracer("http-example");
};
