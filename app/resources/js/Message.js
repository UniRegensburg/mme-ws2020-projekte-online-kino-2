class Message {
    constructor(from, data, time) {
        this.from = from;
        this.data = data;
        this.time = time;
        Object.freeze(this);
    }
}

// TODO: Refactor to use Symbols instead of strings
Message.prototype.NEW_MESSAGE = "NEW_MESSAGE";

//module.exports=Message;
export default Message;