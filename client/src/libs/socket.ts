import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '@server/shared'
import { USER_STORAGE_KEY } from '@/consts'
import { socketOrigin, socketPort } from '@/config'

const URL = socketPort ? `${socketOrigin}:${socketPort}` : socketOrigin

function getSessionID() {
  const userStorage = localStorage.getItem(USER_STORAGE_KEY)
  if (!userStorage) return null

  const userStorageObject = JSON.parse(userStorage)
  return userStorageObject.state && userStorageObject.state.sessionId !== null
    ? userStorageObject.state.sessionId
    : null
}

const sessionId = getSessionID()

const options = sessionId
  ? {
      auth: {
        sessionId,
      },
      autoConnect: true,
    }
  : { autoConnect: false }

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, options)
