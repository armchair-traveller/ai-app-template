import { sqliteTableCreator, text, integer, index, primaryKey } from 'drizzle-orm/sqlite-core';
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
	id: text('id', { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name', { length: 255 }),
	email: text('email', { length: 255 }).notNull().unique(),
	emailVerified: integer('email_verified', { mode: 'boolean' })
		.$defaultFn(() => false)
		.notNull(),
	image: text('image', { length: 255 }),
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
		id: text('id', { length: 255 })
			.notNull()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
		token: text('token', { length: 255 }).notNull().unique(),
		createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
		updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
		ipAddress: text('ip_address', { length: 255 }),
		userAgent: text('user_agent'),
		userId: text('user_id', { length: 255 })
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
		userId: text('user_id', { length: 255 })
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		accountId: text('account_id', { length: 255 }).notNull(),
		providerId: text('provider_id', { length: 255 }).notNull(),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: integer('access_token_expires_at', {
			mode: 'timestamp'
		}),
		refreshTokenExpiresAt: integer('refresh_token_expires_at', {
			mode: 'timestamp'
		}),
		scope: text('scope', { length: 255 }),
		password: text('password'),
		createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
		updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
	},
	(table) => [
		primaryKey({
			columns: [table.providerId, table.accountId]
		}),
		index('account_user_id_idx').on(table.userId)
	]
);

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, { fields: [account.userId], references: [user.id] })
}));

export const verification = createTable(
	'verification',
	{
		identifier: text('identifier', { length: 255 }).notNull(),
		value: text('value', { length: 255 }).notNull(),
		expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
		createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
			() => /* @__PURE__ */ new Date()
		),
		updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(
			() => /* @__PURE__ */ new Date()
		)
	},
	(table) => [primaryKey({ columns: [table.identifier, table.value] })]
);

export const chat = createTable(
	'chat',
	{
		id: text('id', { length: 255 })
			.notNull()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text('user_id', { length: 255 })
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		title: text('title', { length: 255 }).notNull(),
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
		id: text('id', { length: 255 })
			.notNull()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		chatId: text('chat_id', { length: 255 })
			.notNull()
			.references(() => chat.id, { onDelete: 'cascade' }),
		role: text('role', { length: 255 }).notNull(), // 'user', 'assistant', 'system'
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
