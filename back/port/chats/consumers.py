import json
from channels.generic.websocket import AsyncWebsocketConsumer

class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "chat_all_users"

        # Добавляем пользователя в группу
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data['message']
        user = self.scope['user']
        email = user.email if user.is_authenticated else "Anonymous"

        # Отправляем сообщение в группу с дополнительной информацией о пользователе
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'email': email
            }
        )

    async def disconnect(self, code):
        # Удаляем пользователя из группы
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def chat_message(self, event):
        message = event['message']
        email = event['email']

        # Отправляем сообщение с email
        await self.send(text_data=json.dumps({
            'message': message,
            'email': email
        }))
