import {
	sqliteTableCreator,
	text,
	integer,
	index,
	unique,
	primaryKey
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `ai-app-template_${name}`);

export const user = createTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: integer('email_verified', { mode: 'boolean' })
		.$defaultFn(() => false)
		.notNull(),
	image: text('image'),
	isAdmin: integer('is_admin', { mode: 'boolean' })
		.$defaultFn(() => false)
		.notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const userRelations = relations(user, ({ many }) => ({
	accounts: many(account)
}));

export const session = createTable(
	'session',
	{
		id: text('id').primaryKey(),
		expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
		token: text('token').notNull().unique(),
		createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
		updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' })
	},
	(table) => [
		index('session_user_id_idx').on(table.userId),
		index('session_token_idx').on(table.token)
	]
);

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, { fields: [session.userId], references: [user.id] })
}));

export const account = createTable(
	'account',
	{
		id: text('id').primaryKey(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: integer('access_token_expires_at', {
			mode: 'timestamp'
		}),
		refreshTokenExpiresAt: integer('refresh_token_expires_at', {
			mode: 'timestamp'
		}),
		scope: text('scope'),
		password: text('password'),
		createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
		updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
	},
	(table) => [
		index('account_user_id_idx').on(table.userId),
		unique('account_provider_compound').on(table.providerId, table.accountId)
	]
);

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, { fields: [account.userId], references: [user.id] })
}));

export const verification = createTable(
	'verification',
	{
		id: text('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
		createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
			() => /* @__PURE__ */ new Date()
		),
		updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(
			() => /* @__PURE__ */ new Date()
		)
	},
	(table) => [unique().on(table.identifier, table.value)]
);

export const chat = createTable(
	'chat',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		title: text('title').notNull(),
		createdAt: integer('created_at', { mode: 'timestamp' })
			.$defaultFn(() => /* @__PURE__ */ new Date())
			.notNull(),
		updatedAt: integer('updated_at', { mode: 'timestamp' })
			.$defaultFn(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [index('chat_user_id_idx').on(table.userId)]
);

export const chatRelations = relations(chat, ({ one, many }) => ({
	user: one(user, { fields: [chat.userId], references: [user.id] }),
	messages: many(message)
}));

export const message = createTable(
	'message',
	{
		id: text('id').primaryKey(),
		chatId: text('chat_id')
			.notNull()
			.references(() => chat.id, { onDelete: 'cascade' }),
		role: text('role').notNull(), // 'user', 'assistant', 'system'
		parts: text('parts', { mode: 'json' }).notNull(),
		order: integer('order').notNull(),
		createdAt: integer('created_at', { mode: 'timestamp' })
			.$defaultFn(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [
		index('message_chat_id_idx').on(table.chatId),
		index('message_chat_order_idx').on(table.chatId, table.order)
	]
);

export const messageRelations = relations(message, ({ one }) => ({
	chat: one(chat, { fields: [message.chatId], references: [chat.id] })
}));

export declare namespace DB {
	export type User = InferSelectModel<typeof user>;
	export type NewUser = InferInsertModel<typeof user>;

	export type Account = InferSelectModel<typeof account>;
	export type NewAccount = InferInsertModel<typeof account>;

	export type Session = InferSelectModel<typeof session>;
	export type NewSession = InferInsertModel<typeof session>;

	export type Verification = InferSelectModel<typeof verification>;
	export type NewVerification = InferInsertModel<typeof verification>;

	export type Chat = InferSelectModel<typeof chat>;
	export type NewChat = InferInsertModel<typeof chat>;

	export type Message = InferSelectModel<typeof message>;
	export type NewMessage = InferInsertModel<typeof message>;
}
