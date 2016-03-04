module RongIMLib {
    export class WebSQLDataProvider implements DataAccessProvider {

        database: DBUtil = new DBUtil();

        private updateConversation(conversation: Conversation, callback: ResultCallback<boolean>) {
            var sql: string = "UPDATE T_CONVERSATION_" + this.database.userId + " T SET T.CONTENT = ?,T.SENTTIME = ?,T.ISTOP = ? WHERE T.CONVERSATIONTYPE = ? AND T.TARGETID = ?";
            this.database.execUpdateByParams(sql, [JSON.stringify(conversation), conversation.sentTime, conversation.isTop, conversation.conversationType, conversation.targetId]);
        }
        addConversation(conver: Conversation, callback: ResultCallback<boolean>) {
            var me = this;
            var sSql: string = "SELECT * FROM T_CONVERSATION_" + me.database.userId + " T WHERE T.CONVERSATIONTYPE = ? AND T.TARGETID = ?";
            me.database.execSearchByParams(sSql, [String(conver.conversationType), conver.targetId], function(results: any[]) {
                if (results.length > 0) {
                    me.updateConversation(conver, callback);
                } else {
                    var iSql: string = "INSERT INTO T_CONVERSATION_" + this.database.userId + "(CONVERSATIONTYPE,TARGETID,CONTENT,SENTTIME,ISTOP) VALUES(?,?,?,?,?)";
                    me.database.execUpdateByParams(iSql, [conver.conversationTitle, conver.targetId, JSON.stringify(conver), conver.sentTime, conver.isTop]);
                }
                callback.onSuccess(true);
            });
        }

        removeConversation(conversationType: ConversationType, targetId: string, callback: ResultCallback<boolean>) {
            var sql: string = "DELETE FROM T_CONVERSATION_" + this.database.userId + " T WHERE T.CONVERSATIONTYPE = ? AND T.TARGETID = ?";
            this.database.execUpdateByParams(sql, [conversationType, targetId]);
            callback.onSuccess(true);
        }

        addMessage(conversationType: ConversationType, targetId: string, message: Message, callback?: ResultCallback<Message>) {
            var sql: string = "INSERT INTO T_MESSAGE_" + this.database.userId + " T (MESSAGETYPE,MESSAGEUID,CONVERSATIONTYPE,TARGETID,SENTTIME,CONTENT,LOCALMSG)" +
                "VALUES(?,?,?,?,?,?,?)";
            var localmsg: number = message.messageUId ? 0 : 1;
            this.database.execUpdateByParams(sql, [message.messageType, message.messageUId, message.conversationType, message.targetId, message.sentTime, JSON.stringify(message), localmsg]);
        }

        removeMessage(conversationType: ConversationType, targetId: string, messageIds: string[], callback: ResultCallback<boolean>) {
            if (messageIds.length == 0) {
                return;
            }
            var sql: string = "DELETE FROM T_MESSAGE_" + this.database.userId + " T WHERE T.MESSAGEUID IN (?)";
            this.database.execUpdateByParams(sql, [messageIds.join(",")]);
        }
        removeLocalMessage(conversationType: ConversationType, targetId: string, timestamps: number[], callback: ResultCallback<boolean>) {
            if (timestamps.length == 0) {
                return;
            }
            var sql: string = "DELETE FROM T_MESSAGE_" + this.database.userId + " T WHERE T.SENTTIME IN (?) AND T.MESSAGEUID IS NULL AND T.CONVERSATIONTYPE = ? AND T.TARGETID = ?";
            this.database.execUpdateByParams(sql, [timestamps.join(","), conversationType, targetId]);
        }
        updateMessage(message: Message, callback?: ResultCallback<Message>) {
            throw new Error("Not implemented yet");
        }

        updateMessages(conversationType: ConversationType, targetId: string, key: string, value: any, callback: ResultCallback<boolean>) {
            throw new Error("Not implemented yet");
        }

        clearMessages(conversationType: ConversationType, targetId: string, callback: ResultCallback<boolean>) {
            var sql: string = "DELETE FROM T_MESSAGE_" + this.database.userId + " T WHERE T.CONVERSATIONTYPE = ? AND T.TARGETID = ?";
            this.database.execUpdateByParams(sql, [conversationType, targetId]);
        }

        getConversation(conversationType: ConversationType, targetId: string): Conversation {
            throw new Error("Not implemented yet");
        }

        getConversationList(callback: ResultCallback<Conversation[]>, conversationTypes?: ConversationType[]) {
            throw new Error("Not implemented yet");
        }

        clearConversations(conversationTypes: ConversationType[], callback: ResultCallback<boolean>) {
            throw new Error("Not implemented yet");
        }

        getHistoryMessages(conversationType: ConversationType, targetId: string, timestamp: number, count: number, callback: GetHistoryMessagesCallback) {
            throw new Error("Not implemented yet");
        }

        getTotalUnreadCount(callback: ResultCallback<number>) {
            throw new Error("Not implemented yet");
        }

        getConversationUnreadCount(conversationTypes: ConversationType[], callback: ResultCallback<number>) {
            throw new Error("Not implemented yet");
        }

        getUnreadCount(conversationType: ConversationType, targetId: string, callback: ResultCallback<number>) {
            throw new Error("Not implemented yet");
        }

        clearUnreadCount(conversationType: ConversationType, targetId: string, callback: ResultCallback<boolean>) {
            throw new Error("Not implemented yet");
        }

        setConversationToTop(conversationType: ConversationType, targetId: string, callback: ResultCallback<boolean>) {
            throw new Error("Not implemented yet");
        }

        setMessageExtra(messageId: string, value: string, callback: ResultCallback<boolean>) {
            throw new Error("Not implemented yet");
        }

        setMessageReceivedStatus(messageId: string, receivedStatus: ReceivedStatus, callback: ResultCallback<boolean>) {
            throw new Error("Not implemented yet");
        }

        setMessageSentStatus(messageId: string, sentStatus: SentStatus, callback: ResultCallback<boolean>) {
            throw new Error("Not implemented yet");
        }
    }
}
