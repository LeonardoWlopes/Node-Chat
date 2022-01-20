const socket = io("http://localhost:3000");

      function renderMessage(message) {
        if (!!message) {
          $(".messages").append(
            '<div class="message"><strong>' +
              message.author +
              "</strong>: " +
              message.message +
              "</div>"
          );

          $("input[name=message]").val("").focus();
        }
      }

      socket.on("prevMessages", (messages) => {
        for (message of messages) {
          renderMessage(message);
        }
      });

      socket.on("receivedMessage", (message) => {
        renderMessage(message);
      });

      $("#chat").submit((e) => {
        e.preventDefault();

        const author = $("input[name=username]").val();
        const message = $("input[name=message]").val();

        if (!!author && !!message) {
          const messageObject = {
            author,
            message,
          };

          renderMessage(messageObject);
          socket.emit("sendMessage", messageObject);
        }
      });