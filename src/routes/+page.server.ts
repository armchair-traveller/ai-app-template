import { getChats, getChat } from '$lib/server/db/queries';

export async function load({ locals: { user }, url }) {
	if (!user) {
		return {
			chats: [],
			user: null,
			activeChat: null
		};
	}
	const chatId = url.searchParams.get('id');
	// Fetch chat if user is authenticated
	return {
		chats: await getChats({ userId: user.id }),
		activeChat: chatId ? await getChat({ userId: user.id, chatId }) : null
	};
}
