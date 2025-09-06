import { NODE_ENV } from '$env/static/private';
import { LangfuseExporter } from 'langfuse-vercel';
import { registerOTel } from '@vercel/otel';

export function register() {
	registerOTel({
		serviceName: 'deepsearch-course',
		traceExporter: new LangfuseExporter({
			environment: NODE_ENV
		})
	});
}
