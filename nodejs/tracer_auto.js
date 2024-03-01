"use strict";

const opentelemetry = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { Resource } = require("@opentelemetry/resources");
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");

const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

module.exports = (serviceName) => {
  const resources = new Resource({
    "service.name": serviceName,
    application: "nodejs-app",
  });

  const provider = new NodeTracerProvider({ resource: resources });

  const exporterOptions = {
    url: "<Sumo Logic HTTP Traces URL>",
  };

  const exporter = new OTLPTraceExporter(exporterOptions);
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register();

  registerInstrumentations({
    instrumentations: [new HttpInstrumentation()],
  });

  return opentelemetry.trace.getTracer("nodejs-http-example");
};
