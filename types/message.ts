export class MessageType {
  constructor(public text: string, public isUser: boolean) {
    this.text = text
    this.isUser = isUser
  }
}
