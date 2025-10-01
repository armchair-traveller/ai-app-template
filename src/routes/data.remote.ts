import { getRequestEvent, query } from '$app/server';
import { getChat, getChats } from '$lib/server/db/queries';

export const getData = query('unchecked', async (chatId: string) => {
	const { user } = getRequestEvent().locals;
	return {
		user,
		// Fetch chats if user is authenticated
		chats: user ? await getChats({ userId: user.id }) : [],
		// Fetch active chat if chatId is present and user is authenticated
		activeChat: user && chatId ? await getChat({ chatId, userId: user.id }) : null
	};
});
