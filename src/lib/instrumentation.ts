import {
	LANGFUSE_PUBLIC_KEY,
	LANGFUSE_SECRET_KEY,
	NODE_ENV,
	LANGFUSE_BASE_URL
} from '$env/static/private';
import { LangfuseExporter } from 'langfuse-vercel';
import { registerOTel } from '@vercel/otel';

export function register() {
	registerOTel({
		serviceName: 'deepsearch-course',
		traceExporter: new LangfuseExporter({
			environment: NODE_ENV,
			secretKey: LANGFUSE_SECRET_KEY,
			publicKey: LANGFUSE_PUBLIC_KEY,
			baseUrl: LANGFUSE_BASE_URL
		})
	});
}
