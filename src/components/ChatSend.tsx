import { Button, Flex, IconButton, Input } from "@chakra-ui/react";
import { IoHappyOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { useState } from "react";
import { chatCollection } from "@db/collections";
import { getQueryId } from "../utils";
import firebase from "firebase/compat/app";
import InputEmoji from "react-input-emoji";

// Handle Chat Send Functions
const ChatSend = ({ router, username, user, callback, updateChat }) => {
  const [input, setInput] = useState("");

  const sendButtonClick = () => {
    // e.preventDefault();
    if (!input) return;
    chatCollection()
      .doc(getQueryId(router))
      .collection("messages")
      .doc()
      .set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: username,
        photoURL: user.photoURL,
      })
      .then(updateChat);
    callback();
    setInput("");
  };

  return (
    <Flex
      as={"form"}
      display={"flex"}
      bg={"#f7f7f7"}
      zIndex={100}
      justifyContent={"space-between"}
      position={"sticky"}
      bottom={0}
      gap={"10px"}
      padding={"1rem 1.5rem"}
    >
      <InputEmoji
        value={input}
        onChange={(e) => setInput(e)}
        onEnter={sendButtonClick}
        placeholder="Type a message"
      />

      <IconButton bg={"transparent"} aria-label={"Send Icon"}>
        <IoHappyOutline />
      </IconButton>
    </Flex>
  );
};

export default ChatSend;
