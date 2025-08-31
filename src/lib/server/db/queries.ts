import { db } from './';
import { chat, message } from './schema';
import type { UIMessage } from 'ai';
import { eq, and } from 'drizzle-orm';

export const upsertChat = async (opts: {
	userId: string;
	chatId: string;
	title: string;
	messages: UIMessage[];
}) => {
	const { userId, chatId, title, messages: newMessages } = opts;

	// First, check if the chat exists and belongs to the user
	const existingChat = await db.query.chat.findFirst({
		where: eq(chat.id, chatId)
	});

	if (existingChat) {
		// If chat exists but belongs to a different user, throw error
		if (existingChat.userId !== userId) {
			throw new Error('Chat ID already exists under a different user');
		}
		// Delete all existing messages
		await db.delete(message).where(eq(message.chatId, chatId));
	} else {
		// Create new chat
		await db.insert(chat).values({
			id: chatId,
			userId,
			title
		});
	}

	// Insert all messages
	await db.insert(message).values(
		newMessages.map((msg, index) => ({
			id: crypto.randomUUID(),
			chatId,
			role: msg.role,
			parts: msg.parts,
			order: index
		}))
	);

	return { id: chatId };
};

export const getChat = async (opts: { userId: string; chatId: string }) => {
	const { userId, chatId } = opts;

	const chatResult = await db.query.chat.findFirst({
		where: and(eq(chat.id, chatId), eq(chat.userId, userId)),
		with: {
			messages: {
				orderBy: (message, { asc }) => [asc(message.order)]
			}
		}
	});

	if (!chatResult) {
		return null;
	}

	return {
		...chatResult,
		messages: chatResult.messages.map((msg) => ({
			id: msg.id,
			role: msg.role,
			parts: msg.parts
		}))
	};
};

export const getChats = async (opts: { userId: string }) => {
	const { userId } = opts;

	return await db.query.chat.findMany({
		where: eq(chat.userId, userId),
		orderBy: (chat, { desc }) => [desc(chat.updatedAt)]
	});
};
