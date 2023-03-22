document.addEventListener('DOMContentLoaded', function() {
  const chatArea = document.querySelector('.chat-area');
  const sendButton = document.querySelector('.input-area button');
  const messageInput = document.querySelector('.input-area input[type="text"]');

  // Restore previous messages from local storage, if any
  const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
  storedMessages.forEach(msg => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.fromUser ? 'from-user' : 'from-assistant');
    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble', msg.fromUser ? 'from-user' : 'from-assistant');
    messageBubble.innerHTML = msg.text;
    messageElement.appendChild(messageBubble);

    // set width of message bubble based on length of text
    const messageWidth = Math.min(150 + msg.text.length * 10, 100);
    messageBubble.style.width = `auto`;
    messageBubble.style.maxWidth = `${messageWidth}%`;

    chatArea.appendChild(messageElement);
  });

  sendButton.addEventListener('click', function() {
    const message = messageInput.value.trim();
    if (message !== '') {
      // create new message element
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', 'from-user');
      const messageBubble = document.createElement('div');
      messageBubble.classList.add('message-bubble', 'from-user');
      messageBubble.innerHTML = message;
      messageElement.appendChild(messageBubble);

      // set width of message bubble based on length of text
      const messageWidth = Math.min(150 + message.length * 10, 100);
      messageBubble.style.width = `auto`;
      messageBubble.style.maxWidth = `${messageWidth}%`;

      // append the message element to the chat area
      chatArea.appendChild(messageElement);

      // clear the message input
      messageInput.value = '';

      // save the message to local storage
      const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
      storedMessages.push({ fromUser: true, text: message });
      localStorage.setItem('messages', JSON.stringify(storedMessages));
    }
  });

  messageInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      sendButton.click();
    }
  });
});
