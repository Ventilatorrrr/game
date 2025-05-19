document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const messageText = document.getElementById('message-text');

    if (messageText)
    {
        if (error)
        {
            messageText.textContent = decodeURIComponent(error);
        }
        else
        {
            messageText.textContent = 'Hello!';
        }
    }
});
