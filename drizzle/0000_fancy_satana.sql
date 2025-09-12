CREATE TABLE `ai-app-template_account` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text(255) NOT NULL,
	`account_id` text(255) NOT NULL,
	`provider_id` text(255) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text(255),
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `ai-app-template_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `ai-app-template_account` (`user_id`);--> statement-breakpoint
CREATE TABLE `ai-app-template_chat` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text(255) NOT NULL,
	`title` text(255) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `ai-app-template_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ai-app-template_message` (
	`id` text PRIMARY KEY NOT NULL,
	`chat_id` text(255) NOT NULL,
	`role` text(255) NOT NULL,
	`parts` text NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`chat_id`) REFERENCES `ai-app-template_chat`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ai-app-template_session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text(255) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text(255),
	`user_agent` text,
	`user_id` text(255) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `ai-app-template_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ai-app-template_session_token_unique` ON `ai-app-template_session` (`token`);--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `ai-app-template_session` (`user_id`);--> statement-breakpoint
CREATE TABLE `ai-app-template_user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text(255),
	`is_admin` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ai-app-template_verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text(255) NOT NULL,
	`value` text(255) NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
