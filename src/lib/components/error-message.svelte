<script lang="ts">
	import IconLucideAlertCircle from '~icons/lucide/alert-circle';

	interface Props {
		message: string;
	}

	let { message }: Props = $props();
</script>

<div class="mx-auto w-full max-w-prose">
	<div class="flex items-center gap-2 rounded-md bg-red-950 p-3 text-sm text-red-300">
		<IconLucideAlertCircle class="size-5 shrink-0" />
		{message}
	</div>
</div>
