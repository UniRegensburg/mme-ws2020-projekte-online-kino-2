class Message {
    constructor(from, data, time) {
        this.from = from;
        this.data = data;
        this.time = time;
        Object.freeze(this);
    }
}

export default Message;