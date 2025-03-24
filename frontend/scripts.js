async function sendMessage() {
    let userInput = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");
    let loading = document.getElementById("loading");

    let message = userInput.value.trim();
    if (message === "") return; // Prevent empty messages

    // Add user message to chat
    chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    
    // Clear input and disable it while AI responds
    userInput.value = "";
    userInput.disabled = true;
    
    // Show loading animation
    loading.classList.remove("hidden");

    // Get AI response
    let aiResponse = await getGeminiResponse(message);

    // Hide loading animation and re-enable input
    loading.classList.add("hidden");
    userInput.disabled = false;
    userInput.focus(); // Auto-focus back to input

    // Display AI response
    chatBox.innerHTML += `<p><strong>Bot:</strong> ${aiResponse}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll chat
}

async function getGeminiResponse(query) {
    try {
        let response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: query })
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        let data = await response.json();
        return data.reply || "I'm not sure how to respond to that.";
    } catch (error) {
        console.error("❌ Error fetching AI response:", error);
        return "⚠️ Oops! AI is unavailable. Try again later.";
    }
}

