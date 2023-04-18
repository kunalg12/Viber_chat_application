import { Flex } from "@chakra-ui/react";
import Sidebar from "@component/Sidebar";
import { RouteAuthProtect } from "@layout/RouteGuard";
import { chatCollection } from "@db/collections";
import Seo from "@component/SEO";
import { getRecipientUsername } from "../../utils";
import { useUserDetails } from "../../context/AuthContext";
import { ChatScreen } from "@component/ChatScreen";
import Router from "next/router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Chat({ chat }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { user } = useUserDetails();
  return (
    <RouteAuthProtect>
      <Seo title={`Vibber | ${getRecipientUsername(chat.users, user)}`} />
      <Flex>
        <AnimatePresence exitBeforeEnter={true}>
          {sidebarVisible ? (
            <motion.div
              key="sidebar"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ duration: 0.2 }}
            >
              <Sidebar
                visible={sidebarVisible}
                toggleSidebar={() => setSidebarVisible(false)}
              />
            </motion.div>
          ) : (
            <></>
          )}
        </AnimatePresence>
        <ChatScreen
          sidebarVisible={sidebarVisible}
          toggleSidebar={() => setSidebarVisible(!sidebarVisible)}
          chat={chat}
        />
      </Flex>
    </RouteAuthProtect>
  );
}

export async function getServerSideProps(context) {
  let ref;
  try {
    ref = chatCollection().doc(context.query.id);
  } catch (e) {
    await Router.push("/");
  }

  const chatRes = await ref.get();

  const chat = {
    id: chatRes.id,
    users: chatRes.data().users,
  };

  return {
    props: {
      chat: chat,
    },
  };
}
