import { NativeModules } from 'react-native'

const { UnityNativeModule } = NativeModules

export const UnityMessagePrefix = '@UnityMessage@'

export default class MessageHandler {
    public id: number
    public seq: 'start' | 'end' | ''
    public name: string
    public data: any
    public isSent: boolean
    public waitId: number

    constructor () {
    }

    public static deserialize (message: string): MessageHandler {
        if (!MessageHandler.isUnityMessage(message)) {
            throw new Error(`"${message}" is't an UnityMessage.`)
        }
        message = message.replace(UnityMessagePrefix, '')
        const m = JSON.parse(message)
        const handler = new MessageHandler()
        handler.id = m.id
        handler.seq = m.seq
        handler.name = m.name
        handler.data = m.data
        handler.waitId = m.waitId
        return handler
    }

    public static isUnityMessage (message: string) {
        if (message.startsWith(UnityMessagePrefix)) {
            return true
        } else {
            return false
        }
    }

    public send (data: any) {
        if(!isSent){
            UnityNativeModule.postMessage('UnityMessageManager', 'onRNMessage', UnityMessagePrefix + JSON.stringify({
            id: this.id,
            seq: 'end',
            name: this.name,
            data: data
            }))
        }
    }
}
